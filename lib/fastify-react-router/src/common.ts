// Inspired by @react-router/express
// See: https://github.com/remix-run/react-router/blob/c1cddedf656271a3eec8368f2854c733b3fe27da/packages/react-router-express/server.ts

import type { FastifyInstance, FastifyRequest, RouteHandlerMethod } from 'fastify';
import type {
  AppLoadContext,
  RouterContext,
  ServerBuild,
  UNSAFE_MiddlewareEnabled as MiddlewareEnabled
} from 'react-router';
import type { FastifyReply } from '@not-govuk/fastify-harden';

import { RouterContextProvider, createRequestHandler } from 'react-router';
import { createRequest, sendResponse } from './fetch';

type MaybePromise<T> = T | Promise<T>;

type LoadContext = MiddlewareEnabled extends true
  ? RouterContextProvider
  : AppLoadContext;

export type GetLoadContextFunction = (
  req: FastifyRequest,
  reply: FastifyReply,
) => MaybePromise<LoadContext>;

export type Options = {
  getLoadContext?: GetLoadContextFunction
  mode?: string
  stream?: boolean
};

export const nonceContext = 'CSP_NONCE' as RouterContext<string | undefined>;

const allowedMethods = new Set(['GET', 'HEAD', 'POST']);

export const addHandler = (
  fastify: FastifyInstance,
  serverBuild: ServerBuild | (() => Promise<ServerBuild>),
  {
    getLoadContext,
    mode = process.env.NODE_ENV,
    stream = false
  }: Options
) => {
  const handleAppRequest = createRequestHandler(serverBuild, mode);
  const handler: RouteHandlerMethod = async (req, reply: FastifyReply): Promise<void> => {
    if (!allowedMethods.has(req.method)) {
      return reply.callNotFound();
    }

    const nonce = reply.cspNonce;
    const context: RouterContextProvider | AppLoadContext = await getLoadContext?.(req, reply) ?? new RouterContextProvider();

    if (context instanceof RouterContextProvider) {
      context.set(nonceContext, nonce);
    }
    (context as any).nonce = nonce; // Legacy support (remove in React Router v8?)

    const appRequest = createRequest(req);
    const appResponse = await handleAppRequest(appRequest, context as LoadContext);

    await sendResponse(reply, appResponse, stream);
  };

  // Catch everything that is not covered by an API route
  // => 404s will be rendered as HTML
  fastify.setNotFoundHandler(handler);
};

export type { ServerBuild };
