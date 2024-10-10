import type { Cookie, Request, Response } from '@not-govuk/consent-cookies';

export enum SessionStore {
  Cookie = 'cookie',
  Memory = 'memory',
  Custom = 'custom'
};

export type Middleware = (req: Request, res: Response) => Promise<void>;
export type Session<T> = (config: T) => Middleware;

export const cookie: Cookie = {
  name: 'session',
  description: 'Your session token on this website.',
  httpOnly: true, // No access from JavaScript
  sameSite: 'lax' // Some sane CSRF protection
};

export type { Promised } from '../common';
export type { RequestFull, ResponseFull } from '@not-govuk/consent-cookies';
