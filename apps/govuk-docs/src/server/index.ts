import { resolve } from 'path';
import engine, { Mode, NodeEnv } from '@not-govuk/engine';
import config from './config';
import Template from './template';
import AppWrap from '../common/app-wrap';
import ErrorPage from '../common/error-page';
import PageWrap from '../common/page-wrap';
import pageLoader from '../common/page-loader';

const main = () => {
  const assets = (
    config.env === NodeEnv.Development && !config.ssrOnly
      ? require('../../webpack.config')
      : {
        localPath: resolve(__dirname, '..', '..', 'dist', 'public'),
        publicPath: '/public/',
        entrypoints: require('../../dist/public/entrypoints.json')
      }
  );

  return engine({
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
};

let app = main();

export const handler = (
  config.mode === Mode.Serverless
    ? async (...args) => (await app)(...args)
    : undefined
);

export default app;

if (module.hot) {
  const restart = () => {
    console.log('Restarting...');
    app.then(
      v => v.close(
        () => app = main()
      )
    );
  };

  module.hot.accept([
    '@not-govuk/engine',
    './config',
    '../../dist/public/entrypoints.json',
    '../../webpack.config',
    './template',
    '../common/app-wrap',
    '../common/error-page',
    '../common/page-loader',
    '../common/page-wrap'
  ], restart);
}
