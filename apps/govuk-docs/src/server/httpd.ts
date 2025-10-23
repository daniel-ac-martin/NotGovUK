import type { FastifyInstance, RouteHandlerMethod } from '@not-govuk/fastify';
import { Fastify } from '@not-govuk/fastify';
import config from './config';

type Server = FastifyInstance;

const readiness: RouteHandlerMethod = async (_req, reply) => {
  reply.send(true);
};

export const reactRouterOptions = {};

export const createServer = (): Server => {
  const httpd = Fastify({
    dev: config.devMode,
    readiness
  });

  httpd.addHook('onClose', async (fastify) => {
    fastify.log.info('Shutting down...');
  });

  return httpd;
};
