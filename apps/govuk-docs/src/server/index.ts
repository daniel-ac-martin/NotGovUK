import { resolve } from 'path';
import engine, { Mode, NodeEnv } from '@not-govuk/engine';
import config from './config';
import Template from './template';
import AppWrap from '../common/app-wrap';
import ErrorPage from '../common/error-page';
import PageWrap from '../common/page-wrap';
import pageLoader from '../common/page-loader';

const assets = (
  config.env === NodeEnv.Development
    ? require('../../webpack.config')
    : {
      localPath: resolve(__dirname, '..', '..', 'dist', 'public'),
      publicPath: '/public/',
      entrypoints: require('../../dist/public/entrypoints.json')
    }
);

const app = engine({
  AppWrap,
  ErrorPage,
  PageWrap,
  Template,
  assets,
  env: config.env,
  httpd: {
    host: config.httpd.host,
    port: config.httpd.port
  },
  mode: config.mode,
  name: config.name,
  pageLoader,
  ssrOnly: config.ssrOnly
});

export const handler = (
  config.mode === Mode.Serverless
    ? app
    : undefined
);

export default app;
