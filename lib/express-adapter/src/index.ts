import etag from 'etag';

import type { Request as _Request, Response, NextFunction } from 'express-serve-static-core';
import type { Middleware as RestifyMiddleware } from '@not-govuk/restify';

type Callback = () => void;

type Request = _Request & {
  logout?: (options?: object | Callback, done?: Callback) => void
};

type ExpressMiddleware = (req: Request, res: Response, next: NextFunction) => void;

export const adapt = (middleware: ExpressMiddleware): RestifyMiddleware => (req, res, next) => {
  const expressSession: unknown = (
    !req['session']
      ? undefined
      : new Proxy(req['session'], {
        get(target, prop, receiver) {
          switch (prop) {
            case 'regenerate':
              return (cb: (err?: Error) => any) => cb();
            case 'save':
              return (cb: (err?: Error) => any) => cb();
          }

          return Reflect.get(target, prop, receiver);
        }
      })
  );
  const expressReq: unknown = new Proxy(req, {
    get(target, prop, receiver) {
      switch (prop) {
        case 'session':
          return expressSession;
      }

      return Reflect.get(target, prop, receiver);
    }
  });
  const expressRes: unknown = new Proxy(res, {
    get(target, prop, receiver) {
      switch (prop) {
        case 'end':
          return () => {
            target.end();
            return next(false);
          }
        case 'redirect':
          return (_code: number | string, _uri?: string) => {
            const { code, uri }: { code?: number, uri: string } = (
              _uri === undefined
                ? { code: undefined, uri: _code as string }
                : { code: _code as number, uri: _uri }
            );

            return target.redirect(code, uri, next);
          }
        case 'send':
          return (content) => {
            target.statusCode = target.statusCode || 200;

            target.setHeader('Cache-Control', 'private, no-cache');

            if (typeof content === 'string' || content instanceof Buffer) {
              target.setHeader('ETag', etag(content, { weak: true }));
              target.sendRaw(content);
            } else {
              target.send(content);
            }

            return next(false);
          }
      }

      return Reflect.get(target, prop, receiver);
    }
  });

  expressRes['locals'] = expressRes['locals'] || {};

  return middleware(expressReq as Request, expressRes as Response, next);
};

export default adapt;
