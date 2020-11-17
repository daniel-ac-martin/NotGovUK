import { GraphQLSchema } from 'graphql';
import { ComponentType, createElement as h } from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { html as beautifyHtml } from 'js-beautify';
import { ApplicationProps, ApplicationPropsSSR, ErrorPageProps, PageProps, PageInfoSSR, UserInfo, compose, renderToStringWithData } from '@not-govuk/app-composer';

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

export type TemplateProps = {
  appProps: ApplicationPropsSSR
  appRender: string
  assetsPath: string
  charSet: string
  data: object
  rootId: string
  scripts: string[]
  stylesheets: string[]
  user: UserInfo
};

export type Template = ComponentType<TemplateProps>;

export type RendererOptions = {
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

const contentTypeToCharSet = (contentType: string): string => {
  const matches = contentType.match(/charset=([^;]*)/);

  return (
    matches && matches[1]
      ? matches[1]
      : undefined
  );
};

export const reactRenderer = (AppWrap: ComponentType<ApplicationProps>, PageWrap: ComponentType<PageProps>, ErrorPage: ComponentType<ErrorPageProps>, Template: Template, options: RendererOptions) => {
  const createApp = (req, res, body, charSet) => {
    const data = {}
    const user = req.auth;
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
      pageTitle: (err && err.title) || body.toString()
    };
    const appProps = {
      pages: options.pages,
      signInHRef: options.signInHRef,
      signOutHRef: options.signOutHRef,
      ...reqProps
    };
    const App = compose({
      AppWrap,
      ErrorPage,
      PageWrap,
      graphQL: options.graphQL && {
        schema: options.graphQL.schema
      },
      routerProps,
      data,
      user
    });
    const app = h(App, appProps)

    const render = (): Promise<string> => renderToStringWithData(app);

    const renderToHtml = (appRender?: string): string => {
      appRender = appRender || renderToString(app);

      const assetsByChunkName = res?.locals?.webpack?.devMiddleware.stats.toJson().assetsByChunkName || // v4 dev-middleware
        res?.locals?.webpackStats?.toJson().assetsByChunkName || // v3 dev-middleware
        options.entrypoints; // pre-built assets
      const assets: string[] = (
        Object.values(assetsByChunkName)
          .flat()
          .map(v => String(v))
      );
      const fullTemplateProps = {
        appProps,
        appRender,
        assetsPath: options.assetsPath,
        charSet: charSet,
        data: App.extractDataCache(),
        rootId: options.rootId,
        scripts: (
          options.ssrOnly
            ? undefined
            : assets.filter(v => v.endsWith('.js'))
        ),
        stylesheets: assets.filter(v => v.endsWith('.css')),
        user
      };

      return beautifyHtml(
        renderToStaticMarkup(h(Template, fullTemplateProps)),
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

  const formatHTML = (req, res, body) => {
    if (!res.html) {
      const app = createApp(req, res, body, contentTypeToCharSet(res.header('Content-Type')));
      res.html = app.renderToHtml();
    }

    res.setHeader('Content-Length', Buffer.byteLength(res.html));

    return res.html;
  };

  const renderApp = req => function(code, body, headers): Promise<void> {
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
      options.graphQL
        ? app.render()
        : Promise.resolve('')
    );

    return promise.then(renderedApp => {
      res.html = app.renderToHtml(renderedApp)
      res.send(code, body || true, headers);
    });
  };

  const renderer = (req, res, next) => {
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
