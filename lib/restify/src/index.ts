/// <reference path='./restify-bunyan-logger.d.ts' />
import _restify, { plugins, ServerOptions as _ServerOptions } from 'restify';
import restifyBunyanLogger from 'restify-bunyan-logger';
import stoppable from 'stoppable';
import { liveness } from './middleware/health-check';
import { htmlByDefault } from './middleware/html-by-default';
import { permissionsPolicy } from './middleware/permissions-policy';
import { CSPSources, preventClickjacking } from './middleware/prevent-clickjacking';
import { preventMimeSniffing } from './middleware/prevent-mime-sniffing';
import { noCacheByDefault } from './middleware/no-cache-by-default';
import { IsReady, readiness } from './middleware/readiness';
import { Logger, LoggerOptions as _LoggerOptions, logger } from './lib/logger';
import { Server as _Server, installServeAPI } from './lib/serve-api';

export type Server = _Server & stoppable.WithStop & {
  log: Logger
};

export type LoggerOptions = Omit<_LoggerOptions, 'name'> & {
  name?: string
}

export type ServerOptions = _ServerOptions & {
  bodyParser?: plugins.BodyParserOptions | false
  frameAncestors?: CSPSources
  grace?: number
  isReady?: IsReady
  liveness?: string
  logger?: LoggerOptions
  queryParser?: plugins.QueryParserOptions
  readiness?: string
  requestLogger?: plugins.RequestLogger
};

const _createServer = _restify.createServer.bind(_restify);

export const createServer = (options: ServerOptions): Server => {
  if (options.name) {
    process.title = options.name.replace(/[^\w]/gi, '').substring(0, 6);
  }

  const name = options.name || 'restify';
  const log = options.log || logger({ name, ...options.logger});
  const grace = options.grace || 25000;
  const formatBinary = restify.formatters['application/octet-stream; q=0.2'];
  const formatText = restify.formatters['text/plain; q=0.3'];
  const acceptable = [
    'application/json',
    'application/octet-stream',
    'application/xhtml+xml',
    'text/event-stream',
    'text/plain',
    'text/html'
  ];

  const httpd = _createServer({
    ...options,
    formatters: {
      'application/graphql; q=0.2': formatText,
      'application/gzip; q=0.2': formatBinary,
      'application/pdf; q=0.2': formatBinary,
      'application/xhtml+xml; q=0.2': formatText,
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
      'text/html; q=0.2': formatText,
      'text/javascript; q=0.1': formatText,
      ...options.formatters
    },
    log
  }) as Server;

  httpd.log = log;

  installServeAPI(httpd);
  stoppable(httpd, grace);

  httpd.pre(restify.plugins.pre.sanitizePath());
  httpd.pre(htmlByDefault(httpd));

  httpd.pre(permissionsPolicy);
  httpd.pre(preventClickjacking({ frameAncestors: options.frameAncestors }));
  httpd.pre(preventMimeSniffing);
  httpd.pre(noCacheByDefault);

  httpd.pre(restify.plugins.acceptParser(httpd.acceptable.filter(v => acceptable.includes(v))));
  (options.bodyParser !== false) && httpd.pre(restify.plugins.bodyParser(Object.assign({ mapParams: false }, options.bodyParser)));
  httpd.pre(restify.plugins.queryParser(Object.assign({ mapParams: false }, options.queryParser)));
  httpd.pre(restify.plugins.requestLogger(options.requestLogger));
  httpd.pre(restify.plugins.fullResponse());

  if (process.env['NODE_ENV'] !== 'development') {
    httpd.pre(restify.plugins.gzipResponse());
  }

  httpd.on('after', restifyBunyanLogger());

  httpd.get(options.liveness || '/healthz', liveness);

  if (options.isReady) {
    httpd.get(options.readiness || '/readiness', readiness(options.isReady));
  }

  return httpd;
};

export const restify = {
  ..._restify,
  createServer
};

export default restify;
export * as errors from 'restify-errors';
export { Router } from './lib/router';
export { cspNone, cspSelf } from './middleware/prevent-clickjacking';
export type { IsReady, CSPSources };
export type { LogLevelString } from './lib/logger';
export type { Next, Request, Response, Middleware } from './middleware/common';
