import { ComponentType, createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { ErrorPageProps, PageWrapProps, PageLoader, PageProps, withPages } from '@not-govuk/client-renderer';

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

export type TemplateProps = any & {
  app: object
  rootID: string
};

export const reactRenderer = <A extends PageWrapProps, B extends PageProps, C extends TemplateProps>(PageWrap: ComponentType<A>, ErrorPage: ComponentType<ErrorPageProps>, pageLoader: PageLoader, pageWrapProps: B, Template: ComponentType<C>, templateProps: C) => {
  const formatHTML = (req, res, body) => {
    const createApp = (App: ComponentType<B>, props: B) => (
      h(StaticRouter, {
        location: req.url,
        context: {
          statusCode: res.statusCode
        },
      }, h(App, props))
    );

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
      ...pageWrapProps,
      ...reqProps
    };
    const fullTemplateProps = {
      ...templateProps,
      ...reqProps,
      app: appProps,
      rootId: 'root'
    };

    const html = renderToString(
      h(Template, {
        ...fullTemplateProps,
        children: createApp(withPages(PageWrap, ErrorPage, pageLoader), appProps)
      })
    )

    res.setHeader('Content-Length', Buffer.byteLength(html));

    return html;
  };

  const renderApp = function(code, body, headers) {
    if (typeof code !== 'number') {
      headers = body;
      body = code;
      code = 200;
    }

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
export type { ErrorPageProps, PageWrapProps, PageLoader, PageProps } from '@not-govuk/client-renderer';
