import type { ComponentType } from 'react';
import { graphqlRestify, graphiqlRestify } from 'apollo-server-restify';
import { createWriteStream } from 'fs';
import { GraphQLSchema } from 'graphql';
import serverless, { Handler } from 'serverless-http';
import restify, { CSPSources, IsReady, LogLevelString, LoggerOptions, Middleware, Router, Server, cspNone } from '@not-govuk/restify';
import { PageLoader } from '@not-govuk/app-composer';
import { consentCookies } from '@not-govuk/consent-cookies';
import { ApplicationProps, ErrorPageProps, PageProps, reactRenderer } from '@not-govuk/server-renderer';
import { AuthMethod, AuthOptions, auth } from './lib/auth';
import { gatherPages, pageRoutes } from './lib/pages';
import { SessionStore, SessionOptions, cookie as sessionCookie, session } from './lib/session';

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
  cookies: {
    secret: string
    secure?: boolean
  }
  env: NodeEnv
  frameAncestors?: CSPSources
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
  session?: SessionOptions
  ssrOnly: boolean
};

export type Engine = Server | Handler;

export const isServer = (v: Engine): v is Server => (
  'log' in v
);
export const isHandler = (v: Engine): v is Handler => (
  !isServer(v)
);

export const engine = async ({
  AppWrap,
  ErrorPage,
  PageWrap,
  apis,
  assets,
  auth: authOptions,
  cookies: cookieOptions,
  env,
  frameAncestors = cspNone,
  graphQL: _graphQL,
  httpd: { host, port },
  isReady,
  logger: _logger,
  mode,
  name,
  pageLoader,
  privacy,
  session: sessionOptions,
  ssrOnly
}: EngineOptions): Promise<Engine> => {
  const publicPath = assets.publicPath;
  const localAssetsPath = assets.localPath;
  const cookies = [];
  const logDestination = _logger?.destination;
  const logger: LoggerOptions = {
    level: _logger?.level,
    stream: (
      typeof logDestination === 'string'
        ? createWriteStream(logDestination)
        : logDestination
    )
  };

  const signInOut = authOptions && !([
    AuthMethod.None,
    AuthMethod.Dummy,
    AuthMethod.Headers
  ].includes(authOptions.method))
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
    frameAncestors,
    isReady,
    logger
  });

  httpd.use(react.renderer);

  let applyAuth;
  let needSessions = !!sessionOptions;
  const sessionMiddleware = sessionOptions && session(sessionOptions);
  const fullSessions = !!sessionMiddleware;

  // Gather auth information
  if (authOptions) {
    const { apply, sessions: authSessions } = await auth(authOptions, privacy, fullSessions);

    needSessions = needSessions || authSessions;
    applyAuth = apply;
  }

  const cookieSessions = needSessions && !fullSessions;

  if ( needSessions || cookies.length ) {

    if (sessionMiddleware) {
      cookies.push(sessionCookie);
    }

    httpd.pre(consentCookies({
      cookies,
      provideSession: cookieSessions,
      secret: cookieOptions.secret,
      secure: cookieOptions.secure
    }));

    if (sessionMiddleware) {
      httpd.pre(sessionMiddleware);
    }
  }

  if (applyAuth) {
    applyAuth(httpd);
  }

  // Serve static assets built by webpack
  const publicPaths = publicPath + '*';
  const markFlushed: Middleware = (_req, res: any, next) => {
    // This is a workaround for a bug that emerges when using serveStaticFiles with Restify's gzip plugin
    res._flushed = true;
    next();
  }
  const servePublicFiles = [ restify.plugins.serveStaticFiles(localAssetsPath), markFlushed ];

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
    const graphQLOptions = (req?: any) => ({
      schema: _graphQL.schema,
      context: { auth: req?.auth }
    });
    const graphQL = new Router();
    const handler = [ graphqlRestify(graphQLOptions), markFlushed ];

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
      r = serverless(httpd as unknown as Partial<serverless.FrameworkApplication>);
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
export { AuthMethod, SessionStore };
export { Router, cspNone, cspSelf, errors } from '@not-govuk/restify';
export { defaultsFalse, defaultsTrue } from './lib/config-helpers';
export type { Handler, IsReady, Server };
export type { Request } from './lib/auth';
