import config from '../../config';
import { Router, errors } from '@not-govuk/react-restify';
import httpd from './lib/httpd';

const api = new Router();

httpd.get('/403', (req, res, next) => {
  next(new errors.ForbiddenError('No access for you!'));
});

api.get('/403', (req, res, next) => {
  next(new errors.ForbiddenError('No access to this API for you!'));
});

httpd.get('/404', (req, res, next) => {
  next(new errors.ResourceNotFoundError(`${req.path()} does not exist`));
});

api.get('/404', (req, res, next) => {
  next(new errors.ResourceNotFoundError(`${req.path()} does not exist`));
});

const echo = (req, res, next) => {
  res.send({
    params: req.params,
    query: req.query,
    body: req.body
  });
  next();
};

api.get('/echo/:one/:two', echo);
api.post('/echo/:one/:two', echo);

httpd.serveAPI('/api/', api);

httpd.listen(config.httpd.port, config.httpd.host, () => {
  httpd.log.info('%s listening at %s', httpd.name, httpd.url);
});
