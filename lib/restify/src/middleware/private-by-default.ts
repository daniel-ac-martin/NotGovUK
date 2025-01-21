import type { Middleware, WriteHead } from "./common";

export const privateByDefault: Middleware = (_req, res, next) => {
  const _writeHead = res.writeHead.bind(res);
  const writeHead: WriteHead = function (...args) {
    if (!this.getHeader('Cache-Control')) {
      this.cache('no-cache, no-store, must-revalidate, private');
      this.header('Pragma', 'no-cache');
      this.header('Expires', '0');

      this.header('Cross-Origin-Embedder-Policy', 'require-corp');
      this.header('Cross-Origin-Resource-Policy', 'same-origin');
      this.header('Cross-Origin-Opener-Policy', 'same-origin');
    }

    return _writeHead(...args);
  }

  res.writeHead = writeHead as any;

  next();
};

export default privateByDefault;
