import type { SessionProvider, SessionData } from './common';

// A simple in-memory session
//
// Note: This will NOT work with multiple instances of the application or
// in serverless deployments.

export type MemoryOptions = {
};

export const memorySession: SessionProvider<MemoryOptions> = (_) => {
  const store: Record<string, SessionData> = {};

  return {
    read: (id) => store[id],
    write: (id, data) => {
      store[id] = data;
    }
  };
};

export default memorySession;
