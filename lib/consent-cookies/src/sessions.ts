import type { Cookie, Middleware, RequestFull, ResponseFull, WriteHead } from './common';

export type SessionData = Record<string, unknown>;

export const sessionCookie: Cookie = {
  name: 'session',
  description: 'Your session on this website.',
  httpOnly: true, // No access from JavaScript
  sameSite: 'lax' // Some sane CSRF protection
};

export const sessions: Middleware = (_req, _res, next) => {
  const req = _req as RequestFull;
  const res = _res as ResponseFull;

  // Look for an existing session
  const rawData = req.cookies[sessionCookie.name];
  const sessionData: SessionData = (
    rawData && typeof rawData === 'object'
      ? req.cookies[sessionCookie.name]
      : {}
  );

  // Make session data available on the request
  let modified = false;
  const handler: ConstructorParameters<typeof Proxy<SessionData>>[1] = {
    get(target, prop: string, receiver) {
      const sub = target[prop];
      return (
        typeof sub === 'object' && sub !== null
          ? new Proxy(sub, handler)
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
  req.session = new Proxy<SessionData>(sessionData, handler);

  // Write the session before we send headers
  const _writeHead = res.writeHead.bind(res);
  const writeHead: WriteHead = function (...args) {
    const that = this as ResponseFull;

    if (modified) {
      that.setCookie(sessionCookie.name, req.session);
    }

    return _writeHead(...args);
  };

  res.writeHead = writeHead as any;

  next();
}

export default sessions;
