import type { Cookie, Middleware } from './common';
import type { OutgoingHttpHeader, OutgoingHttpHeaders, ServerResponse } from 'http';

type Headers = OutgoingHttpHeaders | OutgoingHttpHeader[];
type WriteHead = (statusCode: number, statusMessage?: string | Headers, headers?: Headers) => ServerResponse;

export const sessionCookie: Cookie = {
  name: 'session',
  description: 'Your session on this website.',
  httpOnly: true, // No access from JavaScript
  sameSite: 'lax' // Some sane CSRF protection
};

export const sessions: Middleware = (req, res, next) => {
  // Look for an existing session
  const rawData = req.cookies[sessionCookie.name];
  const sessionData: object = (
    rawData && typeof rawData === 'object'
      ? req.cookies[sessionCookie.name]
      : {}
  );

  // Make session data available on the request
  let modified = false;
  const handler = {
    get(target, prop, receiver) {
      const sub = target[prop];
      return (
        typeof sub === 'object' && sub !== null
          ? new Proxy(target[prop], handler)
          : Reflect.get(target, prop, receiver)
      );
    },
    deleteProperty(target, prop) {
      modified = true;

      return Reflect.deleteProperty(target, prop);
    },
    set(target, prop, receiver) {
      modified = true;

      return Reflect.set(target, prop, receiver);
    }
  };
  req.session = new Proxy(sessionData, handler);

  // Write the session before we send headers
  const _writeHead: WriteHead = res.writeHead.bind(res);
  const writeHead: WriteHead = function (statusCode, statusMessage, headers) {
    if (modified) {
      this.setCookie(sessionCookie.name, req.session);
    }

    return _writeHead(statusCode, statusMessage, headers);
  };

  res.writeHead = writeHead;

  next();
}

export default sessions;
