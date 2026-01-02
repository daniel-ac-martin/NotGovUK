import type { FastifyPluginCallback } from 'fastify';
import type { RateLimitOptions, RateLimitPluginOptions } from '@fastify/rate-limit';
import type { FastifySessionOptions } from '@not-govuk/fastify-session';
import type { Options as _BasicOptions } from './basic';
import type { Options as _DummyOptions } from './dummy';
import type { Options as _HeadersOptions } from './headers';
import type { Options as _OIDCOptions } from './oidc';
import type { Maybe, Reply, Request, RequestFull, Serialize, SerDes, UserProfile } from './common';

import fp from 'fastify-plugin';
import fastifyRateLimit from '@fastify/rate-limit';
import fastifySession, { SessionStore } from '@not-govuk/fastify-session';
import { basic } from './basic';
import { dummy } from './dummy';
import { headers } from './headers';
import { oidc } from './oidc';

export enum AuthMethod {
  None = 'none',
  Dummy = 'dummy',
  Headers = 'headers',
  Basic = 'basic',
  OIDC = 'oidc'
};

type Method<T> = { method: T };

type NoneOptions = Method<AuthMethod.None> | { method?: undefined };
type DummyOptions = Method<AuthMethod.Dummy> & _DummyOptions;
type HeadersOptions = Method<AuthMethod.Headers> & _HeadersOptions;
type BasicOptions = Method<AuthMethod.Basic> & _BasicOptions;
type OIDCOptions = Method<AuthMethod.OIDC> & _OIDCOptions;

type MethodOptions = NoneOptions | DummyOptions | HeadersOptions | BasicOptions | OIDCOptions;

const isNone = (v: MethodOptions): v is NoneOptions => v.method === AuthMethod.None || v.method === undefined;
const isDummy = (v: MethodOptions): v is DummyOptions => v.method === AuthMethod.Dummy;
const isHeaders = (v: MethodOptions): v is HeadersOptions => v.method === AuthMethod.Headers;
const isBasic = (v: MethodOptions): v is BasicOptions => v.method === AuthMethod.Basic;
const isOIDC = (v: MethodOptions): v is OIDCOptions => v.method === AuthMethod.OIDC;

//const noAuth: NoneOptions = { method: AuthMethod.None };

export type FastifyAuthPluginOptions = MethodOptions & {
  privacy?: boolean
  pathPrefix?: string
  session?: FastifySessionOptions
  signInPath?: string
  signOutPath?: string
  callbackPath?: string
  redirectPath?: string
  rateLimit?: Omit<RateLimitPluginOptions, 'global'>
  authRateLimit?: RateLimitOptions
};

const fastifyAuthPlugin: FastifyPluginCallback<FastifyAuthPluginOptions> = async (
  fastify,
  {
    privacy = true,
    pathPrefix = '/auth/',
    session = {},
    signInPath = 'sign-in',
    signOutPath = 'sign-out',
    callbackPath = 'callback',
    redirectPath = '/',
    rateLimit: _rateLimit = {
      max: 60,
      timeWindow: 60000, // 1 minute
    },
    authRateLimit = {
      max: 100,
      timeWindow: 15 * 60000 // 15 minutes
    },
    ...methodOptions
  }
) => {
  const fullSessions: boolean = !!(session.store && session.store !== SessionStore.Cookie);
  const serDes: SerDes = (user, _req) => user;
  const redact: Serialize = (user, _req) => ({
    username: user.username,
    roles: user.roles
  });
  const _serialize: Serialize = (
    fullSessions
      ? serDes
      : redact
  );
  const redirect = async (_req: Request, reply: Reply) => {
    return reply.redirect(redirectPath, 302);
  };
  const rateLimit = _rateLimit && {
    ..._rateLimit,
    global: true
  };
  const authConfig = {
    config: {
      rateLimit: authRateLimit
    }
  };

  const {
    authenticate,
    callback,
    deserialize = serDes,
    serialize = _serialize,
    terminate,
    wantSession
  } = await (
    isDummy(methodOptions) ? dummy(methodOptions, fullSessions)
      : isHeaders(methodOptions) ? headers(methodOptions, fullSessions)
      : isBasic(methodOptions) ? basic(methodOptions, fullSessions)
      : isOIDC(methodOptions) ? oidc(methodOptions, fullSessions)
      : {}
  );

  const useSession = wantSession || !privacy;
  const whitelist = (
    callback
      ? [ pathPrefix + callbackPath, pathPrefix + signOutPath ]
      : [ pathPrefix + signOutPath ]
  );

  fastify.decorateRequest('user', null)

  if (authenticate) {
    fastify.register(fastifyRateLimit, rateLimit);

    if (useSession) {
      fastify.addHook('onSend', async (req: Request, _reply, _payload) => {
        if (req.user) {
          if (req.session) {
            req.session.user = await serialize(req.user, req);
          } else {
            req.log.error('Unable to store session');
          }
        }
      });
    }
  }

  if (useSession || session.store) {
    if (!session.store) {
      fastify.log.info('Session required for authentication; registering plugin...');
    }
    fastify.register(fastifySession, session as FastifySessionOptions);
  }

  if (authenticate) {
    if (useSession) {
      fastify.addHook('preHandler', async (req: Request, _reply) => {
        if (req.session?.user) {
          req.user = await deserialize(req.session.user as any, req);

          if (req.user) {
            req.log.debug(`User, '${req.user.username}', authenticated from session`);
          } else {
            req.log.info('Failed to authenticate from session; ending session...');
            delete req.session.user; // FIXME: Delete entire session?!
          }
        }
      });
    }

    if (privacy) {
      fastify.addHook('preHandler', async (req: Request, reply) => {
        if (!req.user && !whitelist.includes(req.url)) {
          const r = await authenticate(req as RequestFull, reply);

          if (!callback) {
            const username = (req.user as any)?.username as Maybe<string>; // TypeScript doesn't seem to understand that authenticate can mutate req

            req.log.debug(`User, '${username}', authenticated`);
          }

          return r;
        }
      });
    } else {
      // Sign-in endpoint
      fastify.get(pathPrefix + signInPath, authConfig, async (req: Request, reply) => {
        const r = await authenticate(req as RequestFull, reply);

        if (!callback) {
          req.log.debug(`User, '${req.user?.username}', authenticated`);
        }

        return (
          reply.sent
            ? r
            : redirect(req, reply)
        );
      });
    }

    if (callback) {
      // Callback endpoint
      fastify.get(pathPrefix + callbackPath, authConfig, async (req: Request, reply) => {
        const r = await callback(req as RequestFull, reply);

        req.log.debug(`User, '${req.user?.username}', authenticated`);

        return (
          reply.sent
            ? r
            : redirect(req, reply)
        );
      });
    }

    // Sign-out endpoint
    fastify.get(pathPrefix + signOutPath, async (req: Request, reply) => {
      if (useSession && req.session?.user) {
        delete req.user;
        delete req.session.user; // FIXME: Delete entire session?!
      }

      const r = await terminate?.(req as RequestFull, reply);

      req.log.debug('User logged out');

      return (
        reply.sent
          ? r
          : redirect(req, reply)
      );
    });
  }
};

export const fastifyAuth = fp(fastifyAuthPlugin, {
  fastify: '5.x',
  name: 'auth',
});
export default fastifyAuth;
export type {
  FastifyAuthPluginOptions as FastifyAuthOptions,
  Reply,
  Request,
  RequestFull,
};
export type {
  ReplyFull,
  RouteHandlerMethod
} from './common';
export { SessionStore } from '@not-govuk/fastify-session';
