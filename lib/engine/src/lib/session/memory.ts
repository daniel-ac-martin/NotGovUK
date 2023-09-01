import { customSession } from './custom';
import { Session, SessionStore } from './common';

// Accept a hard-coded user from the options

export type SessionOptionsMemory = {
  store: SessionStore.Memory
};

export const memorySession: Session<SessionOptionsMemory> = (_) => {
  const store = {};

  const read = (id: string): object => store[id];
  const write = (id: string, data: object): void => {
    store[id] = data;
  }

  return customSession({
    store: SessionStore.Custom,
    read,
    write
  });
}

export default memorySession;
