import serverless from 'serverless-http';
import { Router, errors } from '@not-govuk/react-restify';
import config, { Mode } from '../../config';
import httpdGenerator from './lib/httpd';
import { gatherPages, pageRoutes } from './lib/pages';

let handler;

const main = async () => {
  const pages = await gatherPages('./pages');

  switch (config.mode) {
    case Mode.StaticGenerator:
      // Generate a static site
      throw new Error('WRITEME!');
      break;
    case Mode.Server:
    case Mode.Serverless:
      // Set up Restify instance
      const httpd = httpdGenerator({
        pages
      });

      const api = new Router();

      // ---

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

      // ---

      httpd.serve('/', pageRoutes(pages))
      httpd.serveAPI('/api/', api);

      if (config.mode === Mode.Server) {
        // Run as a classical server
        httpd.listen(config.httpd.port, config.httpd.host, () => {
          httpd.log.info('%s listening at %s', httpd.name, httpd.url);
        });
      } else {
        // Run under the Serverless framework
        httpd.handler = httpd._onRequest; // Make Restify compatible
        handler = serverless(httpd);
      }
      break;
    default:
      throw new Error('Invalid mode');
      break;
  }
};

main();

export {
  handler
};
