import { Mode, NodeEnv } from '@not-govuk/engine';

const config = {
  env: process.env.NODE_ENV as NodeEnv,
  httpd: {
    host: process.env.LISTEN_HOST || '0.0.0.0',
    port: Number(process.env.LISTEN_PORT) || 8080
  },
  mode: (process.env.MODE || 'server') as Mode,
  name: 'my-app',
};

export default config;
