import type { Middleware as RestifyMiddleware } from '@not-govuk/restify';
import type { NextHandleFunction as ExpressMiddleware } from 'connect';
import type { Response } from 'express-serve-static-core';

export const adapt = (middleware: ExpressMiddleware): RestifyMiddleware => (req, res, next) => {
  const res2: unknown = {
    ...res,
    getHeader(key) {
      res.getHeader(key);
    },
    setHeader(key, val) {
      res.setHeader(key, val);
    },
    send(content) {
      res.send(content);
      next();
    },
    end() {
      res.statusCode = this.statusCode;
      res.end();
      next(false);
    },
    redirect(uri: string) { return res.redirect(uri, next) }
  };

  return middleware(req, res2 as Response, next);
};

export default adapt;
