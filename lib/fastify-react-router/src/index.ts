import type { FastifyPluginCallback } from 'fastify';
import type { Options, ServerBuild } from './common';

import fp from 'fastify-plugin';
import fastifyStatic from '@fastify/static';
import { addHandler } from './common';

type FastifyReactRouterPluginOptions = Options & {
  assets: string
  serverBuild: ServerBuild
};

const fastifyReactRouterPlugin: FastifyPluginCallback<FastifyReactRouterPluginOptions> = async (
  fastify,
  {
    assets,
    serverBuild,
    ...options
  }
) => {
  await fastify.register(fastifyStatic, {
    root: assets
  });

  addHandler(fastify, serverBuild, options);
};

export const fastifyReactRouter = fp(fastifyReactRouterPlugin, {
  fastify: '5.x',
  name: 'react-router',
});
export default fastifyReactRouter;
export type {
  FastifyReactRouterPluginOptions as FastifyReactRouterOptions
};
export type { GetLoadContextFunction } from './common';
