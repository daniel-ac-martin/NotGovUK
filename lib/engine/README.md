Not Govuk - Engine
==================

An engine for running NotGovUK applications.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/engine
```

Then use it in your code as follows:

```js
const engine = require('@not-govuk/engine');

const Template = require('./template');
const AppWrap = require('../common/app-wrap');
const ErrorPage = require('../common/error-page');
const PageWrap = require('../common/page-wrap');
const pageLoader = require('../common/page-loader');

const webpackConfig = require('../../webpack.config');
const entrypoints = require('../../dist/public/entrypoints.json');

const app = engine({
  AppWrap,
  ErrorPage,
  PageWrap,
  Template,
  entrypoints,
  env: 'production',
  httpd: {
    host: '0.0.0.0',
    port: 8080,
  },
  mode: 'server',
  name: 'my-app',
  pageLoader,
  ssrOnly: false,
  webpackConfig
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
