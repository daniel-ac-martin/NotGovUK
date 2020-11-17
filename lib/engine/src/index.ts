import { graphqlRestify, graphiqlRestify } from 'apollo-server-restify';
import { GraphQLSchema } from 'graphql';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { ComponentType } from 'react';
import serverless from 'serverless-http';
import { Configuration as WebpackConfig } from 'webpack';
import restify, { Router, errors } from '@not-govuk/restify';
import { PageLoader } from '@not-govuk/app-composer';
import { ApplicationProps, ErrorPageProps, PageProps, TemplateProps, reactRenderer } from '@not-govuk/server-renderer';
import { AuthMethod, AuthOptions, auth } from './lib/auth';
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

export type EngineStage1Options = {
  assets: Assets
  env: NodeEnv
  httpd: {
    host: string
    port: number
  }
  mode: Mode
  name: string
  ssrOnly: boolean
};

export type EngineStage2Options = {
  AppWrap: ComponentType<ApplicationProps>
  ErrorPage: ComponentType<ErrorPageProps>
  PageWrap: ComponentType<PageProps>
  Template: ComponentType<TemplateProps>
  apis?: Api[]
  auth?: AuthOptions
  graphQL?: {
    schema: GraphQLSchema
  }
  pageLoader: PageLoader
};

export const engine = async (options1: EngineStage1Options) => {
  const webpackConfig: WebpackConfig = (
    options1.env === NodeEnv.Development && isWebpackConfig(options1.assets)
      ? (
        Array.isArray(options1.assets)
          ? options1.assets.filter(e => e.target !== 'node')[0]
          : options1.assets
      )
      : undefined
  );
  const preBuiltAssets: PreBuiltAssets = (
    isPreBuiltAssets(options1.assets)
      ? options1.assets
      : undefined
  );
  const publicPath = preBuiltAssets?.publicPath || webpackConfig.output.publicPath;
  const localAssetsPath = preBuiltAssets?.localPath || webpackConfig.output.path;
  const { default: webpackMiddleware } = (
    (webpackConfig && !options1.ssrOnly)
      ? await import('./lib/webpack')
      : { default: undefined }
  );
  const webpack = webpackMiddleware && webpackMiddleware(webpackConfig);
  const port = (
    webpack
      ? options1.httpd.port + 1
      : options1.httpd.port
  );

  let proxy;

  if (webpack) {
    // Set up extra Restify instance for proxy
    const httpd = restify.createServer({
      bodyParser: false,
      name: `${options1.name}-asset-proxy`
    });
    const proxyMiddleware = createProxyMiddleware({
      target: `http://localhost:${port}`,
      changeOrigin: true
    });
    const close = httpd.close.bind(httpd);

    // Serve assets built by webpack
    httpd.pre(webpack.serveFiles);
    // Endpoint for HMR websocket
    httpd.get(webpack.hotPath, webpack.hot);
    // Proxy everything else
    httpd.get('/*', proxyMiddleware);
    httpd.post('/*', proxyMiddleware);

    // Patch close to handle the hot middleware
    httpd.close = function (cb) {
      webpack.hot.close();
      return close(cb);
    };

    httpd.listen(options1.httpd.port, options1.httpd.host, () => {
      httpd.log.info('%s listening at %s', httpd.name, httpd.url);
    });

    proxy = httpd;
  }

  const stage2 = async (options2: EngineStage2Options) => {
    const signInOut = options2.auth && !([
      AuthMethod.None,
      AuthMethod.Dummy,
      AuthMethod.Headers
    ].includes(options2.auth.method))
    const signInHRef = (
      signInOut
        ? '/auth/sign-in'
        : undefined
    );
    const signOutHRef = (
      signInOut
        ? '/auth/sign-out'
        : undefined
    );
    const pages = await gatherPages(options2.pageLoader);

    const react = reactRenderer(
      options2.AppWrap,
      options2.PageWrap,
      options2.ErrorPage,
      options2.Template,
      {
        assetsPath: publicPath,
        entrypoints: preBuiltAssets?.entrypoints,
        graphQL: options2.graphQL && {
          schema: options2.graphQL.schema
        },
        pages,
        rootId: 'root',
        signInHRef,
        signOutHRef,
        ssrOnly: options1.ssrOnly
      });
    const formatHTML = react.formatHTML;

    // Set up Restify instance
    const httpd = restify.createServer({
      name: options1.name,
      formatters: {
        'application/xhtml+xml; q=0.2': formatHTML,
        'text/html; q=0.2': formatHTML
      },
    });

    httpd.use(react.renderer);

    // Gather auth information
    if (options2.auth) {
      httpd.use(auth(options2.auth).middleware);
    }

    // Serve static assets built by webpack
    const publicPaths = publicPath + '*';
    const servePublicFiles = restify.plugins.serveStaticFiles(localAssetsPath);

    if (webpack) {
      // Serve assets built by webpack
      httpd.pre(webpack.serveFiles);
    }

    httpd.head(publicPaths, servePublicFiles);
    httpd.get(publicPaths, servePublicFiles);

    // Serve the pages as HTML
    httpd.serve('/', pageRoutes(pages))

    // Serve the APIs as a normal Restify server would
    options2.apis && options2.apis.forEach(e => (
      httpd.serveAPI(e.path, e.router)
    ));

    // Serve GraphQL
    if (options2.graphQL && !options1.ssrOnly) {
      const endpoint = '/graphql';
      const graphQLOptions = (req) => ({
        schema: options2.graphQL.schema,
        context: { auth: req.auth }
      });
      const graphQL = new Router();
      const handler = graphqlRestify(graphQLOptions);

      graphQL.post('/', handler);
      graphQL.get('/', handler);

      httpd.serveAPI(endpoint, graphQL)

      if (options1.env === NodeEnv.Development) {
        httpd.get('/graphiql', graphiqlRestify({ endpointURL: endpoint }));
      }
    }

    let r;

    switch (options1.mode) {
      case Mode.Serverless:
        // Run under the Serverless framework
        r = serverless(httpd);
        break;
      case Mode.StaticGenerator:
      case Mode.Server:
        // Run as a classical server
        r = httpd;
        httpd.listen(port, options1.httpd.host, () => {
          httpd.log.info('%s listening at %s', httpd.name, httpd.url);
        });

        if (options1.mode === Mode.StaticGenerator) {
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

  return Object.assign(stage2, { proxy } );
};

export default engine;
export { AuthMethod };
export { Router, errors } from '@not-govuk/restify';
