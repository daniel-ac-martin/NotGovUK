import { resolve } from 'path';
import engine, { AuthMethod, Mode, NodeEnv } from '@not-govuk/engine';
import config from './config';
import AppWrap from '../common/app-wrap';
import ErrorPage from '../common/error-page';
import PageWrap from '../common/page-wrap';
import pageLoader from '../common/page-loader';
import isReady from './readiness';
import graphQLSchema from './graphql';

const setup = () => {
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
    assets,
    env: config.env,
    httpd: {
      host: config.httpd.host,
      port: config.httpd.port
    },
    logger: {
      destination: config.logger.destination,
      level: config.logger.level && (
        (config.logger.level === 'trace' && 'trace')
          || (config.logger.level === 'debug' && 'debug')
          || (config.logger.level === 'info' && 'info')
          || (config.logger.level === 'warn' && 'warn')
          || (config.logger.level === 'error' && 'error')
          || (config.logger.level === 'fatal' && 'fatal')
      ) || undefined
    },
    mode: config.mode,
    name: config.name,
    ssrOnly: config.ssrOnly
  });
};

let stage1 = setup();

const startApp = () => stage1.then(
  f => f({
    AppWrap,
    ErrorPage,
    PageWrap,
    auth: config.auth && (
      ( config.auth.method === AuthMethod.None && { method: AuthMethod.None } )
        || ( config.auth.method === AuthMethod.Dummy && { method: AuthMethod.Dummy, ...config.auth.dummy } )
        || ( config.auth.method === AuthMethod.Headers && { method: AuthMethod.Headers, ...config.auth.headers } )
        || ( config.auth.method === AuthMethod.Basic && { method: AuthMethod.Basic, ...config.auth.basic, sessionsSecret: config.auth.sessionsSecret } )
        || ( config.auth.method === AuthMethod.OIDC && { method: AuthMethod.OIDC, ...config.auth.oidc, sessionsSecret: config.auth.sessionsSecret } )
    ),
    graphQL: {
      schema: graphQLSchema
    },
    isReady,
    pageLoader,
    privacy: config.privacy
  })
);

let app = startApp();

export const handler = (
  config.mode === Mode.Serverless
    ? async (...args) => (await app)(...args)
    : undefined
);

export default app;

if (module.hot) {
  const state = {
    needSetup: false,
    stopping: false
  };

  const rehash = (msg: string, needSetup: boolean = false) => () => {
    console.log(msg);

    state.needSetup = state.needSetup || needSetup;

    if (!state.stopping) {
      app.then(
        v => {
          state.stopping = true;

          v.log.info(`${v.name} is going down...`);
          v.stop(
            () => {
              v.log.info(`${v.name} is no longer listening`)

              if (state.needSetup) {
                stage1.then(
                  ({ proxy }) => {
                    state.needSetup = false;

                    proxy.log.info(`${proxy.name} is going down...`);
                    proxy.stop(
                      () => {
                        proxy.log.info(`${proxy.name} is no longer listening`)
                        stage1 = setup();
                      }
                    );
                  }
                );
              }

              app = startApp();
              state.stopping = false;
            }
          );
        }
      );
    }
  };

  const restart = rehash('Restarting...', true);
  const refresh = rehash('Refreshing...');

  module.hot.accept([
    '@not-govuk/engine',
    './config',
    './graphql',
    '../../dist/public/entrypoints.json',
    '../../webpack.config'
  ], restart);

  module.hot.accept([
    '../common/app-wrap',
    '../common/error-page',
    '../common/page-loader',
    '../common/page-wrap'
  ], refresh);
}
