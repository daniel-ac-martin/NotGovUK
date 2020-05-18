import { Server } from '../lib/serve-api';

export const htmlByDefault = (httpd: Server) => (req, res, next) => {
  if (!httpd.forAPI(req)) {
    res.charSet('UTF-8');
    res.contentType = 'text/html';
  }

  next();
};

export default htmlByDefault;
