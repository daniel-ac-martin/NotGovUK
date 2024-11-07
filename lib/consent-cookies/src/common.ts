import type { CookieSerializeOptions } from 'cookie';
import type { NextFunction } from 'connect';
import type { IncomingMessage as _Request, ServerResponse as _Response } from 'node:http';

export type CookieOptions = Omit<CookieSerializeOptions, 'encode'>;

export type SetCookie = (this: Response, name: string, value: any, options?: Omit<CookieOptions, 'httpOnly'>) => void;
export type SetCookieConsent = (this: ResponseFull, value: string[]) => void;

type LogFunction = (message: string, args?: object) => void;

export type RequestExtras = {
  cookies: Record<string, Cookie>
  cookiesMeta: object
  log: {
    error: LogFunction
    warn: LogFunction
    info: LogFunction
    debug: LogFunction
    trace: LogFunction
  }
  session: object
};
export type Request = _Request & Partial<RequestExtras>;
export type RequestFull = _Request & RequestExtras;

type ResponseExtras = {
  setCookie: SetCookie
  setCookieConsent: SetCookieConsent
};
export type Response = _Response & Partial<ResponseExtras>;
export type ResponseFull = Response & ResponseExtras;

export type Middleware = (req: Request, res: Response, next: NextFunction) => void;

export type WriteHead = (this: Response, ...a: Parameters<typeof _Response.prototype.writeHead>) => Response;

export type Cookie = CookieOptions & {
  name: string
  description: string
  group?: string
};
