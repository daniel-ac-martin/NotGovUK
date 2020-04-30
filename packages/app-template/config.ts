export enum NodeEnv {
  Development = 'development',
  Production = 'production'
};

export enum Mode {
  Server = 'server',
  Serverless = 'serverless',
  StaticGenerator = 'static-generator'
};

export interface IConfig {
  env: NodeEnv
  httpd: {
    host: string
    port: number
  }
  name: string
  mode: Mode
};

const config: IConfig = {
  env: process.env.NODE_ENV as NodeEnv,
  httpd: {
    host: process.env.LISTEN_HOST || '0.0.0.0',
    port: Number(process.env.LISTEN_PORT) || 8080
  },
  name: 'my-app',
  mode: (process.env.MODE || 'server') as Mode
};

export default config;
