import type { Middleware } from "./common";

export const noCacheByDefault: Middleware = (req, res, next) => {
  const _writeHead = res.writeHead;
  const writeHead = function () {
    if (!this.getHeader('Cache-Control')) {
      this.cache('no-cache, no-store, must-revalidate, private');
      this.header('Pragma', 'no-cache');
      this.header('Expires', '0');
    }

    return _writeHead.apply(this, arguments);
  }

  res.writeHead = writeHead;

  next();
};

export default noCacheByDefault;
