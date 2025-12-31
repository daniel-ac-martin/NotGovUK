import { AuthMethod, Mode, NodeEnv, SessionStore, defaultsTrue, defaultsFalse } from '@not-govuk/fastify';

const env = process.env.NODE_ENV as NodeEnv;
const devMode = env === NodeEnv.Development;
const standardRoles = [];

const serverConfig = {
  auth: {
    method: (process.env.AUTH_METHOD || AuthMethod.None) as AuthMethod,
    dummy: {
      username: 'TestUser',
      groups: [],
      roles: standardRoles
    },
    headers: {
      usernameHeader: process.env.AUTH_HEADER_USERNAME || 'x-auth-username',
      groupsHeader: process.env.AUTH_HEADER_GROUPS || 'x-auth-groups',
      rolesHeader: process.env.AUTH_HEADER_ROLES || 'x-auth-roles'
    },
    basic: {
      username: process.env.AUTH_USERNAME || 'guest',
      password: process.env.AUTH_PASSWORD || 'password',
      roles: standardRoles,
    },
    oidc: {
      issuer: process.env.OIDC_ISSUER || 'http://localhost:8001/realms/demo/',
      clientId: process.env.OIDC_CLIENT_ID || 'app',
      clientSecret: process.env.OIDC_CLIENT_SECRET || 'app-secret',
      redirectUri: process.env.OIDC_REDIRECT_URI || 'http://localhost:8080'
    }
  },
  contentSecurityPolicy: {
    formAction: process.env.FORM_ACTION?.split(','),
    frameAncestors: process.env.FRAME_ANCESTORS?.split(',')
  },
  cookies: {
    secret: process.env.COOKIES_SECRET || 'changeme',
    secure: ( devMode ? defaultsFalse : defaultsTrue )(process.env.COOKIES_SECURE)
  },
  devMode,
  env,
  logger: {
    destination: process.env.LOG_DESTINATION,
    level: process.env.LOG_LEVEL || ( devMode ? 'debug' : 'info' )
  },
  httpd: {
    host: process.env.LISTEN_HOST || '::',
    port: Number(process.env.PORT) || Number(process.env.LISTEN_PORT) || 8080
  },
  mode: (process.env.MODE || 'server') as Mode,
  privacy: defaultsFalse(process.env.PRIVACY),
  session: {
    store: process.env.SESSION_STORE as SessionStore
  }
};

export default serverConfig;
