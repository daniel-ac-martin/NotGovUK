import serverless from 'serverless-http';
import { ComponentType } from 'react';
import restify, { Router, errors } from '@not-govuk/react-restify';
import { ErrorPageProps, PageLoader, PageProps, PageWrapProps, reactRenderer } from '@not-govuk/server-renderer';
import { gatherPages, pageRoutes } from './lib/pages';
import webpackMiddleware from './lib/webpack';

export type TemplateProps = any & {
  assetsDir: string
  bundle: string
  stylesheets: string[]
};

export type Api = {
  path: string
  router: Router
};

export enum Mode {
  Server = 'server',
  Serverless = 'serverless',
  StaticGenerator = 'static-generator'
};

export enum NodeEnv {
  Development = 'development',
  Production = 'production'
};

export type EngineConfig<A extends PageProps, B extends PageWrapProps, C extends TemplateProps> = {
  ErrorPage: ComponentType<ErrorPageProps>
  PageWrap: ComponentType<A>
  Template: ComponentType<C>
  apis?: Api[]
  env: NodeEnv
  httpd: {
    host: string
    port: number
  }
  mode: Mode
  name: string
  pageLoader: PageLoader
  pageWrapProps: B
  templateProps: C
  webpackConfig: any
};

export const engine = async <A extends PageProps, B extends PageWrapProps, C extends TemplateProps>(config: EngineConfig<A, B, C>) => {
  const pages = await gatherPages(config.pageLoader);
  const react = reactRenderer(
    config.PageWrap,
    config.ErrorPage,
    config.pageLoader,
    {
      ...config.pageWrapProps,
      pages
    },
    config.Template,
    {
      ...config.templateProps,
      assetsDir: '/public',
      bundle: 'bundle.js',
      stylesheets: ['style.css']
    });
  const formatHTML = react.formatHTML;

  // Set up Restify instance
  const httpd = restify.createServer({
    name: config.name,
    formatters: {
      'application/xhtml+xml; q=0.2': formatHTML,
      'text/html; q=0.2': formatHTML
    },
  });

  httpd.use(react.renderer);

  /*
    httpd.get('/public/*', restify.plugins.serveStatic({
    directory: './public',
    appendRequestPath: false
    }));
  */
  const webpack = (
    process.env['NODE_ENV'] === 'development' && config.webpackConfig
      ? webpackMiddleware(config.webpackConfig)
      : undefined
  );
  const servePublicFiles = (
    webpack
      ? webpack.serveFiles
      : restify.plugins.serveStaticFiles('./public')
  );

  httpd.head('/public/*', servePublicFiles);
  httpd.get('/public/*', servePublicFiles);

  if (webpack) {
    httpd.get(webpack.hotPath, webpack.hot);
  }

  // Serve the pages as HTML
  httpd.serve('/', pageRoutes(pages))

  // Serve the APIs as a normal Restify server would
  config.apis && config.apis.forEach(e => (
    httpd.serveAPI(e.path, e.router)
  ));

  let r;

  switch (config.mode) {
    case Mode.Serverless:
      // Run under the Serverless framework
      httpd.handler = httpd._onRequest; // Make Restify compatible with serverless-http
      r = serverless(httpd);
      break;
    case Mode.StaticGenerator:
    case Mode.Server:
      // Run as a classical server
      r = httpd.listen(config.httpd.port, config.httpd.host, () => {
        httpd.log.info('%s listening at %s', httpd.name, httpd.url);
      });

      if (config.mode === Mode.StaticGenerator) {
        r = false;
        // Generate a static site
        throw new Error('WRITEME!');
        httpd.close();
        r = true;
      }
      break;
    default:
      throw new Error('Invalid mode');
      break;
  }

  return r;
};

export default engine;
export { Router, errors } from '@not-govuk/react-restify';
