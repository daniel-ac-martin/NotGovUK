import config from '../../../config';
import restify, { Router, errors } from '@not-govuk/react-restify';
import App from '../../common/app';
import Template from '../template';
import webpackConfig from '../../../webpack.config.js';

import { promises as fs } from 'fs';
import path from 'path';

const httpd = restify.createServer({
  name: config.name,
  app: {
    Component: App,
    props: {
    }
  },
  template: {
    Component: Template,
    props: {
      assetsDir: '/public',
      baseTitle: 'NotGovUK',
      bundle: 'bundle.js',
      stylesheets: ['style.css']
    }
  },
  webpackConfig
});

const pageExtensionPattern = /\.[jt]sx?$/i

const traverseDirectorySub = (dir: string): Promise<string[]> => (
  fs.readdir(dir)
    .then(
      fileList => Promise.all(fileList.map(
        e => {
          const filename = path.join(dir, e);
          return fs.stat(filename)
            .then(
              stat => (
                stat.isDirectory()
                  ? traverseDirectorySub(filename)
                  : (
                    stat.isFile() && filename.match(pageExtensionPattern)
                      ? [filename]
                      : undefined
                  )
              )
            );
        }
      )).then(
        arr => (
          arr
            .flat()
            .filter(e => e)
        )
      )
    )
);

const traverseDirectory = (dir: string): Promise<string[]> => {
  const n = path.join(dir, '').length;

  return traverseDirectorySub(dir)
    .then(
      arr => arr.map(
        s => s.substring(n)
      )
    )
};

const page2Route = (page: string): string => (
  page
    .replace(pageExtensionPattern, '')
    .replace(/index$/, '')
);

const pagesDir = './pages';

const pageMiddleware = (title: string) => (req, res, next) => {
  res.renderApp(200, title);
  next();
};

traverseDirectory(pagesDir)
  .then(pages => {
    console.log(pages);
    pages.map(e => {
      const route = page2Route(e);

      console.log(`Creating route: ${route}`);
      import(`../../../${pagesDir}/${e}`)
        .then(mod => httpd.get(route, pageMiddleware(mod.default)));
    });
  });

const ResourceNotFoundError = errors.ResourceNotFoundError;

const api404Middleware = (req, res, next) => {
  next(new ResourceNotFoundError(`${req.path()} does not exist`));
};

const ui404Middleware = (req, res, next) => {
  res.contentType = 'text/html';
  console.log(res.acceptable);
  //res.render(404, 'div', {}, `${req.path()} does not exist`);
  next(new ResourceNotFoundError(`${req.path()} does not exist`));
};

//httpd.get('/api/*', api404Middleware);
//httpd.post('/api/*', api404Middleware);

//httpd.get('*', ui404Middleware);
//httpd.post('*', ui404Middleware);

//httpd.get('*', api404Middleware);
//httpd.use((err, req, res, next) => {
  //console.log('here');
  //next();
//});

const api = new Router();

httpd.get('/403', (req, res, next) => {
  next(new errors.ForbiddenError('No access for you!'));
});

api.get('/403', (req, res, next) => {
  next(new errors.ForbiddenError('No access to this API for you!'));
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

export default httpd;
