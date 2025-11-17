NotGovUK - Vite HTML React
==========================

A [Vite] plugin for importing HTML files as [React] components.


Using this package
------------------

First install the package into your project:

```shell
npm install -D @not-govuk/vite-html-react
```

Then use it in your `vite.config.js` as follows:

```js
import { defineConfig } from 'vite';
import html from '@not-govuk/vite-html-react';

export default defineConfig({
  plugins: [
    html({
      extensions: ['.htm']
    }),
    [...]
  ],
  [...]
});

[...]
```

You can then import HTML files in the form of a React component:

```jsx
import Html from './path/to/content.htm';

const Component = () => (
  <Html />
);
```

Typically, the HTML file would only contain a portion of your HTML, rather than a full page.

**Note:**: Vite doesn't allow for `.html` files to be used; by default we us `.htm` instead.


Working on this package
-----------------------

Before working on this package you must install its dependencies using
the following command:

```shell
pnpm install
```


### Building

Build the package by compiling the source code.

```shell
npm run build
```


### Clean-up

Remove any previously built files.

```shell
npm run clean
```


[Vite]: https://vite.dev/
[React]: https://react.dev/
