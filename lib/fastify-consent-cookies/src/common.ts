import type { SerializeOptions } from 'cookie';
import type { FastifyInstance, FastifyRequest as _Request, FastifyReply as _Reply } from 'fastify';
import type { Promised } from '@not-govuk/types-helpers';

export type CookieOptions = Omit<SerializeOptions, 'encode'>;

export type SetCookie = (this: ReplyFull, name: string, value: any, options?: Omit<CookieOptions, 'httpOnly'>) => void;
export type SetCookieConsent = (this: ReplyFull, value: string[]) => void;

export type RequestExtras = {
  cookies: Record<string, Cookie>
  cookiesMeta: object
};
export type Request = _Request & Partial<RequestExtras>;
export type RequestFull = Request & RequestExtras;

type ReplyExtras = {
  setCookie: SetCookie
  setCookieConsent: SetCookieConsent
};
export type Reply = _Reply & Partial<ReplyExtras>;
export type ReplyFull = _Reply & ReplyExtras;

export type RouteHandlerMethod = (
  this: FastifyInstance,
  request: RequestFull,
  reply: ReplyFull
) => Promised<unknown | void>;

export type Cookie = CookieOptions & {
  name: string
  description: string
  group?: string
};
