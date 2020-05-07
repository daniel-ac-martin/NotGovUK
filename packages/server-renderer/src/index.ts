import { ComponentType, createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

const statusToTitle = {
  400: 'Bad request',
  401: 'Unauthorised',
  402: 'Payment required',
  403: 'Forbidden',
  404: 'Page not found',
  405: 'Method not allowed',
  406: 'Not acceptable',
  407: 'Proxy authentication required',
  408: 'Request Timeout',
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

export const reactRenderer = <A extends object, B extends object>(App: ComponentType<A>, appProps: A, Template: ComponentType<B>, templateProps: B) => {
  const formatHTML = (req, res, body) => {
    const createApp = (App: ComponentType<A>, props: A) => (
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
    const fullAppProps = {
      ...appProps,
      ...reqProps
    };
    const fullTemplateProps = {
      ...templateProps,
      ...reqProps,
      app: fullAppProps,
      rootId: 'root'
    };

    const html = renderToString(
      h(Template, {
        ...fullTemplateProps,
        children: createApp(App, fullAppProps)
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
