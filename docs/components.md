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
// src/app/routes/your-page.tsx
import type { Route } from "./+types/your-page";
import { Panel } from '@not-govuk/components';
import { siteTitle } from '../config';

export const title = 'Your page';
const description = 'This is the description of your page';

export function meta({}: Route.MetaArgs) {
  return [
    { title: `${title} - ${siteTitle}` },
    { name: 'description', content: description },
    { name: 'og:title', content: title },
    { name: 'og:description', content: description },
    { name: 'og:article:section', content: title },
  ];
}

export default function YourPage() {
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
}
```

Alternatively, if you are just building a prototype, you may wish to simply use the supplied HTML code, without the need to worry about importing anything from packages.

**Note:** Recent versions of the NotGovUK framework uses [react-foundry] which is just the [React Router] framework with some customisations, including a server based on [Fastify].


### Using the components in other components

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


### Using the components in React Router Framework applications

If you are starting a brand new application, we recommend using our [GitHub template for a React Router framework application with NotGovUK components] but full details are below.

You should import the components from the `@not-govuk/components` package, which you should install with NPM.

```shell
$ npm install @not-govuk/components
```

You can then import the components.

```jsx
import { Panel } from '@not-govuk/components';
```

You can also override some global styles by importing `@not-govuk/components` into your SASS. e.g. `app/style.scss`

```scss
@import "@not-govuk/components";
```

You should also alter your `vite.config.js` to modify some of the modules to versions that are designed to work under React Router, and to silence some warnings.

```js
[...]

export default defineConfig({
  // ADD THE FOLLOWING LINES
  css: {
    lightningcss: {
      errorRecovery: true // Required until govuk-frontend removes the '@media zero' hack
    },
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },
  resolve: {
    alias: {
      '@not-govuk/sass-base': '@not-govuk/sass-base/vite' // Vite resolves url() differently from Turbopack
    }
  },
  ssr: {
    noExternal: [
      /^@not-govuk/,
      /^@react-foundry/
    ]
  }
  [...]
});
```

You should ensure that you set the `govuk-frontend-supported` class on an element that encompasses all of your components (such as your `<body>` element), when and only when client-side JavaScript executes. Otherwise some components will not render correctly. If you make use of the `Page` component, this will be done for you.

**See:** [Example React Router application using NotGovUK components]


### Using the components in Next.js applications

If you are starting a brand new application, we recommend using our [GitHub template for a Next.js application with NotGovUK components] but full details are below.

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
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      '@react-foundry/router': '@react-foundry/router/next', // ADD THIS LINE
    }
  }
};

export default nextConfig;
```

(Note that Turbopack should be used rather than Webpack.)

You should ensure that you set the `govuk-frontend-supported` class on an element that encompasses all of your components (such as your `<body>` element), when and only when client-side JavaScript executes. Otherwise some components will not render correctly. If you make use of the `Page` component, this will be done for you.


#### Pre-requisites on Next.js

Your application will need to make use of Next.js' the newer '_App router_'.


#### Limitations on Next.js

- You will not be able to make use of the [Form] framework, as this does not currently support Next.js.

**See:** [Example Next.js application using NotGovUK components]


[Getting started]: https://not-gov.uk/get-started
[react-foundry]: https://github.com/daniel-ac-martin/react-foundry/
[React Router]: https://reactrouter.com/
[Fastify]: https://fastify.dev/
[Form]: https://not-gov.uk/components?name=Form
[GitHub template for a React Router framework application with NotGovUK components]: https://github.com/daniel-ac-martin/NotGovUK-template-react-router
[GitHub template for a Next.js application with NotGovUK components]: https://github.com/daniel-ac-martin/NotGovUK-template-next
[Example React Router application using NotGovUK components]: https://github.com/daniel-ac-martin/NotGovUK-template-react-router
[Example Next.js application using NotGovUK components]: https://github.com/daniel-ac-martin/NotGovUK-template-next
