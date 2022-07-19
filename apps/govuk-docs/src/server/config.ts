import { Mode, NodeEnv, defaultsTrue, defaultsFalse } from '@not-govuk/engine';
import commonConfig from '../common/config.js';

const env = process.env.NODE_ENV as NodeEnv;
const devMode = env === NodeEnv.Development;

const serverConfig = {
  ...commonConfig,
  cookies: {
    secret: process.env.COOKIES_SECRET || 'changeme',
    secure: ( devMode ? defaultsFalse : defaultsTrue )(process.env.COOKIES_SECURE)
  },
  env: process.env.NODE_ENV as NodeEnv,
  logger: {
    destination: process.env.LOG_DESTINATION,
    level: process.env.LOG_LEVEL || 'info'
  },
  httpd: {
    host: process.env.LISTEN_HOST || '0.0.0.0',
    port: Number(process.env.PORT) || Number(process.env.LISTEN_PORT) || 8080
  },
  mode: (process.env.MODE || 'server') as Mode,
  ssrOnly: !!(process.env.SSR_ONLY && process.env.SSR_ONLY.match(/(yes|true)/i))
};

export default serverConfig;
