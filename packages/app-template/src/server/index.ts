import engine, { Mode } from '@not-govuk/engine';
import config from './config';
import Template from './template';
import App from '../common/app';
import pageLoader from '../common/page-loader';
import webpackConfig from '../../webpack.config';

const app = engine({
  App,
  Template,
  appProps: {
    title: 'NotGovUK',
    phase: 'alpha'
  },
  env: config.env,
  httpd: {
    host: config.httpd.host,
    port: config.httpd.port
  },
  mode: config.mode,
  name: config.name,
  pageLoader,
  templateProps: {
    baseTitle: 'NotGovUK'
  },
  webpackConfig
});

export const handler = (
  config.mode === Mode.Serverless
    ? app
    : undefined
);

export default app;
