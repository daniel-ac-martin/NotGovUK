NotGovUK - Skip Link
====================

The [GDS Skip link component].

A component to help keyboard-only users skip to the main content on a page.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/skip-link
```

Then use it in your code as follows:

```js
import React, { createElement as h } from 'react';
import SkipLink from '@not-govuk/skip-link';

export const MyComponent = props => (
  <SkipLink for="main-content" />
);

export default MyComponent;
```


Working on this package
-----------------------

Before working on this package you must install its dependencies using
the following command:

```shell
pnpm install
```


### Testing

```shell
npm test
```


### Building

```shell
npm run build
```


### Clean-up

```shell
npm run clean
```


[GDS Skip link component]: https://design-system.service.gov.uk/components/skip-link/
