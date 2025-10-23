import type { FastifyPluginCallback } from 'fastify';
import type { Options, ServerBuild } from './common';

import fp from 'fastify-plugin';
import fastifyMiddie from '@fastify/middie';
import { createServer as createViteServer } from 'vite';
import { addHandler } from './common';
import { createLogger } from './dev-logger';

type FastifyReactRouterDevPluginOptions = Options;

const fastifyReactRouterDevPlugin: FastifyPluginCallback<FastifyReactRouterDevPluginOptions> = async (
  fastify,
  options
) => {
  const viteDevServer = await createViteServer({
    server: { middlewareMode: true },
    customLogger: createLogger(fastify.log)
  });

  const serverBuild = () => viteDevServer.ssrLoadModule(
    "virtual:react-router/server-build"
  ) as Promise<ServerBuild>;

  await fastify.register(fastifyMiddie);
  fastify.use(viteDevServer.middlewares);

  addHandler(fastify, serverBuild, options);
};

export const fastifyReactRouterDev = fp(fastifyReactRouterDevPlugin, {
  fastify: '5.x',
  name: 'react-router-dev',
});
export default fastifyReactRouterDev;
export type {
  FastifyReactRouterDevPluginOptions as FastifyReactRouterDevOptions
};
export type { GetLoadContextFunction } from './common';
