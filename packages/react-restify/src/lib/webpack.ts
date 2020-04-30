import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { ResourceNotFoundError } from 'restify-errors';
import etag from 'etag';
import { Response } from 'express-serve-static-core';
import { NextHandleFunction } from 'connect';

// Note: Inspired by https://github.com/cpeddecord/restify-webpack-middleware
export const webpackMiddleware = webpackConfig => {
  const compiler = webpack(webpackConfig);
  const dev: NextHandleFunction = webpackDevMiddleware(compiler, { publicPath: webpackConfig.output.publicPath, serverSideRender: true })
  const hot: NextHandleFunction = webpackHotMiddleware(compiler, {})

  return {
    serveFiles: (req, res, next) => {
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
      };
      const nextStub = () => {
        next(new ResourceNotFoundError(`${req.path()} does not exist`));
      };

      return dev(req, restifyTransport as Response, nextStub);
    },
    hot,
    hotPath: '/__webpack_hmr'
  };
};

export default webpackMiddleware;
