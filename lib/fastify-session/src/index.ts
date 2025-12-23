import type { FastifyPluginCallback } from 'fastify';
import type { Cookie, FastifyConsentCookiesOptions } from '@not-govuk/fastify-consent-cookies';
import type { Reply, ReplyFull, Request, RequestFull, SessionData } from './common';
import type { CustomOptions as _CustomOptions } from './custom';
import type { MemoryOptions as _MemoryOptions } from './memory';

import { randomUUID } from 'node:crypto';
import fp from 'fastify-plugin';
import { defaultSecret, fastifyConsentCookies } from '@not-govuk/fastify-consent-cookies';
import { SessionStore } from './common';
import { customSession } from './custom';
import { memorySession } from './memory';

type Store<T> = { store: T };

type CookieOptions = Store<SessionStore.Cookie>;
type MemoryOptions = Store<SessionStore.Memory> & _MemoryOptions;
type CustomOptions = Store<SessionStore.Custom> & _CustomOptions;

type StoreOptions = CookieOptions | MemoryOptions | CustomOptions | { store?: undefined }

const isCookie = (v: StoreOptions): v is CookieOptions => v.store === SessionStore.Cookie;
const isMemory = (v: StoreOptions): v is MemoryOptions => v.store === SessionStore.Memory;
const isCustom = (v: StoreOptions): v is CustomOptions => v.store === SessionStore.Custom;

type OptionalKeys<T, K extends keyof T> = Partial<T> & Omit<T, K>;

export type FastifySessionPluginOptions = StoreOptions & {
  cookies: OptionalKeys<FastifyConsentCookiesOptions, 'cookies'>
};

export const sessionCookie: Cookie = {
  name: 'session',
  description: 'Your session on this website.',
  httpOnly: true, // No access from JavaScript
  sameSite: 'lax' // Some sane CSRF protection
};

const fastifySessionPlugin: FastifyPluginCallback<FastifySessionPluginOptions> = async (
  fastify,
  {
    cookies: {
      cookies: _cookies = [],
      secret = defaultSecret,
      ...cookieOptions
    },
    ...storeOptions
  }
) => {
  const {
    read,
    write
  } = (
    isMemory(storeOptions) ? memorySession(storeOptions)
      : isCustom(storeOptions) ? customSession(storeOptions)
      : {}
  );
  const cookieSession = !(read && write);

  if (cookieSession && !isCookie(storeOptions)) {
    fastify.log.warn('No session store configured; will use cookies for limited session');
  } else if (isMemory(storeOptions)) {
    fastify.log.warn('Using in memory session; not suitable for serverless deployment or horizontal scaling');
  }

  fastify.decorateRequest('session')
  fastify.decorateRequest('sessionMeta')

  fastify.addHook('onSend', async (_req: Request, _reply: Reply, _payload) => {
    const req = _req as RequestFull;
    const reply = _reply as ReplyFull;

    const cookieName = sessionCookie.name;
    const sessionData = req.sessionMeta.data || {};

    if (req.sessionMeta.modified) {
      req.log.debug('Writing new session data');

      if (cookieSession) {
        reply.setCookie(cookieName, sessionData);
      } else {
        const sessionId = req.sessionMeta.id || randomUUID();

        write(sessionId, sessionData);

        if(!req.sessionMeta.id) {
          req.log.debug('Setting new session cookie');
          reply.setCookie(cookieName, sessionId);
        }
      }
    }
  });

  fastify.register(fastifyConsentCookies, {
    ...cookieOptions,
    cookies: [ sessionCookie, ..._cookies ],
    secret
  });

  fastify.addHook('preHandler', async (_req: Request, _reply) => {
    const req  = _req as RequestFull;

    req.sessionMeta = {
      id: undefined,
      data: undefined,
      modified: false
    };

    // Look for an existing session
    if (cookieSession) {
      const rawData = req.cookies[sessionCookie.name];
      const sessionData: SessionData = (
        rawData && typeof rawData === 'object'
          ? req.cookies[sessionCookie.name]
          : {}
      );

      req.sessionMeta.data = sessionData;
    } else {
      const id: string = String(req.cookies[sessionCookie.name]);
      const sessionData = (
        id === undefined
          ? undefined
          : await read(id)
      );

      req.sessionMeta.data = sessionData || {};
      req.sessionMeta.id = (
        sessionData
          ? id
          : undefined
      );
    }

    // Make session data available on the request
    const handler: ConstructorParameters<typeof Proxy<SessionData>>[1] = {
      get(target, prop: string, receiver) {
        const sub = target[prop];
        return (
          typeof sub === 'object' && sub !== null
            ? new Proxy(sub, handler)
            : Reflect.get(target, prop, receiver)
        );
      },
      deleteProperty(target, prop) {
        req.sessionMeta.modified = true;

        return Reflect.deleteProperty(target, prop);
      },
      set(target, prop, receiver) {
        req.sessionMeta.modified = true;

        return Reflect.set(target, prop, receiver);
      }
    };

    req.session = new Proxy<SessionData>(req.sessionMeta.data, handler);
  });
};

export const fastifySession = fp(fastifySessionPlugin, {
  fastify: '5.x',
  name: 'session',
});
export default fastifySession;
export {
  SessionStore,
  defaultSecret
};
export type {
  FastifySessionPluginOptions as FastifySessionOptions,
  Reply,
  ReplyFull,
  Request,
  RequestFull,
  SessionData
};
export type {
  Session
} from './common';
