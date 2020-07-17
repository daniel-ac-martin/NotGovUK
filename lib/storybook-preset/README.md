NotGovUK - Storybook Preset
===========================

A Storybook preset that renders components similarly to our apps.


Using this package
------------------

First install the package into your project:

```shell
npm install -D @not-govuk/storybook-preset
```

Then use it in your `.storybook/main.js` as follows:

```js
'use strict';

module.exports = {
  stories: [ '../../../components/*/spec/*.stories.mdx' ],
  addons: [
    {
      name: '@not-govuk/storybook-preset',
      options: {
        baseDir: __dirname,
        tsConfig: '../../../tsconfig.json'
      }
    }
  ]
};
```


Working on this package
-----------------------

Before working on this package you must install its dependencies using
the following command:

```shell
pnpm install
```
