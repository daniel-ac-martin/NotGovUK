import base64url from 'base64url';
import { Client, Issuer, Strategy, StrategyOptions, StrategyVerifyCallbackReqUserInfo, custom } from 'openid-client';
import { AuthBagger, AuthMethod, UserProfile } from './common';
import { Serialize, passportBag } from './passport';

// OpenID Connect

export type AuthOptionsOIDC = {
  method: AuthMethod.OIDC
  issuer: string
  clientId: string
  clientSecret?: string
  redirectUri: string
};

export type AuthInfo = UserProfile & {
  accessToken?: string
  accessTokenValid?: boolean
  refreshToken?: string
  refreshTokenValid?: boolean
  idToken?: string
  idTokenValid?: boolean
  userinfo?: object
};

type JWT = {
  iss?: string
  sub?: string
  aud?: string | string[]
  exp?: number
  nbf?: number
  iat?: number
  jti?: string
};

type Verify = StrategyVerifyCallbackReqUserInfo<AuthInfo>;

const id = <T>(x: T): T => x;

type Reducer<A, B> = (acc: B, cur: A) => B;
const resourceToRoles: Reducer<any[], string[]> = (acc, [x, y]) => ([
  ...acc,
  ...(y.roles?.map((e: string) => `${x}:${e}`) || [])
]);

export const oidcAuth: AuthBagger<AuthOptionsOIDC> = async ({
  clientId,
  clientSecret,
  issuer,
  redirectUri
}, privacy, fullSessions) => {
  custom.setHttpOptionsDefaults({
    timeout: 5000,
  });

  const iss = await Issuer.discover(issuer);
  const client = new iss.Client({
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uris: [ redirectUri + '/auth/callback' ],
    token_endpoint_auth_method: (
      clientSecret
        ? 'client_secret_basic'
        : 'none'
    )
  });
  const options: StrategyOptions<Client> = {
    client,
    params: {
      scope: 'openid'
    },
    passReqToCallback: true
  };

  const authInfo = (accessToken?: string, refreshToken?: string, idToken?: string, userinfo: object = {}): AuthInfo => {
    const extractJWTClaims = (token?: string) => token && JSON.parse(
      base64url.decode(
        token.split('.')[1]
      )
    ) || {};
    const accessClaims = extractJWTClaims(accessToken);
    const idClaims = extractJWTClaims(idToken);
    const refreshClaims = extractJWTClaims(refreshToken);
    const data = {
      ...accessClaims,
      ...idClaims,
      ...userinfo,
      accessToken,
      refreshToken,
      idToken,
      userinfo
    };
    const expiry = new Date((refreshClaims.exp || accessClaims.exp) * 1000);

    const now = Math.floor(Date.now() / 1000);
    const isValid = ({
      nbf = 0,
      exp = 0
    }: JWT) => (
      ( nbf <= now ) && ( now < exp )
    );

    const accessTokenValid = isValid(accessClaims);
    const refreshTokenValid = isValid(refreshClaims);
    const idTokenValid = isValid(idClaims);

    return {
      provider: 'oidc',
      id: data.sub,
      displayName: data.displayName || data.name,
      name: {
        familyName: data.familyName || data.family_name,
        givenName: data.givenName || data.given_name,
        middleName: data.middleName || data.middle_name
      },
      emails: (
        data.email
          ? [{ value: data.email }]
          : undefined
      ),
      photos: (
        data.photo
          ? [{ value: data.photo }]
          : undefined
      ),
      username: data.username || data.preferred_username,
      groups: data.groups,
      roles: [
        ...(data.roles || []),
        ...(data.realm_access?.roles || []),
        ...(Object.entries(data.resource_access || {}).reduce(resourceToRoles, []))
      ].filter(id),
      accessToken: data.accessToken,
      accessTokenValid,
      refreshToken: data.refreshToken,
      refreshTokenValid,
      idToken: data.idToken,
      idTokenValid,
      userinfo: data.userinfo,
      expiry
    };
  };

  const verify: Verify = (_req, tokenset, userinfo, done) => {
    const user: AuthInfo = authInfo(tokenset.access_token, tokenset.refresh_token, tokenset.id_token, userinfo);

    if (user.username) {
      done(null, user);
    } else {
      done(null, null as any);
    }
  };

  const serialize: Serialize = (req, user, done) => {
    if (fullSessions) {
      done(null, user);
    } else {
      // We need to see what we can fit inside the cookie
      // There are some challenges with this:
      //   1. We don't know what else is in the session
      //   2. Subsequent encryption will increase the size of the data
      const cookieLimit = 4096;
      const encryptionCost = 1.5; // This is an estimate!
      const smallEnough = (v: object) => (
        JSON.stringify(v).length * encryptionCost <= cookieLimit
      );
      const payload = {
        accessToken: user.accessToken,
        refreshToken: user.refreshToken,
        idToken: user.idToken,
        userinfo: user.userinfo
      };

      if (smallEnough(payload)) {
        done(null, payload);
      } else {
        delete payload.userinfo; // Probably fine

        if (smallEnough(payload)) {
          done(null, payload);
        } else {
          delete payload.idToken; // Probably fine

          if (smallEnough(payload)) {
            done(null, payload);
          } else {
            delete payload.refreshToken; // This will cut short the user's session

            req.log.warn('Cannot fit refresh token in session; session will expire early');
            done(null, payload);
          }
        }
      }
    }
  };

  const deserialize: Serialize = (req, {accessToken, refreshToken, idToken, userinfo}, done) => {
    const user: AuthInfo = authInfo(accessToken, refreshToken, idToken, userinfo || {});

    if (user.username && user.accessTokenValid) {
      done(null, user);
    } else if (!user.accessTokenValid && user.refreshTokenValid) {
      // The access token has expired, let's try to get a new one
      client.refresh(refreshToken)
        .then(tokenset => {
          req.log.info('Obtained new access token');
          const newUser: AuthInfo = authInfo(tokenset.access_token, tokenset.refresh_token, tokenset.id_token, userinfo || {});

          if (newUser.username && newUser.accessTokenValid) {
            req.login(newUser, (err: unknown) => {
              if (err) {
                req.log.error('Failed to persist new access token');
                done(null, null);
              } else {
                done(null, newUser);
              }
            });
          } else {
            req.log.error('Access token was invalid');
            done(null, null);
          }
        })
        .catch(_err => {
          req.log.error('Failed to obtain new access token');
          done(null, null);
        });
    } else {
      req.log.info('Access token has expired and cannot renew, ending session');
      done(null, null);
    }
  };

  const strategy = new Strategy(options, verify);

  return passportBag({
    callback: true,
    deserialize,
    id: 'oidc',
    serialize,
    sessions: true,
    strategy
  }, privacy, fullSessions);
};

export default oidcAuth;
