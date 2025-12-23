import type { AuthBagger, Deserialize, SubRouteHandlerMethod, Serialize, UserProfile } from './common';

import base64url from 'base64url';
import { Client, Issuer, custom, generators } from 'openid-client';
import { createError } from '@fastify/error';
import { id } from './common';

// OpenID Connect

export type Options = {
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

type SessionObj = {
  codeVerifier?: string
  state?: string
};

type Reducer<A, B> = (acc: B, cur: A) => B;
const resourceToRoles: Reducer<any[], string[]> = (acc, [x, y]) => ([
  ...acc,
  ...(y.roles?.map((e: string) => `${x}:${e}`) || [])
]);

const BadSession = createError('FST_BAD_SESSION', 'Unable to verify session', 409);

export const oidc: AuthBagger<Options> = async ({
  clientId,
  clientSecret,
  issuer,
  redirectUri: _redirectUri
}, fullSessions) => {
  custom.setHttpOptionsDefaults({
    timeout: 5000,
  });

  const redirectUri = _redirectUri + '/auth/callback'
  const iss = await Issuer.discover(issuer);
  const client = new iss.Client({
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uris: [ redirectUri ],
    token_endpoint_auth_method: (
      clientSecret
        ? 'client_secret_basic'
        : 'none'
    )
  });

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

  const serialize: Serialize<AuthInfo> = (user, req) => {
    if (fullSessions) {
      return user
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
        return payload;
      } else {
        delete payload.userinfo; // Probably fine

        if (smallEnough(payload)) {
          return payload;
        } else {
          delete payload.idToken; // Probably fine

          if (smallEnough(payload)) {
            return payload;
          } else {
            delete payload.refreshToken; // This will cut short the user's session

            req.log.warn('Cannot fit refresh token in session; session will expire early');
            return payload;
          }
        }
      }
    }
  };

  const deserialize: Deserialize<AuthInfo> = async (
    {
      accessToken,
      refreshToken,
      idToken,
      userinfo
    },
    req
  ) => {
    const user: AuthInfo = authInfo(accessToken, refreshToken, idToken, userinfo || {});

    if (user.username && user.accessTokenValid) {
      return user;
    } else if (!user.accessTokenValid && refreshToken && user.refreshTokenValid) {
      // The access token has expired, let's try to get a new one
      try {
        const tokenSet = await client.refresh(refreshToken);

        req.log.info('Obtained new access token');
        const newUser: AuthInfo = authInfo(tokenSet.access_token, tokenSet.refresh_token, tokenSet.id_token, userinfo || {});

        if (newUser.username && newUser.accessTokenValid) {
          return newUser;
        } else {
          req.log.error('Access token was invalid');
          return undefined;
        }
      } catch (_err) {
        req.log.error('Failed to obtain new access token');
        return undefined;
      }
    } else {
      req.log.info('Access token has expired and cannot renew');
      return undefined;
    }
  };

  // Loosely inspired by openid-client's Passport strategy: https://github.com/panva/openid-client/blob/81c48ef33e10b42caa3a3d33349172a9904fb999/lib/passport_strategy.js#L78
  const authenticate: SubRouteHandlerMethod = async (req, reply) => {
    const codeVerifier = generators.codeVerifier();
    const codeChallenge = generators.codeChallenge(codeVerifier);
    const state = generators.state();
    const redirectTo = client.authorizationUrl({
      // scope: 'openid email profile',
      scope: 'openid',
      state,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256'
    });
    const sessionObj: SessionObj = {
      codeVerifier,
      state
    };

    req.session.oidc = sessionObj;

    return reply.redirect(redirectTo);
  };

  // Loosely inspired by openid-client's Passport strategy: https://github.com/panva/openid-client/blob/81c48ef33e10b42caa3a3d33349172a9904fb999/lib/passport_strategy.js#L78
  const callback: SubRouteHandlerMethod = async (req, reply) => {
    const sessionObj = (req.session.oidc || {}) as SessionObj;
    delete req.session.oidc;

    const {
      codeVerifier,
      state
    } = sessionObj;

    if (!(codeVerifier && state)) {
      throw new BadSession();
    }

    const checks = {
      code_verifier: codeVerifier,
      state
    };
    const params = client.callbackParams(req.raw);
    const tokenSet = await client.callback(redirectUri, params, checks);
    const userinfo = await client.userinfo(tokenSet);
    const user: AuthInfo = authInfo(tokenSet.access_token, tokenSet.refresh_token, tokenSet.id_token, userinfo);

    if (user.username) {
      req.user = user;
    }
  };

  const terminate: SubRouteHandlerMethod = async (req, reply) => {
    const redirectTo = client.endSessionUrl({
      post_logout_redirect_uri: _redirectUri
    });

    return reply.redirect(redirectTo);
  };

  return {
    authenticate,
    callback,
    deserialize,
    serialize,
    terminate,
    wantSession: true
  };
};

export default oidc;
