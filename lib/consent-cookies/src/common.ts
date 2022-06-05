import type { CookieSerializeOptions } from 'cookie';
import type { IncomingMessage as _Request, ServerResponse as _Response } from 'http';
import type { NextFunction } from 'connect';

export type CookieOptions = Omit<CookieSerializeOptions, 'encode'>;

export type SetCookie = (name: string, value: any, options: Omit<CookieOptions, 'httpOnly'>) => void;
export type SetCookieConsent = (value: string[]) => void;

type Request = _Request & {
  cookies?: object
  cookiesMeta?: object
  session?: object
};

type Response = _Response & {
  setCookie?: SetCookie
  setCookieConsent?: SetCookieConsent
};

export type Middleware = (req: Request, res: Response, next: NextFunction) => void;

export type Cookie = CookieOptions & {
  name: string
  description: string
  group?: string
};
