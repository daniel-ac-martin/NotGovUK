import { SessionData, customSession } from './custom';
import { Session, SessionStore } from './common';

// A simple in-memory session
//
// Note: This will NOT work with multiple instances of the application or
// in serverless deployments.

export type SessionOptionsMemory = {
  store: SessionStore.Memory
};

export const memorySession: Session<SessionOptionsMemory> = (_) => {
  const store: Record<string, SessionData> = {};

  const read = (id: string): SessionData => store[id];
  const write = (id: string, data: SessionData): void => {
    store[id] = data;
  }

  return customSession({
    store: SessionStore.Custom,
    read,
    write
  });
};

export default memorySession;
