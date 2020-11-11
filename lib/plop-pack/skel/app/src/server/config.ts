import { AuthMethod, Mode, NodeEnv } from '@not-govuk/engine';
import commonConfig from '../common/config';

const env = process.env.NODE_ENV as NodeEnv;
const devMode = env === NodeEnv.Development;

const serverConfig = {
  ...commonConfig,
  auth: {
    method: devMode ? AuthMethod.Dummy : AuthMethod.OIDC,
    dummy: {
      username: 'TestUser',
      groups: [],
      roles: []
    },
    headers: {
      usernameHeader: process.env.AUTH_HEADER_USERNAME || 'x-auth-username',
      groupsHeader: process.env.AUTH_HEADER_GROUPS || 'x-auth-groups',
      rolesHeader: process.env.AUTH_HEADER_ROLES || 'x-auth-roles'
    },
    oidc: {
      authority: process.env.OIDC_AUTHORITY,
      clientId: process.env.OIDC_CLIENT_ID,
      clientSecret: process.env.OIDC_CLIENT_SECRET,
      redirectUri: process.env.OIDC_REDIRECT_URI || 'http://localhost:8080'
    }
  },
  env: process.env.NODE_ENV as NodeEnv,
  httpd: {
    host: process.env.LISTEN_HOST || '0.0.0.0',
    port: Number(process.env.LISTEN_PORT) || 8080
  },
  mode: (process.env.MODE || 'server') as Mode,
  ssrOnly: !!(process.env.SSR_ONLY && process.env.SSR_ONLY.match(/(yes|true)/i))
};

export default serverConfig;
