import { Middleware } from "./common";

export const liveness: Middleware = (req, res, next) => {
  res.contentType = undefined;
  res.send('OK');
};

export default liveness;
