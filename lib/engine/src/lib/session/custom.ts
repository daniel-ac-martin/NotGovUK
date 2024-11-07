import type { SessionData, WriteHead } from '@not-govuk/consent-cookies';
import { randomUUID } from 'node:crypto';
import { Promised, RequestFull, ResponseFull, Session, SessionStore, cookie } from './common';

export type SessionOptionsCustom = {
  store: SessionStore.Custom
  read: (id: string) => Promised<SessionData>
  write: (id: string, data: SessionData) => Promised<void>
};

export const customSession: Session<SessionOptionsCustom> = ({
  read,
  write
}) => async (_req, res) => {
  const req = _req as RequestFull;
  // Look for an existing session
  const id: string = String(req.cookies[cookie.name]);
  const currentSessionData = (
    id === undefined
      ? {}
      : await read(id)
  );
  const newSession = currentSessionData === undefined;
  const sessionData = (
    newSession
      ? {}
      : currentSessionData
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
      const newId = (
        newSession
          ? randomUUID()
          : id
      );

      write(newId, sessionData);

      if(newSession) {
        that.setCookie(cookie.name, newId);
      }
    }

    return _writeHead(...args);
  };

  res.writeHead = writeHead as any;
};

export default customSession;
export { SessionData };
