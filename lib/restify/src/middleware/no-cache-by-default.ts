import type { Middleware, WriteHead } from "./common";

export const noCacheByDefault: Middleware = (_req, res, next) => {
  const _writeHead = res.writeHead.bind(res);
  const writeHead: WriteHead = function (...args) {
    if (!this.getHeader('Cache-Control')) {
      this.cache('no-cache, no-store, must-revalidate, private');
      this.header('Pragma', 'no-cache');
      this.header('Expires', '0');
    }

    return _writeHead(...args);
  }

  res.writeHead = writeHead as any;

  next();
};

export default noCacheByDefault;
