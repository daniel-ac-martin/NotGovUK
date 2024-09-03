import { createProxyMiddleware } from 'http-proxy-middleware';
import { Configuration as WebpackConfig } from 'webpack';
import { adaptCrudely } from '@not-govuk/express-adapter';
import restify from '@not-govuk/restify';
import { webpackMiddleware } from './lib/webpack';

export type AssetProxyOptions = {
  httpd: {
    host: string
    port: number
  }
  name: string
  webpackConfig: WebpackConfig
};

export const assetProxy = ({
  httpd: { host, port },
  name,
  webpackConfig: _webpackConfig
}: AssetProxyOptions) => {
  const webpackConfig: WebpackConfig = (
    Array.isArray(_webpackConfig)
      ? _webpackConfig.filter(e => e.target !== 'node')[0]
      : _webpackConfig
  );
  const webpack = webpackMiddleware(webpackConfig);

  // Set up extra Restify instance for proxy
  const httpd = restify.createServer({
    bodyParser: false,
    name: `${name}-asset-proxy`
  });
  const proxyMiddleware = adaptCrudely(createProxyMiddleware({
    target: `http://localhost:${port + 1}`,
    changeOrigin: true,
    on: {
      proxyReq: (proxyReq, _req, res) => {
        const entrypoints = res.locals.webpack.devMiddleware.stats.toJson().assetsByChunkName;

        proxyReq.setHeader('X-Entrypoints', JSON.stringify(entrypoints));
      }
    }
  }));
  const close = httpd.close.bind(httpd);

  // Serve assets built by webpack
  httpd.pre(webpack.serveFiles);
  // Endpoint for HMR websocket
  httpd.get(webpack.hotPath, webpack.hotMiddleware);
  // Proxy everything else
  httpd.get('/*', proxyMiddleware);
  httpd.post('/*', proxyMiddleware);

  // Patch close to handle the hot middleware
  httpd.close = function (cb) {
    webpack.hot.close();
    return close(cb);
  };

  httpd.listen(port, host, () => {
    httpd.log.info('%s listening at %s', httpd.name, httpd.url);
  });

  return httpd;
};

export default assetProxy;
