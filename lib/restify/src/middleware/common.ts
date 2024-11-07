import type { Next, Response as _Response, Request } from 'restify';
import { ServerResponse } from 'node:http';

// Note: We need to correct some upstream types
export type Response = Omit<_Response, 'contentType'> & {
  contentType?: string
  nonce?: string
};

export type Middleware = (req: Request, res: Response, next: Next) => void;

export type WriteHead = (this: Response, ...a: Parameters<typeof ServerResponse.prototype.writeHead>) => Response;

export type { Next, Request };
