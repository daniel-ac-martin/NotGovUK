import etag from 'etag';

import type { Request as _Request, Response, NextFunction } from 'express-serve-static-core';
import type { Middleware as RestifyMiddleware } from '@not-govuk/restify';

type Callback = () => void;

type Request = _Request & {
  logout?: (options?: object | Callback, done?: Callback) => void
};

type ExpressMiddleware = ExpressMiddlewareSync | ExpressMiddlewareAsync;
type ExpressMiddlewareSync = (req: Request, res: Response, next: NextFunction) => void;
type ExpressMiddlewareAsync = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;

const AsyncFunction = async function () {}.constructor;

const isAsync = (x: ExpressMiddleware): x is ExpressMiddlewareAsync => (
  x instanceof AsyncFunction
);

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
          return (chunk, encoding, callback) => {
            target.end(chunk, encoding, callback);
            return next(false);
          }
        case 'redirect':
          return (_code: number | string, _uri?: string) => {
            const { code, uri }: { code?: number, uri: string } = (
              _uri === undefined
                ? { code: 302, uri: _code as string }
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

  if (isAsync(middleware)) {
    middleware(expressReq as Request, expressRes as Response, next);
  } else {
    return middleware(expressReq as Request, expressRes as Response, next);
  }
};

// Some middlewares don't seem to work with a proxied Response object.
// I'm not sure why. This function just provides the req and res objects
// as-is but prevents any promises being passed to Restify as Restify
// treats them differently.
export const adaptCrudely = (middleware: ExpressMiddleware): RestifyMiddleware => (req, res, next) => {
  const expressReq: Request = req as unknown as Request;
  const expressRes: Response = res as unknown as Response;

  if (isAsync(middleware)) {
    middleware(expressReq, expressRes, next);
  } else {
    return middleware(expressReq, expressRes, next);
  }
};

export default adapt;
