import type { Readable } from 'node:stream';
import type {
  FastifyRequest,
  FastifyReply
} from 'fastify';

import {
  createReadableStreamFromReadable,
  readableStreamToReadable,
  readableStreamToString,
} from './stream';

type EnhancedRequestInit = RequestInit & {
  duplex?: 'half'
};

type SimpleHeaders = Record<string, string>;

const safeMethods = new Set(['GET', 'HEAD']);

export const createRequest = ({
  headers: _headers,
  host,
  method,
  originalUrl,
  protocol,
  raw
}: FastifyRequest): Request => {
  const url = new URL(`${protocol}://${host}${originalUrl}`);
  const headers = new Headers(_headers as SimpleHeaders);
  const controller = new AbortController();
  const baseInit: RequestInit = {
    method,
    headers,
    signal: controller.signal,
  };
  const init: EnhancedRequestInit = (
    safeMethods.has(method)
    ? baseInit
      : {
        ...baseInit,
        body: createReadableStreamFromReadable(raw),
        duplex: 'half'
      }
  )

  let finished = false;
  raw.on('finish', () => { finished = true; });
  raw.on('close', () => !finished && controller.abort());

  return new Request(url.href, init);
};

export const sendResponse = async (reply: FastifyReply, res: Response, stream: boolean = false): Promise<void> => {
  reply.code(res.status);

  res.headers.forEach((v, i) => (
    reply.header(i, v)
  ));

  if (res.headers.get('Content-Type')?.match(/text\/event-stream/i)) {
    reply.raw.flushHeaders?.();
  }

  if (res.body) {
    if (stream) {
      const readable: Readable = readableStreamToReadable(res.body);
      await reply.send(readable);
    } else {
      const str: string = await readableStreamToString(res.body);
      reply.send(str);
    }
  } else {
    reply.send();
  }
};
