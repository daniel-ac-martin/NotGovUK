Components
==========

Components are reusable parts of the user interface that have been made to support a variety of applications.

Individual components can be used in multiple different patterns and contexts. For example, the text input component can be used to ask for an email address, a National Insurance number or someone’s name.


How to use the components
-------------------------

The components are published in NPM packages, both individually and all altogether. The best way to consume the components depends on the context in which you use them; in an application you should usually import all of the components in one go, but in your own re-usable components you should try to only consume the individual packages that your component needs.


### Using the components in NotGovUK framework applications

If you have initiated a project or prototype using the instructors in [Getting started]. You should import the components from the `@not-govuk/components` package, which you should already have installed.

```jsx
// src/common/pages/your-page.tsx
import { FC, createElement as h } from 'react';
import { PageProps } from '@not-govuk/app-composer';
import { Panel } from '@not-govuk/components';

export title = 'Your title'

const Page: FC<PageProps> = () => {
  return (
    <Panel
      classModifiers="confirmation"
      title="Application complete"
    >
      Your reference number
      <br />
      <strong>HDJ2123F</strong>
    </Panel>
  );
};

export default Page;
```

Alternatively, if you are just building a prototype, you may wish to simply use the supplied HTML code, without the need to worry about importing anything from packages.


### Using the components in re-usable components

If you are publishing your own, individually packaged, re-usable components (as we facilitate in NotGovUK projects) you should import the components from their individual packages rather than the group packages.

```shell
$ npm install @not-govuk/panel
```

(Note: If you are using the framework, you should use `pnpm` in place of `npm`.)

You can then import them into your component.

```jsx
import React, { createElement as h } from 'react';
import Panel from '@not-govuk/panel';

export const MyComponent = props => (
  <Panel
    classModifiers="confirmation"
    title="Application complete"
  >
    Your reference number<br />
    <strong>HDJ2123F</strong>
  </Panel>
);

export default MyComponent;
```


### Using the components in Remix applications

You should import the components from the `@not-govuk/components` package, which you should install with NPM.

```shell
$ npm install @not-govuk/components
```

You can then import the components.

```jsx
import components from '@not-govuk/components';

const Panel = components.Panel;
```

You can also override some global styles by importing `@not-govuk/components` into your SASS. e.g. `app/style.scss`

```scss
@import "@not-govuk/components";
```

You should also alter your `vite.config.js` to modify some of the modules to versions that are designed to work under Remix, and to silence some warnings.

```js
[...]

export default defineConfig({
  // ADD THE FOLLOWING LINES
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        quietDeps: true, // Works around issues with govuk-frontend
        silenceDeprecations: ['import'] // This is required until govuk-frontend moves to using modules
      }
    }
  },
  resolve: {
    alias: {
      '~govuk-frontend': 'govuk-frontend', // Vite doesn't seem to support tilde's but other frameworks require it
      '@not-govuk/head': '@not-govuk/head/dummy',
      '@not-govuk/router': '@not-govuk/router/remix',
    }
  }
  [...]
});
```

You should ensure that you set the `js-enabled` class on an element that encompasses all of your components (such as your `<body` element or the Page component), when and only when client-side JavaScript executes. Otherwise some components will not render correctly.

#### Limitations on Remix

- You will need to manage your own `<head>` including the favicon.
- It's not currently possible to do a named import, as Remix uses Vite, which is stricter than Webpack.

**See:** [Example Remix application using NotGovUK components]

### Using the components in Next.js applications

You should import the components from the `@not-govuk/simple-components` package, which you should install with NPM. You should also install `sass`.

```shell
$ npm install @not-govuk/simple-components sass
```

You can then import the components in your application.

```jsx
import { Panel } from '@not-govuk/simple-components';
```

You should also alter your `next.config.js` to modify some of the modules to versions that are designed to work under Next.js.

```js
import webpack from 'webpack';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // This allows us to handle next-example, the same way we do standard apps, in CI
  distDir: 'dist',
  webpack: (config, _options) => ({
    ...config,
    plugins: [
      ...config.plugins,
      new webpack.NormalModuleReplacementPlugin(/^@not-govuk\/head$/, '@not-govuk\/head\/dummy'),    // ADD THIS LINE
      new webpack.NormalModuleReplacementPlugin(/^@not-govuk\/router$/, '@not-govuk\/router\/next'), // ADD THIS LINE
    ]
  })
};

export default nextConfig;
```

You should ensure that you set the `js-enabled` class on an element that encompasses all of your components (such as your `<body` element or the Page component), when and only when client-side JavaScript executes. Otherwise some components will not render correctly.


#### Pre-requisites on Next.js

Your application will need to make use of Next.js' the newer '_App router_'.


#### Limitations on Next.js

- You will not be able to make use of the [Form] framework, as this does not currently support Next.js.
- You will need to manage your own `<head>` including the favicon.

**See:** [Example Next.js application using NotGovUK components]


[Getting started]: https://not-gov.uk/get-started
[Form]: https://not-gov.uk/components?name=Form
[Example Remix application using NotGovUK components]: https://github.com/daniel-ac-martin/NotGovUK/tree/master/apps/remix-example
[Example Next.js application using NotGovUK components]: https://github.com/daniel-ac-martin/NotGovUK/tree/master/apps/next-example
