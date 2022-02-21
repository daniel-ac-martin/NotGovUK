import { Next, Response, Request } from 'restify';

export type Middleware = (req: Request, res: Response, next: Next) => void;
