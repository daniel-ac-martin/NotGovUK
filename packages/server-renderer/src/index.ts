import { ComponentType, createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

export const reactRenderer = <A extends object, B extends object>(App: ComponentType<A>, appProps: A, Template: ComponentType<B>, templateProps: B) => {
  const formatHTML = (req, res, body) => {
    const createApp = (App: ComponentType<A>, props: A) => (
      h(StaticRouter, {
        location: req.url,
        context: {
          //status: res.statusCode
        },
      }, h(App, props))
    );

    const reqProps = {
      title: body.toString()
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
