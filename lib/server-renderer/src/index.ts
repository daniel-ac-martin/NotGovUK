import { ComponentType, createElement as h } from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { html as beautifyHtml } from 'js-beautify';
import { ApplicationProps, ApplicationPropsSSR, ErrorPageProps, PageProps, PageInfoSSR, compose } from '@not-govuk/app-composer';

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
  rootId: string
  scripts: string[]
  stylesheets: string[]
};

export type Template = ComponentType<TemplateProps>;

export type RendererOptions = {
  assetsPath: string
  entrypoints?: object
  pages: PageInfoSSR[]
  rootId: string,
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
  const formatHTML = (req, res, body) => {
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
      ...reqProps
    };
    const appRender = renderToString(h(
      compose({
        AppWrap,
        ErrorPage,
        PageWrap,
        routerProps
      }),
      appProps
    ));
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
      charSet: contentTypeToCharSet(res.header('Content-Type')),
      rootId: options.rootId,
      scripts: (
        options.ssrOnly
          ? undefined
          : assets.filter(v => v.endsWith('.js'))
      ),
      stylesheets: assets.filter(v => v.endsWith('.css'))
    };

    const html = beautifyHtml(
      renderToStaticMarkup(
        h(Template, fullTemplateProps)
      ),
      {
        'indent_with_tabs': true
      }
    );

    res.setHeader('Content-Length', Buffer.byteLength(html));

    return html;
  };

  const renderApp = function(code, body, headers) {
    if (typeof code !== 'number') {
      headers = body;
      body = code;
      code = 200;
    }

    this.charSet('UTF-8');
    this.contentType = 'text/html';
    this.send(code, body || true, headers);
  };

  const renderer = (req, res, next) => {
    res.renderApp = renderApp;
    next();
  }

  return {
    formatHTML,
    renderer
  };
};

export default reactRenderer;
export type { Application, ApplicationProps, ErrorPage, ErrorPageProps, Page, PageProps } from '@not-govuk/app-composer';
