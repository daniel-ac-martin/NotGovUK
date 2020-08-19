import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { errors } from '@not-govuk/restify';
import etag from 'etag';
import { Response } from 'express-serve-static-core';
import { NextHandleFunction } from 'connect';

// Note: Inspired by https://github.com/cpeddecord/restify-webpack-middleware
export const webpackMiddleware = webpackConfig => {
  const compiler = webpack(webpackConfig);
  const devOptions = {
    stats: webpackConfig.stats,
    publicPath: webpackConfig.output.publicPath,
    serverSideRender: true
  };
  const dev: NextHandleFunction = webpackDevMiddleware(compiler, devOptions)
  const hot: NextHandleFunction = webpackHotMiddleware(compiler, {})

  return {
    serveFiles: (req, res, next) => {
      res.locals = res.locals || {};

      const restifyTransport = {
        setHeader(key, val) {
          res.setHeader(key, val);
        },
        send(content) {
          res.charSet('utf-8');
          res.writeHead(this.statusCode || 200, {
            'Cache-Control': 'private, no-cache',
            'ETag': etag(content, { weak: true })
          });
          res.write(content);
          res.end();
        },
        end() {
          return;
        },
        locals: res.locals
      };

      return dev(req, restifyTransport as Response, next);
    },
    hot,
    hotPath: '/__webpack_hmr'
  };
};

export default webpackMiddleware;
