import type { CookieSerializeOptions } from 'cookie';
import type { IncomingMessage as _Request, ServerResponse as _Response } from 'http';
import type { NextFunction } from 'connect';

export type CookieOptions = Omit<CookieSerializeOptions, 'encode'>;

export type SetCookie = (name: string, value: any, options: Omit<CookieOptions, 'httpOnly'>) => void;
export type SetCookieConsent = (value: string[]) => void;

type LogFunction = (message: string, args?: object) => void;

export type Request = _Request & {
  cookies?: object
  cookiesMeta?: object
  log?: {
    error: LogFunction
    warn: LogFunction
    info: LogFunction
    debug: LogFunction
    trace: LogFunction
  }
  session?: object
};

export type Response = _Response & {
  setCookie?: SetCookie
  setCookieConsent?: SetCookieConsent
};

export type Middleware = (req: Request, res: Response, next: NextFunction) => void;

export type Cookie = CookieOptions & {
  name: string
  description: string
  group?: string
};
