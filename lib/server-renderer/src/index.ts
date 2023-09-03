import { GraphQLSchema } from 'graphql';
import { ComponentType, createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { html as beautifyHtml } from 'js-beautify';
import { ApplicationProps, ErrorPageProps, PageProps, PageInfoSSR, UserInfo, compose, renderToStringWithData } from '@not-govuk/app-composer';
import { htmlEnvelope } from './html-envelope';

import type { Next, Request as _Request, Response as _Response } from '@not-govuk/restify';

type Request = _Request & {
  auth?: any
};

type RenderApp = (code?: any, body?: any, headers?: any) => Promise<void>;

export type Response = _Response & {
  html?: string
  locals?: any
  renderApp?: RenderApp
};

type Body = string | Error;

const statusToTitle = {
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

const contentTypeToCharSet = (contentType: string): string => {
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
    const routerProps = {
      location: req.url,
      context: {
        statusCode: res.statusCode
      }
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
    const reqProps = {
      err,
      pageTitle: (err && err.title) || body?.toString()
    };
    const appProps = {
      pages,
      signInHRef,
      signOutHRef,
      ...reqProps
    };
    const App = compose({
      AppWrap,
      ErrorPage,
      PageWrap,
      graphQL: graphQL && {
        schema: graphQL.schema
      },
      routerProps,
      data,
      user: { ...user, accessToken: req.auth?.accessToken } // Add the access token separately, in order to keep it off the client
    });
    const app = h(App, appProps)

    const render = (): Promise<string> => renderToStringWithData(app);

    const renderToHtml = (appRender?: string): string => {
      appRender = appRender || renderToString(app);

      let fromHeader = undefined;

      if (!entrypoints) {
        try {
          const header = req.headers['x-entrypoints'];
          const str = (
            header instanceof Array
              ? header[0]
              : header
          );
          fromHeader = JSON.parse(str);
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
        helmet: App.helmetContext.helmet,
        hydrationData: (
          ssrOnly
            ? undefined
            : {
              props: {
                ...appProps,
                pages: appProps.pages.map(
                  ({ Component, ...rest }) => ({ ...rest })
                )
              },
              cache: App.extractDataCache(),
              user
            }
        ),
        nonce: res.nonce,
        rootId,
        scripts: (
          ssrOnly
            ? undefined
            : assets.filter(v => v.endsWith('.js'))
        ),
        stylesheets: assets.filter(v => v.endsWith('.css'))
      });
      const html = env.head + appRender + env.foot;

      return beautifyHtml(html,
        {
          'indent_with_tabs': true
        }
      );
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

  const renderApp = (req: Request): RenderApp => function(code, body, headers) {
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
