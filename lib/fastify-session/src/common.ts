import type { FastifyInstance } from 'fastify';
import type { Request as _Request, RequestFull as _RequestFull, Reply, ReplyFull } from '@not-govuk/fastify-consent-cookies';
import type { Promised } from '@not-govuk/types-helpers';

export enum SessionStore {
  Cookie = 'cookie',
  Memory = 'memory',
  Custom = 'custom'
};

export type SessionData = Record<string, unknown>;
export type ReadFunction = (id: string) => Promised<SessionData>;
export type WriteFunction = (id: string, data: SessionData) => Promised<void>;

export type Session = {
  read: ReadFunction
  write: WriteFunction
};

export type SessionProvider<T> = (options: T) => Session;

type SessionMeta = {
  data?: SessionData
  id?: string
  modified: boolean
};

export type RequestExtras = {
  session: SessionData
  sessionMeta: SessionMeta
};
export type Request = _Request & Partial<RequestExtras>;
export type RequestFull = _RequestFull & RequestExtras;

export type RouteHandlerMethod = (
  this: FastifyInstance,
  request: RequestFull,
  reply: ReplyFull
) => Promised<unknown | void>;

export type {
  Reply,
  ReplyFull
};
