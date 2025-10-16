import type { FastifyInstance, FastifyServerOptions, RouteHandlerMethod } from 'fastify';

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
  const httpd = _Fastify({
    logger: logger || (
      !dev
        ? true
        : {
          transport: {
            target: '@not-govuk/fastify-dev-logger'
          }
        }
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

  return httpd;
};

export default Fastify;
export type { FastifyInstance, RouteHandlerMethod };
export * from './config-helpers';
