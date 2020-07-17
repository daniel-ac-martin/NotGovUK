Not Govuk - Webpack Config
==========================

Webpack config for NotGovUK applications.


Using this package
------------------

First install the package into your project:

```shell
npm install -D @not-govuk/webpack-config
```

Then use it in your `webpack.config.js` as follows:

```js
const generateConfig = require('@not-govuk/webpack-config');

const webpackConfig = generateConfig({
  baseDir: __dirname,
  entry: './src/client/index.ts',
  outDir: './dist/public',
  production: process.env.NODE_ENV !== 'development',
  tsConfig: 'tsconfig.json'
});

module.exports = webpackConfig;
```


Working on this package
-----------------------

Before working on this package you must install its dependencies using
the following command:

```shell
pnpm install
```

Currently all testing is manual.
