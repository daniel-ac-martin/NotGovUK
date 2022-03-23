import { AuthMethod, Mode, NodeEnv } from '@not-govuk/engine';
import commonConfig from '../common/config';

const env = process.env.NODE_ENV as NodeEnv;
const devMode = env === NodeEnv.Development;
const dummyRoles = ['books.author', 'books.title'];

const serverConfig = {
  ...commonConfig,
  auth: {
    method: process.env.AUTH_METHOD || ( devMode ? AuthMethod.Dummy : AuthMethod.OIDC ),
    sessionsSecret: process.env.SESSIONS_SECRET || 'changeme',
    dummy: {
      username: 'TestUser',
      groups: [],
      roles: dummyRoles
    },
    headers: {
      usernameHeader: process.env.AUTH_HEADER_USERNAME || 'x-auth-username',
      groupsHeader: process.env.AUTH_HEADER_GROUPS || 'x-auth-groups',
      rolesHeader: process.env.AUTH_HEADER_ROLES || 'x-auth-roles'
    },
    basic: {
      username: process.env.AUTH_USERNAME || 'guest',
      password: process.env.AUTH_PASSWORD || 'password',
      roles: dummyRoles,
    },
    oidc: {
      issuer: process.env.OIDC_ISSUER || 'https://sso-dev.notprod.homeoffice.gov.uk/auth/realms/lev/',
      clientId: process.env.OIDC_CLIENT_ID || 'local-dev',
      clientSecret: process.env.OIDC_CLIENT_SECRET,
      redirectUri: process.env.OIDC_REDIRECT_URI || 'http://localhost:8080'
    }
  },
  env,
  logger: {
    destination: process.env.LOG_DESTINATION,
    level: process.env.LOG_LEVEL || 'info'
  },
  httpd: {
    host: process.env.LISTEN_HOST || '0.0.0.0',
    port: Number(process.env.PORT) || Number(process.env.LISTEN_PORT) || 8080
  },
  mode: (process.env.MODE || 'server') as Mode,
  privacy: !!(process.env.PRIVACY && process.env.PRIVACY.match(/(yes|true)/i)),
  ssrOnly: !!(process.env.SSR_ONLY && process.env.SSR_ONLY.match(/(yes|true)/i))
};

export default serverConfig;
