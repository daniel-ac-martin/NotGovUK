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
  refreshToken?: string
  idToken?: string
  userinfo?: object
};

type Verify = StrategyVerifyCallbackReqUserInfo<AuthInfo>;

const id = <T>(x: T): T => x;

type Reducer<A, B> = (B, A) => B;
const resourceToRoles: Reducer<object, string[]> = (acc, [x, y]) => ([
  ...acc,
  ...(y.roles?.map(e => `${x}:${e}`) || [])
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

  const extractJWTClaims = (token?: string) => token && JSON.parse(
    base64url.decode(
      token.split('.')[1]
    )
  ) || {};

  const authInfo = (accessToken: string, refreshToken: string, idToken: string, userinfo: object): AuthInfo => {
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
      refreshToken: data.refreshToken,
      idToken: data.idToken,
      userinfo: data.userinfo
    };
  };

  const verify: Verify = (_req, tokenset, userinfo, done) => {
    const accessToken = tokenset.access_token;
    const refreshToken = tokenset.refresh_token;
    const idToken = tokenset.id_token;
    const user: AuthInfo = authInfo(accessToken, refreshToken, idToken, userinfo || {});

    if (user.username) {
      done(null, user);
    } else {
      done(null, null);
    }
  };

  const serialize: Serialize = (user, done) => {
    if (fullSessions) {
      done(null, user);
    } else {
      // We need to see what we can fit inside the cookie
      // There are some challenges with this:
      //   1. We don't know what else is in the session
      //   2. Subsequent encryption will increase the size of the data
      const cookieLimit = 4096;
      const encryptionCost = 2.2; // This is an estimate! - This should be reduced to 1.5 when we have base64 encoding
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

            done(null, payload);
          }
        }
      }
    }
  };

  const deserialize: Serialize = ({accessToken, refreshToken, idToken, userinfo}, done) => {
    const user: AuthInfo = authInfo(accessToken, refreshToken, idToken, userinfo || {});

    if (user.username) {
      done(null, user);
    } else {
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
