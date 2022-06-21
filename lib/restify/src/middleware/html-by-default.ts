import { Server } from '../lib/serve-api';

import type { Middleware } from './common';

export const htmlByDefault = (httpd: Server): Middleware => (req, res, next) => {
  if (!httpd.forAPI(req)) {
    res.charSet('UTF-8');
    res.contentType = 'text/html';
  }

  next();
};

export default htmlByDefault;
