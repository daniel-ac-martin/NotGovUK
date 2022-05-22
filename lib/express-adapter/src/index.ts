import etag from 'etag';

import type { Request as _Request, Response, NextFunction } from 'express-serve-static-core';
import type { Middleware as RestifyMiddleware } from '@not-govuk/restify';

type Callback = () => void;

type Request = _Request & {
  logout?: (options?: object | Callback, done?: Callback) => void
};

type ExpressMiddleware = (req: Request, res: Response, next: NextFunction) => void;

export const adapt = (middleware: ExpressMiddleware): RestifyMiddleware => (req, res, next) => {
  const expressRes: unknown = new Proxy(res, {
    get(target, prop, receiver) {
      switch (prop) {
        case 'end':
          return () => {
            target.end();
            return next(false);
          }
        case 'redirect':
          return (uri: string) => {
            return target.redirect(uri, next)
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

  return middleware(req, expressRes as Response, next);
};

export default adapt;
