// Inspired by @react-router/express
// See: https://github.com/remix-run/react-router/blob/c1cddedf656271a3eec8368f2854c733b3fe27da/packages/react-router-express/server.ts

import type {
  FastifyPluginCallback,
  FastifyRequest,
  FastifyReply,
  RouteHandlerMethod
} from 'fastify';
import type {
  AppLoadContext,
  ServerBuild,
  UNSAFE_MiddlewareEnabled as MiddlewareEnabled,
  unstable_RouterContextProvider as RouterContextProvider
} from 'react-router';

import fp from 'fastify-plugin';
import fastifyMiddie from '@fastify/middie';
import fastifyStatic from '@fastify/static';
import { createRequestHandler } from 'react-router';
import {
  createReadableStreamFromReadable,
  writeReadableStreamToWritable
} from '@react-router/node';
import { createServer as createViteServer } from 'vite';

type MaybePromise<T> = T | Promise<T>;

export type GetLoadContextFunction = (
  req: FastifyRequest,
  reply: FastifyReply,
) => MiddlewareEnabled extends true
  ? MaybePromise<RouterContextProvider>
  : MaybePromise<AppLoadContext>;

type FastifyReactRouterPluginOptions = {
  build?: {
    assets: string
    server: ServerBuild
  }
  getLoadContext?: GetLoadContextFunction
  mode?: string
};

const safeMethods = new Set(['GET', 'HEAD']);
const allowedMethods = new Set(['GET', 'HEAD', 'POST']);

const fastifyReactRouterPlugin: FastifyPluginCallback<FastifyReactRouterPluginOptions> = async (
  fastify,
  {
    build,
    getLoadContext,
    mode = process.env.NODE_ENV
  }
) => {
  let serverBuild: ServerBuild | (() => Promise<ServerBuild>);

  if (build) {
    await fastify.register(fastifyStatic, {
      root: build.assets
    });
    serverBuild = build.server;
  } else {
    const viteDevServer = await createViteServer({
      server: { middlewareMode: true },
    });

    serverBuild = () => viteDevServer.ssrLoadModule(
      "virtual:react-router/server-build"
    ) as Promise<ServerBuild>;

    await fastify.register(fastifyMiddie);
    fastify.use(viteDevServer.middlewares);
  }

  const handleAppRequest = createRequestHandler(serverBuild, mode);
  const handler: RouteHandlerMethod = async (req, reply): Promise<void> => {
    if (!allowedMethods.has(req.method)) {
      return reply.callNotFound();
    }

    const appRequest = createFetchRequest(req);
    const context = await getLoadContext?.(req, reply);
    const appResponse = await handleAppRequest(appRequest, context);

    await sendAppResponse(reply, appResponse);
  };

  // Catch everything that is not covered by an API route
  // => 404s will be rendered as HTML
  fastify.setNotFoundHandler(handler);
};

type EnhancedRequestInit = RequestInit & {
  duplex?: 'half'
};

type SimpleHeaders = Record<string, string>;

const createFetchRequest = ({
  headers: _headers,
  host,
  method,
  originalUrl,
  protocol,
  raw
}: FastifyRequest): Request => {
  const url = new URL(`${protocol}://${host}${originalUrl}`);
  const headers = new Headers(_headers as SimpleHeaders);
  const controller = new AbortController();
  const baseInit: RequestInit = {
    method,
    headers,
    signal: controller.signal,
  };
  const init: EnhancedRequestInit = (
    safeMethods.has(method)
    ? baseInit
      : {
        ...baseInit,
        body: createReadableStreamFromReadable(raw),
        duplex: 'half'
      }
  )

  let finished = false;
  raw.on('finish', () => { finished = true; });
  raw.on('close', () => !finished && controller.abort());

  return new Request(url.href, init);
}

const sendAppResponse = async (reply: FastifyReply, res: Response): Promise<void> => {
  reply.code(res.status);

  res.headers.forEach((v, i) => (
    reply.header(i, v)
  ));

  if (res.headers.get('Content-Type')?.match(/text\/event-stream/i)) {
    reply.raw.flushHeaders?.();
  }

  if (res.body) {
    await writeReadableStreamToWritable(res.body, reply.raw);
  } else {
    reply.send();
  }
}

export const fastifyReactRouter = fp(fastifyReactRouterPlugin, {
  fastify: '5.x',
  name: 'react-router',
});
export default fastifyReactRouter;
export type {
  FastifyReactRouterPluginOptions as FastifyReactRouterOptions
};
