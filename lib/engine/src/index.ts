import { graphqlRestify, graphiqlRestify } from 'apollo-server-restify';
import { createWriteStream } from 'fs';
import { GraphQLSchema } from 'graphql';
import { ComponentType } from 'react';
import serverless from 'serverless-http';
import restify, { IsReady, LogLevelString, LoggerOptions, Router } from '@not-govuk/restify';
import { PageLoader } from '@not-govuk/app-composer';
import { ApplicationProps, ErrorPageProps, PageProps, reactRenderer } from '@not-govuk/server-renderer';
import { AuthMethod, AuthOptions, Request, auth } from './lib/auth';
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

export type Assets = {
  entrypoints?: object
  localPath: string
  publicPath: string
}

export type EngineOptions = {
  AppWrap: ComponentType<ApplicationProps>
  ErrorPage: ComponentType<ErrorPageProps>
  PageWrap: ComponentType<PageProps>
  apis?: Api[]
  assets: Assets
  auth?: AuthOptions
  env: NodeEnv
  graphQL?: {
    schema: GraphQLSchema
  }
  httpd: {
    host: string
    port: number
  }
  isReady?: IsReady
  logger?: {
    destination?: NodeJS.WritableStream | string
    level?: LogLevelString
  }
  mode: Mode
  name: string
  pageLoader: PageLoader
  privacy?: boolean
  ssrOnly: boolean
};

export const engine = async ({
  AppWrap,
  ErrorPage,
  PageWrap,
  apis,
  assets,
  auth: _auth,
  env,
  graphQL: _graphQL,
  httpd: { host, port },
  isReady,
  logger: _logger,
  mode,
  name,
  pageLoader,
  privacy,
  ssrOnly
}: EngineOptions) => {
  const publicPath = assets.publicPath;
  const localAssetsPath = assets.localPath;
  const logDestination = _logger?.destination;
  const logger: LoggerOptions = {
    level: _logger?.level,
    stream: (
      typeof logDestination === 'string'
        ? createWriteStream(logDestination)
        : logDestination
    )
  };

  const signInOut = _auth && !([
    AuthMethod.None,
    AuthMethod.Dummy,
    AuthMethod.Headers
  ].includes(_auth.method))
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
  const pages = await gatherPages(pageLoader);

  const react = reactRenderer({
    AppWrap,
    ErrorPage,
    PageWrap,
    assetsPath: publicPath,
    entrypoints: assets.entrypoints,
    graphQL: _graphQL && {
      schema: _graphQL.schema
    },
    pages,
    rootId: 'root',
    signInHRef,
    signOutHRef,
    ssrOnly
  });
  const formatHTML = react.formatHTML;

  // Set up Restify instance
  const httpd = restify.createServer({
    name,
    formatters: {
      'application/xhtml+xml; q=0.2': formatHTML,
      'text/html; q=0.2': formatHTML
    },
    isReady,
    logger
  });

  httpd.use(react.renderer);

  // Gather auth information
  if (_auth) {
    const { apply: applyAuth } = await auth(_auth);

    applyAuth(httpd, privacy);
  }

  // Serve static assets built by webpack
  const publicPaths = publicPath + '*';
  const servePublicFiles = restify.plugins.serveStaticFiles(localAssetsPath);

  httpd.head(publicPaths, servePublicFiles);
  httpd.get(publicPaths, servePublicFiles);

  // Serve the pages as HTML
  httpd.serve('/', pageRoutes(pages))

  // Serve the APIs as a normal Restify server would
  apis && apis.forEach(e => (
    httpd.serveAPI(e.path, e.router)
  ));

  // Serve GraphQL
  if (_graphQL && !ssrOnly) {
    const endpoint = '/graphql';
    const graphQLOptions = (req: Request) => ({
      schema: _graphQL.schema,
      context: { auth: req.auth }
    });
    const graphQL = new Router();
    const handler = graphqlRestify(graphQLOptions);

    graphQL.post('/', handler);
    graphQL.get('/', handler);

    httpd.serveAPI(endpoint, graphQL)

    if (env === NodeEnv.Development) {
      httpd.get('/graphiql', graphiqlRestify({ endpointURL: endpoint }));
    }
  }

  let r;

  switch (mode) {
    case Mode.Serverless:
      // Run under the Serverless framework
      r = serverless(httpd);
      break;
    case Mode.StaticGenerator:
    case Mode.Server:
      // Run as a classical server
      r = httpd;
      httpd.listen(port, host, () => {
        httpd.log.info('%s listening at %s', httpd.name, httpd.url);
      });

      if (mode === Mode.StaticGenerator) {
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
export { AuthMethod };
export { Router, errors } from '@not-govuk/restify';
export type { IsReady };
