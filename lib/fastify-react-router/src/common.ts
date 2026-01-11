// Inspired by @react-router/express
// See: https://github.com/remix-run/react-router/blob/c1cddedf656271a3eec8368f2854c733b3fe27da/packages/react-router-express/server.ts

import type { FastifyInstance, FastifyRequest } from 'fastify';
import type {
  AppLoadContext,
  RouterContext,
  ServerBuild,
  UNSAFE_MiddlewareEnabled as MiddlewareEnabled
} from 'react-router';
import type { RouteHandlerMethod } from '@not-govuk/fastify-auth';
import type { FastifyReply } from '@not-govuk/fastify-harden';
import { EnhancedProvider } from '@not-govuk/react-router-context';

import { RouterContextProvider, createRequestHandler } from 'react-router';
import { cspNonceContext, userInfoContext } from '@not-govuk/react-router-context';
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
    const user = req.user;
    const context: RouterContextProvider | AppLoadContext = await getLoadContext?.(req, reply) ?? new RouterContextProvider();

    if (context instanceof RouterContextProvider) {
      context.set(cspNonceContext, nonce as any);
      context.set(userInfoContext, user as any);
    }
    (context as unknown as EnhancedProvider).cspNonce = nonce; // Legacy support (remove in React Router v8?)
    (context as unknown as EnhancedProvider).user = user; // Legacy support (remove in React Router v8?)

    const appRequest = createRequest(req, { cspNonce: reply.cspNonce });
    const appResponse = await handleAppRequest(appRequest, context as LoadContext);

    await sendResponse(reply, appResponse, stream);
  };

  // Catch everything that is not covered by an API route
  // => 404s will be rendered as HTML
  fastify.setNotFoundHandler(handler);
};

export type { ServerBuild };
export type { EnhancedRequest as Request } from './fetch';
