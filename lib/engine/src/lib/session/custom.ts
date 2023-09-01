import { randomUUID } from 'node:crypto';
import { Promised, Session, SessionStore, cookie } from './common';

import type { OutgoingHttpHeader, OutgoingHttpHeaders, ServerResponse } from 'http';

// Accept a hard-coded user from the options

export type SessionOptionsCustom = {
  store: SessionStore.Custom
  read: (id: string) => Promised<object>
  write: (id: string, data: object) => Promised<void>
};

type Headers = OutgoingHttpHeaders | OutgoingHttpHeader[];
type WriteHead = (statusCode: number, statusMessage?: string | Headers, headers?: Headers) => ServerResponse;

export const customSession: Session<SessionOptionsCustom> = ({
  read,
  write
}) => async (req, res) => {
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
      const newId = (
        newSession
          ? randomUUID()
          : id
      );

      write(newId, sessionData);

      if(newSession) {
        this.setCookie(cookie.name, newId);
      }
    }

    return _writeHead(statusCode, statusMessage, headers);
  };

  res.writeHead = writeHead;
};

export default customSession;
