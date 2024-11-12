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
import { Panel } from '@not-govuk/components';
```


### Using the components in Next.js applications

You should import the components from the `@not-govuk/simple-components` package, which you should install with NPM.

```shell
$ npm install @not-govuk/simple-components
```

You can then import the components.

```jsx
import { Panel } from '@not-govuk/simple-components';
```

Note that, you will not be able to make use of the [Form] framework, as this does not currently support Next.js.


[Getting started]: https://not-gov.uk/get-started
[Form]: https://not-gov.uk/components?name=Form
