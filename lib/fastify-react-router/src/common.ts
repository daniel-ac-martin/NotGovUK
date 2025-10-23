// Inspired by @react-router/express
// See: https://github.com/remix-run/react-router/blob/c1cddedf656271a3eec8368f2854c733b3fe27da/packages/react-router-express/server.ts

import type {
  FastifyInstance,
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

import { createRequestHandler } from 'react-router';
import {
  createReadableStreamFromReadable,
  writeReadableStreamToWritable
} from '@react-router/node';

type MaybePromise<T> = T | Promise<T>;

export type GetLoadContextFunction = (
  req: FastifyRequest,
  reply: FastifyReply,
) => MiddlewareEnabled extends true
  ? MaybePromise<RouterContextProvider>
  : MaybePromise<AppLoadContext>;

export type Options = {
  getLoadContext?: GetLoadContextFunction
  mode?: string
};

const safeMethods = new Set(['GET', 'HEAD']);
const allowedMethods = new Set(['GET', 'HEAD', 'POST']);

export const addHandler = (
  fastify: FastifyInstance,
  serverBuild: ServerBuild | (() => Promise<ServerBuild>),
  {
    getLoadContext,
    mode = process.env.NODE_ENV
  }: Options
) => {
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
};

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
};

export type { ServerBuild };
