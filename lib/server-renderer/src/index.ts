import { ComponentType, createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticHandlerContext, StaticRouterProvider, createStaticHandler, createStaticRouter } from 'react-router-dom/server';
import { ApplicationProps, ErrorPageProps, PageProps, PageInfoSSR, UserInfo, compose, renderToStringWithData } from '@not-govuk/app-composer';
import { URI } from '@not-govuk/uri';
import { htmlEnvelope } from './html-envelope';

import type { GraphQLSchema } from 'graphql';
import type { Next, Request as _Request, Response as _Response } from '@not-govuk/restify';
import type { TLSSocket } from 'node:tls';

type NodeRequest = globalThis.Request;
const NodeRequest = globalThis.Request;

type Router = ReturnType<typeof createStaticRouter>

type Request = _Request & {
  auth?: any
};

type RenderApp = (code?: any, body?: any, headers?: any) => Promise<void>;

type ResponseExtras = {
  renderApp: RenderApp
};
type Response = _Response & Partial<ResponseExtras> & {
  html?: string
  locals?: any
};
export type ResponseFull = Response & ResponseExtras;

type Body = string | Error;

const statusToTitle: Record<number, string> = {
  400: 'Bad request',
  401: 'Unauthorised',
  402: 'Payment required',
  403: 'Forbidden',
  404: 'Page not found',
  405: 'Method not allowed',
  406: 'Not acceptable',
  407: 'Proxy authentication required',
  408: 'Request timeout',
  409: 'Conflict',
  410: 'Gone',
  418: 'I am a teapot',
  500: 'Internal server error',
  501: 'Not implemented',
  502: 'Bad gateway',
  503: 'Service unavailable',
  504: 'Gateway timeout',
  505: 'HTTP version not supported',
};

export type RendererOptions = {
  AppWrap: ComponentType<ApplicationProps>
  ErrorPage: ComponentType<ErrorPageProps>
  PageWrap: ComponentType<PageProps>
  assetsPath: string
  entrypoints?: object
  graphQL?: {
    schema: GraphQLSchema
  }
  pages: PageInfoSSR[]
  rootId: string
  signInHRef?: string
  signOutHRef?: string
  ssrOnly: boolean
};

type Format = (req: Request, res: Response, body?: Body) => string;
type Renderer = (req: Request, res: Response, next: Next) => void;

export type RestifyRenderer = {
  formatHTML: Format
  renderer: Renderer
};

export type ReactRenderer = (options: RendererOptions) => RestifyRenderer;

// Adapted from react-router
// MIT License
// Copyright(c) React Training LLC 2015 - 2019 Copyright(c) Remix Software Inc. 2020 - 2021 Copyright(c) Shopify Inc. 2022 -2023
function createFetchRequest(
  req: Request,
  res: Response
): NodeRequest {
  let protocol = (
    (req.socket as TLSSocket).encrypted
      ? 'https'
      : 'http'
  );
  let origin = protocol + '://' + req.header('host');
  let url = new URL(req.url || '/', origin);

  let controller: AbortController | null = new AbortController();
  let headers = new Headers();

  for (let [key, values] of Object.entries(req.headers)) {
    if (values) {
      if (Array.isArray(values)) {
        for (let value of values) {
          headers.append(key, value);
        }
      } else {
        headers.set(key, values);
      }
    }
  }

  let init: RequestInit = {
    method: req.method,
    headers,
    signal: controller.signal,
  };

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    init.body = req.body;
    (init as { duplex: 'half' }).duplex = 'half';
  }

  // Abort action/loaders once we can no longer write a response iff we have
  // not yet sent a response (i.e., `close` without `finish`)
  // `finish` -> done rendering the response
  // `close` -> response can no longer be written to
  res.on('finish', () => (controller = null));
  res.on('close', () => controller?.abort());

  return new NodeRequest(url.href, init);
}

const contentTypeToCharSet = (contentType: string): string | undefined => {
  const matches = contentType.match(/charset=([^;]*)/);

  return (
    matches && matches[1]
      ? matches[1]
      : undefined
  );
};

