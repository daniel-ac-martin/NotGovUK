import { assetProxy } from '@not-govuk/asset-proxy';
import config from './config';
import { createServer } from './httpd';
import webpackConfig from '../../webpack.config';

const startProxy = () => (
  config.ssrOnly
    ? undefined
    : assetProxy({
      httpd: config.httpd,
      name: config.name,
      webpackConfig
    })
);
const startApp = () => createServer({ port: config.httpd.port + 1 }).app;

let proxy = startProxy();
let server = startApp();

if (module.hot) {
  const state = {
    needSetup: false,
    stopping: false
  };

  const rehash = (msg: string, needSetup: boolean = false) => () => {
    console.log(msg);

    state.needSetup = state.needSetup || needSetup;

    if (!state.stopping) {
      state.stopping = true;

      server.then(
        v => {
          v.log.info(`${v.name} is going down...`);
          v.stop(
            () => {
              v.log.info(`${v.name} is no longer listening`)

              if (state.needSetup) {
                state.needSetup = false;

                proxy.log.info(`${proxy.name} is going down...`);
                proxy.stop(
                  () => {
                    proxy.log.info(`${proxy.name} is no longer listening`)
                    proxy = startProxy();
                  }
                );
              }

              server = startApp();
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
    '@not-govuk/asset-proxy',
    './config',
    '../../webpack.config'
  ], restart);

  module.hot.accept([
    './httpd'
  ], refresh);
}
