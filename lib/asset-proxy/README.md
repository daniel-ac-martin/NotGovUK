NotGovUK - Asset Proxy
======================

A proxy for serving assets in local-dev environments.

It will serve the assets built by webpack according to your `output.publicPath`,
and proxy all other requests to localhost on the next port to the one it is
listening on.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/asset-proxy
```

Then use it in your code as follows:

```js
const proxy = require('@not-govuk/asset-proxy');

const proxy = assetProxy({
  httpd: {
    host: '0.0.0.0',
    port: 8080
  },
  name: 'my-asset-proxy',
  webpackConfig: require('./webpack.config')
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
