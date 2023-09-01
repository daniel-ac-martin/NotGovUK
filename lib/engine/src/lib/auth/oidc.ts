import base64url from 'base64url';
import { Client, Issuer, Strategy, StrategyOptions, custom } from 'openid-client';
import { AuthBagger, AuthMethod, UserProfile } from './common';
import { passportBag } from './passport';

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
};

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
}, privacy) => {
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

  const verify = (_req, tokenset, userinfo, done) => {
    const accessClaims = JSON.parse(
      base64url.decode(
        tokenset.access_token.split('.')[1]
      )
    );
    const data = {
      ...accessClaims,
      ...tokenset.claims(),
      ...userinfo
    };

    const user: AuthInfo = {
      provider: 'oidc',
      id: data.sub,
      displayName: data.displayName || data.name,
      name: {
        familyName: data.familyName || data.family_name,
        givenName: data.givenName || data.given_name,
        middleName: data.middleName || data.middle_name
      },
      emails: (
        data.emails
          ? [{ value: data.emails }]
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
      accessToken: tokenset.access_token//,
      //refreshToken: tokenset.refresh_token // removed until we can handle it
    };

    done(null, user);
  };

  const strategy = new Strategy(options, verify);

  return passportBag({
    callback: true,
    id: 'oidc',
    sessions: true,
    strategy
  }, privacy);
};

export default oidcAuth;
