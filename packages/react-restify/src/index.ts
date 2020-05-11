import originalRestify, { plugins, ServerOptions as IServerOptions } from 'restify';
import restifyBunyanLogger from 'restify-bunyan-logger';
import { ComponentType as ReactComponent } from 'react';
import { PageLoader, reactRenderer } from '@not-govuk/server-renderer';
import { liveness } from './middleware/health-check';
import { htmlByDefault } from './middleware/html-by-default';
import { preventClickjacking } from './middleware/prevent-clickjacking';
import { noCacheByDefault } from './middleware/no-cache-by-default';
import { ILoggerOptions, logger } from './lib/logger';
import { installServeAPI } from './lib/serve-api';
import webpackMiddleware from './lib/webpack';

const originalCreateServer = originalRestify.createServer.bind(originalRestify);

export type IOptions<A extends object, B extends object> = IServerOptions & {
  bodyParser?: plugins.BodyParserOptions
  liveness?: string
  logger?: ILoggerOptions
  queryParser?: plugins.QueryParserOptions
  requestLogger?: plugins.RequestLogger
  app: {
    Component: ReactComponent<A>,
    props: A
  }
  pageLoader: PageLoader
  template: {
    Component: ReactComponent<B>,
    props: B
  }
  webpackConfig?: any
};

export const createServer = <A extends object, B extends object>(options: IOptions<A, B>) => {
  if (options.name) {
    process.title = options.name.replace(/[^\w]/gi, '').substr(0, 6);
  }

  const name = options.name || 'restify';
  const log = logger(Object.assign({ name }, options.logger));
  const react = reactRenderer(options.app.Component, options.pageLoader, options.app.props, options.template.Component, options.template.props);
  const formatBinary = restify.formatters['application/octet-stream; q=0.2'];
  const formatText = restify.formatters['text/plain; q=0.3'];
  const formatHTML = react.formatHTML;
  const acceptable = [
    'application/json',
    'application/octet-stream',
    'application/xhtml+xml',
    'text/event-stream',
    'text/plain',
    'text/html'
  ];

  const httpd = originalCreateServer(Object.assign({
    log: log
  }, options, {
    formatters: Object.assign({
      'application/graphql; q=0.2': formatText,
      'application/gzip; q=0.2': formatBinary,
      'application/pdf; q=0.2': formatBinary,
      'application/xhtml+xml; q=0.2': formatHTML,
      'application/zip; q=0.2': formatBinary,
      'font/otf; q=0.1': formatBinary,
      'font/ttf; q=0.1': formatBinary,
      'font/woff; q=0.1': formatBinary,
      'font/woff2; q=0.1': formatBinary,
      'image/gif; q=0.2': formatBinary,
      'image/jpeg; q=0.2': formatBinary,
      'image/png; q=0.2': formatBinary,
      'image/svg+xml; q=0.2': formatText,
      'image/x-icon; q=0.1': formatBinary,
      'text/css; q=0.1': formatText,
      'text/event-stream; q=0.1': formatText,
      'text/html; q=0.2': formatHTML,
      'text/javascript; q=0.1': formatText
    }, options.formatters)
  }));

  httpd.log = log;

  installServeAPI(httpd);

  httpd.pre(restify.plugins.pre.sanitizePath());
  httpd.pre(htmlByDefault(httpd));

  httpd.use(restify.plugins.acceptParser(httpd.acceptable.filter(v => acceptable.includes(v))));
  httpd.use(restify.plugins.bodyParser(Object.assign({ mapParams: false }, options.bodyParser)));
  httpd.use(restify.plugins.queryParser(Object.assign({ mapParams: false }, options.queryParser)));
  httpd.use(restify.plugins.requestLogger(options.requestLogger));
  httpd.use(restify.plugins.fullResponse());

  if (process.env['NODE_ENV'] !== 'development') {
    httpd.use(restify.plugins.gzipResponse());
  }

  httpd.on('after', restifyBunyanLogger());

  httpd.use(preventClickjacking);
  httpd.use(noCacheByDefault);
  httpd.use(react.renderer);

  httpd.get(options.liveness || '/healthz', liveness);

  /*
  httpd.get('/public/*', restify.plugins.serveStatic({
    directory: './public',
    appendRequestPath: false
  }));
  */
  const webpack = (
    process.env['NODE_ENV'] === 'development' && options.webpackConfig
      ? webpackMiddleware(options.webpackConfig)
      : undefined
  );
  const servePublicFiles = (
    webpack
      ? webpack.serveFiles
      : restify.plugins.serveStaticFiles('./public')
  );

  httpd.head('/public/*', servePublicFiles);
  httpd.get('/public/*', servePublicFiles);

  if (webpack) {
    httpd.get(webpack.hotPath, webpack.hot);
  }

  return httpd;
};

export const restify = Object.assign(originalRestify, {
  createServer: createServer
});

export default restify;
export * as errors from 'restify-errors';
export { Router } from './lib/router';
