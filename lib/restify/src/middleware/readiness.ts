import { Middleware } from './common.js';

export type IsReady = () => boolean;

export const readiness = (isReady: IsReady): Middleware => (_req, res, _next) => {
  res.contentType = undefined;

  if (isReady()) {
    res.send('OK');
  } else {
    res.statusCode = 503;
    res.send('Service Unavailable');
  }
};

export default readiness;
