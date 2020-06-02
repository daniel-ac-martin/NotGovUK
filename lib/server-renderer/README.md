Not Govuk - Server Renderer
===========================

A Restify renderer of React applications using react-router.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/server-renderer restify
```

Then use it in your code as follows:

```js
const restify = require('restify');
const { reactRenderer } = require('@not-govuk/server-renderer');

const { AppWrap } = require('../common/app-wrap');
const { PageWrap } = require('../common/page-wrap');
const { ErrorPage } = require('../common/error-page');
const { Template } = require('./template');

const entrypoints = require('../../dist/public/entrypoints.json');

const react = reactRenderer(
  AppWrap,
  PageWrap,
  ErrorPage,
  Template,
  {
    assetsPath: 'public/',
    entrypoints,
    pages: [],
    rootId: 'root',
    ssrOnly: false
  });
const formatHTML = react.formatHTML;

const httpd = restify.createServer({
  name: config.name,
  formatters: {
    'application/xhtml+xml; q=0.2': formatHTML,
    'text/html; q=0.2': formatHTML
  },
});

httpd.use(react.renderer);

httpd.get('/', (req, res, next) => {
  res.renderApp(200, 'My page\'s title');
  next();
});

httpd.listen(8080, '0.0.0.0', () => {
  httpd.log.info('%s listening at %s', httpd.name, httpd.url);
});
```


Working on this package
-----------------------

Before working on this package you must install its dependencies using
the following command:

```shell
pnpm install
```


### Building

```shell
npm run build
```


### Clean-up

```shell
npm run clean
```
