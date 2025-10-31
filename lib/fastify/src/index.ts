import type { FastifyInstance, FastifyServerOptions, onCloseAsyncHookHandler, RouteHandlerMethod } from 'fastify';

import closeWithGrace from 'close-with-grace';
import _Fastify from 'fastify';

export type IsFunction = (() => Promise<boolean>) | (() => boolean);
export type OnClose = (() => Promise<void>) | (() => void);
export type FastifyOptions = FastifyServerOptions & {
  dev?: boolean
  isLive?: IsFunction
  isReady?: IsFunction
  onClose?: OnClose
};

const is: IsFunction = () => true;

const probeHandler = (isFn: IsFunction): RouteHandlerMethod => async (_req, reply) => {
  if (await isFn()) {
    return 'OK';
  } else {
    reply.statusCode = 503;
    return 'Service Unavailable';
  }
};

export const Fastify = ({
  dev = false,
  isLive = is,
  isReady = is,
  logger,
  onClose,
  ...options
}: FastifyOptions): FastifyInstance => {
  const isTTY = process.stdout.isTTY;
  const devLogger = {
    transport: {
      target: '@not-govuk/fastify-dev-logger'
    }
  };
  const httpd = _Fastify({
    logger: logger || (
      !(dev && isTTY)
        ? true
        : devLogger
    ),
    ...options
  });

  // Censor internal server errors in Production
  if (!dev) {
    httpd.setErrorHandler((error, req, reply) => {
      const statusCode = error && error.statusCode

      if ( !statusCode || statusCode === 500 ) {
        error.message = 'An unexpected error occurred.';
      }

      reply.send(error);
    });
  }

  httpd.get('/healthz', probeHandler(isLive));
  httpd.get('/readiness', probeHandler(isReady));

  if (onClose) {
    httpd.addHook('onClose', async (_fastify) => {
      await onClose();
    });
  }

  const signalListeners = closeWithGrace(async ({ signal, err }) => {
    if (err) {
      httpd.log.error({ err }, 'server shutting down due to error...')
    } else {
      httpd.log.info(`${signal} received; server shutting down...`)
    }

    await httpd.close()
  });

  httpd.addHook('onClose', async (_fastify) => {
    signalListeners.uninstall();
  });

  return httpd;
};

export default Fastify;
export type { FastifyInstance, RouteHandlerMethod };
export * from './config-helpers';