export const reactRenderer: ReactRenderer = ({
  AppWrap,
  ErrorPage,
  PageWrap,
  assetsPath,
  entrypoints,
  graphQL,
  pages,
  rootId,
  signInHRef,
  signOutHRef,
  ssrOnly
}) => {
  const createApp = (req: Request, res: Response, body?: Body, charSet?: string) => {
    const data = {}
    const user: UserInfo = {
      displayName: req.auth?.displayName,
      emails: req.auth?.emails,
      groups: req.auth?.groups,
      name: req.auth?.name,
      photos: req.auth?.photos,
      roles: req.auth?.roles,
      username: req.auth?.username,
      expiry: req.auth?.expiry?.toISOString()
    };
    const err = (
      body instanceof Error
        ? {
          statusCode: res.statusCode,
          title: statusToTitle[res.statusCode] || 'Error',
          message: body.message
        }
        : undefined
    );
    const appProps = {
      pageTitle: (err && err.title) || body?.toString() || 'NotGovUK'
    };
    const { RouterWrap, extractDataCache, helmetContext, routes } = compose({
      AppWrap,
      ErrorPage,
      PageWrap,
      graphQL: graphQL && {
        schema: graphQL.schema
      },
      data,
      err,
      pages,
      signInHRef,
      signOutHRef,
      user: { ...user, accessToken: req.auth?.accessToken } // Add the access token separately, in order to keep it off the client
    });
    const basename = '/';
    const { query, dataRoutes } = createStaticHandler(routes, { basename });

    const nonce = res.nonce || '';
    const createApp = (router: Router, context: StaticHandlerContext) => (
      h(RouterWrap, appProps,
        h(StaticRouterProvider, {
          context,
          hydrate: false, // Would this interfere with our own hydration? - Seems to break hydration due to inserting a <script>
          nonce,
          router
        }))
    );
    const render = async (): Promise<string> => {
      const fetchRequest = createFetchRequest(req, res);
      const context = await query(fetchRequest, { requestContext: {
        location: req.url || '',
        statusCode: res.statusCode
      } });

      if (context instanceof Response) {
        throw context;
      }

      const router = createStaticRouter(dataRoutes, context);
      const app = createApp(router, context);

      return renderToStringWithData(app);
    };
    const renderWithoutData = (): string => {
      const location = URI.parse(req.url || '');
      const context: StaticHandlerContext = {
        actionData: {},
        actionHeaders: {},
        activeDeferreds: null,
        basename,
        errors: null,
        loaderData: {},
        loaderHeaders: {},
        location: {
          pathname: location.pathname || '/',
          search: location.search || '',
          hash: location.hash || '',
          state: null,
          key: 'default'
        },
        matches: [],
        statusCode: res.statusCode
      };
      const router = createStaticRouter(dataRoutes, context);
      const app = createApp(router, context);

      return renderToString(app);
    };

    const renderToHtml = (appRender?: string): string => {
      appRender = appRender || renderWithoutData();

      let fromHeader = undefined;

      if (!entrypoints) {
        try {
          const header = req.headers['x-entrypoints'];
          const str = (
            header instanceof Array
              ? header[0]
              : header
          );
          fromHeader = JSON.parse(str || '');
        } catch (_e) {}
      }

      const assetsByChunkName = (
        entrypoints || // pre-built assets
        fromHeader || // from asset proxy
        {}
      );
      const assets: string[] = (
        Object.values(assetsByChunkName)
          .flat()
          .map(v => String(v))
      );
      const env = htmlEnvelope({
        assetsPath,
        charSet,
        helmet: helmetContext.helmet,
        hydrationData: (
          ssrOnly
            ? undefined
            : {
              cache: extractDataCache(),
              err,
              pages: pages.map(
                ({ Component, ...rest }) => ({ ...rest })
              ),
              props: appProps,
              signInHRef,
              signOutHRef,
              user
            }
        ),
        nonce,
        rootId,
        scripts: (
          ssrOnly
            ? undefined
            : assets.filter(v => v.endsWith('.js'))
        ),
        stylesheets: assets.filter(v => v.endsWith('.css'))
      });
      const html = env.head + appRender + env.foot;

      return html;
    };

    return {
      render,
      renderToHtml
    };
  };

  const formatHTML = (req: Request, res: Response, body?: Body) => {
    if (!res.html) {
      const app = createApp(req, res, body, contentTypeToCharSet(res.header('Content-Type')));
      res.html = app.renderToHtml();
    }

    res.setHeader('Content-Length', Buffer.byteLength(res.html));

    return res.html;
  };

  const renderApp = (req: Request): RenderApp => function(this: Response, code, body, headers) {
    const res = this;
    const charSet = 'UTF-8';

    if (typeof code !== 'number') {
      headers = body;
      body = code;
      code = 200;
    }

    res.statusCode = code;
    res.charSet(charSet);
    res.contentType = 'text/html';

    const app = createApp(req, res, body, charSet);
    const promise = (
      graphQL
        ? app.render()
        : Promise.resolve('')
    );

    return promise.then(renderedApp => {
      res.html = app.renderToHtml(renderedApp)
      res.send(code, body || true, headers);
    });
  };

  const renderer = (req: Request, res: Response, next: Next) => {
    res.renderApp = renderApp(req);
    next();
  }

  return {
    formatHTML,
    renderer
  };
};

export default reactRenderer;
export type { Application, ApplicationProps, ErrorPage, ErrorPageProps, Page, PageProps } from '@not-govuk/app-composer';
