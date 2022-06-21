import { Next, Response as _Response, Request } from 'restify';

export type Response = _Response & {
  nonce?: string
};

export type Middleware = (req: Request, res: Response, next: Next) => void;

export type { Next, Request };
