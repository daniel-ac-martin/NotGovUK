import serverless from 'serverless-http';
import { ComponentType } from 'react';
import { Configuration as WebpackConfig } from 'webpack';
import restify, { Router, errors } from '@not-govuk/restify';
import { PageLoader } from '@not-govuk/app-composer';
import { ApplicationProps, ErrorPageProps, PageProps, TemplateProps, reactRenderer } from '@not-govuk/server-renderer';
import { gatherPages, pageRoutes } from './lib/pages';

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

type PreBuiltAssets = {
  entrypoints: object
  localPath: string
  publicPath: string
}

export type Assets = PreBuiltAssets | WebpackConfig;

const isPreBuiltAssets = (v: Assets): v is PreBuiltAssets => !!(
  'entrypoints' in v && 'localPath' in v && 'publicPath' in v
);

const isWebpackConfig = (v: Assets): v is WebpackConfig => !isPreBuiltAssets(v);

export type EngineConfig = {
  AppWrap: ComponentType<ApplicationProps>
  ErrorPage: ComponentType<ErrorPageProps>
  PageWrap: ComponentType<PageProps>
  Template: ComponentType<TemplateProps>
  assets: Assets
  apis?: Api[]
  env: NodeEnv
  httpd: {
    host: string
    port: number
  }
  mode: Mode
  name: string
  pageLoader: PageLoader
  ssrOnly: boolean
};

export const engine = async (config: EngineConfig) => {
  const webpackConfig = config.env === NodeEnv.Development && isWebpackConfig(config.assets) ? config.assets as WebpackConfig : undefined;
  const preBuiltAssets = isPreBuiltAssets(config.assets) ? config.assets as PreBuiltAssets : undefined;
  const publicPath = preBuiltAssets?.publicPath || webpackConfig.output.publicPath;
  const localAssetsPath = preBuiltAssets?.localPath || webpackConfig.output.path;
  const pages = await gatherPages(config.pageLoader);

  const react = reactRenderer(
    config.AppWrap,
    config.PageWrap,
    config.ErrorPage,
    config.Template,
    {
      assetsPath: publicPath,
      entrypoints: preBuiltAssets?.entrypoints,
      pages,
      rootId: 'root',
      ssrOnly: config.ssrOnly
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

  // Serve static assets built by webpack
  const publicPaths = publicPath + '*';
  const servePublicFiles = restify.plugins.serveStaticFiles(localAssetsPath);

  if (webpackConfig && !config.ssrOnly) {
    const { default: webpackMiddleware } = await import('./lib/webpack');
    const webpack = webpackMiddleware(webpackConfig);

    httpd.pre(webpack.serveFiles);
    // Endpoint for HMR websocket
    httpd.get(webpack.hotPath, webpack.hot);
  }

  httpd.head(publicPaths, servePublicFiles);
  httpd.get(publicPaths, servePublicFiles);

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
export { Router, errors } from '@not-govuk/restify';
