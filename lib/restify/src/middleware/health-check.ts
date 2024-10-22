import { Middleware } from "./common";

export const liveness: Middleware = (_req, res, _next) => {
  res.contentType = undefined;
  res.send('OK');
};

export default liveness;
