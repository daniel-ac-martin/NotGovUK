import { Middleware, SessionStore } from './common';
import { SessionOptionsCustom, customSession } from './custom';
import { SessionOptionsMemory, memorySession } from './memory';

type SessionOptionsCookie = {
  store: SessionStore.Cookie
};

export type SessionOptions = SessionOptionsCookie | SessionOptionsCustom | SessionOptionsMemory;

export const isSessionOptionsCookie = (v: SessionOptions): v is SessionOptionsCookie => v.store === SessionStore.Cookie;
const isSessionOptionsCustom = (v: SessionOptions): v is SessionOptionsCustom => v.store === SessionStore.Custom;
const isSessionOptionsMemory = (v: SessionOptions): v is SessionOptionsMemory => v.store === SessionStore.Memory;

export const session = (options: SessionOptions): Middleware => (
  isSessionOptionsCustom(options) ? customSession(options)
    : isSessionOptionsMemory(options) ? memorySession(options)
    : undefined
);

export default session;
export { SessionStore, cookie } from './common';
