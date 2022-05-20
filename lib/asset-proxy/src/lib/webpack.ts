import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { adapt } from '@not-govuk/express-adapter';

// Note: Inspired by https://github.com/cpeddecord/restify-webpack-middleware
export const webpackMiddleware = webpackConfig => {
  const compiler = webpack(webpackConfig);
  const devOptions = {
    stats: webpackConfig.stats,
    publicPath: webpackConfig.output.publicPath,
    serverSideRender: true
  };
  const dev = webpackDevMiddleware(compiler, devOptions);
  const hot = webpackHotMiddleware(compiler, {});
  const devMiddleware = adapt(dev);
  const hotMiddleware = adapt(hot);

  return {
    hot: {
      close: hot.close.bind(hot)
    },
    hotMiddleware,
    hotPath: '/__webpack_hmr',
    serveFiles: devMiddleware
  };
};

export default webpackMiddleware;
