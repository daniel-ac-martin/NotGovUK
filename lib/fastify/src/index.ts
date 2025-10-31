import type { FastifyInstance, FastifyServerOptions, RouteHandlerMethod } from 'fastify';

import closeWithGrace from 'close-with-grace';
import _Fastify from 'fastify';

export type FastifyOptions = FastifyServerOptions & {
  dev?: boolean
  liveness?: RouteHandlerMethod
  readiness?: RouteHandlerMethod
};

const probeHandler: RouteHandlerMethod = async (_req, reply) => {
  return true;
};

export const Fastify = ({
  dev = false,
  liveness = probeHandler,
  readiness = probeHandler,
  logger,
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

  httpd.get('/healthz', probeHandler);
  httpd.get('/readiness', probeHandler);

  closeWithGrace(async ({ signal, err }) => {
    if (err) {
      httpd.log.error({ err }, 'server shutting down due to error...')
    } else {
      httpd.log.info(`${signal} received; server shutting down...`)
    }

    await httpd.close()
  });

  return httpd;
};

export default Fastify;
export type { FastifyInstance, RouteHandlerMethod };
export * from './config-helpers';
