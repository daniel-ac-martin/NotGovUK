NotGovUK - Engine
=================

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
const { resolve } = require('path');

const isReady = require('./readiness');
const graphQLSchema = require('./graphql');

const AppWrap = require('../common/app-wrap');
const ErrorPage = require('../common/error-page');
const PageWrap = require('../common/page-wrap');
const pageLoader = require('../common/page-loader');

const entrypoints = require('../../dist/public/entrypoints.json');

const app = engine({
  AppWrap,
  ErrorPage,
  PageWrap,
  assets: {
    localPath: resolve(__dirname, '..', '..', 'dist', 'public'),
    publicPath: '/public/',
    entrypoints
  },
  auth: {
    method: AuthMethod.Basic,
    username: 'guest',
    password: 'password',
    roles: [],
    sessionsSecret: 'my-secret'
  }
  env: 'production',
  graphQL: {
    schema: graphQLSchema
  },
  httpd: {
    host: '0.0.0.0',
    port: 8080,
  },
  logger: {
    level: 'info'
  },
  isReady,
  mode: 'server',
  name: 'my-app'
  pageLoader,
  privacy: false,
  ssrOnly: false
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
