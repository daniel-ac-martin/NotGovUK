import type { Middleware } from './common.js';

export const preventMimeSniffing: Middleware = (_req, res, next) => {
  res.header('X-Content-Type-Options', 'nosniff');

  next();
};

export default preventMimeSniffing;
