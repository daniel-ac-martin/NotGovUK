import serverless from 'serverless-http';
import { ComponentType } from 'react';
import restify, { Router, errors } from '@not-govuk/react-restify';
import { AppProps, PageLoader, PageProps } from '@not-govuk/client-renderer';
import { gatherPages, pageRoutes } from './lib/pages';

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

export type EngineConfig<A extends PageProps, B extends AppProps, C extends TemplateProps> = {
  App: ComponentType<A>
  Template: ComponentType<C>
  apis?: Api[]
  appProps: B
  env: NodeEnv
  httpd: {
    host: string
    port: number
  }
  mode: Mode
  name: string
  pageLoader: PageLoader
  templateProps: C
  webpackConfig: any
};

export const engine = async <A extends PageProps, B extends AppProps, C extends TemplateProps>(config: EngineConfig<A, B, C>) => {
  const pages = await gatherPages(config.pageLoader);

  // Set up Restify instance
  const httpd = restify.createServer({
    name: config.name,
    app: {
      Component: config.App,
      props: {
        ...config.appProps,
        pages
      }
    },
    pageLoader: config.pageLoader,
    template: {
      Component: config.Template,
      props: {
        ...config.templateProps,
        assetsDir: '/public',
        bundle: 'bundle.js',
        stylesheets: ['style.css']
      }
    },
    webpackConfig: config.webpackConfig
  });

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
