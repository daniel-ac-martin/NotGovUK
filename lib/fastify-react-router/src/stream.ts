import { Readable } from 'node:stream';

export const readableStreamToReadable = (stream: ReadableStream<Uint8Array>): Readable => {
  const reader = stream.getReader();
  let closed = false;

  return new Readable({
    async read() {
      if (closed) {
        this.push(null);
        return;
      }

      try {
        const { done, value } = await reader.read();
        if (done) {
          closed = true;
          this.push(null);
          await reader.releaseLock();
        } else {
          this.push(value);
        }
      } catch (err) {
        closed = true;
        this.destroy(err as Error);
        try {
          await reader.cancel(err);
        } catch {}
      }
    },

    async destroy(err, callback) {
      if (!closed) {
        closed = true;
        try {
          await reader.cancel(err);
        } catch {}
      }
      callback(err);
    },
  });
};

export {
  createReadableStreamFromReadable,
  readableStreamToString,
} from '@react-router/node';
