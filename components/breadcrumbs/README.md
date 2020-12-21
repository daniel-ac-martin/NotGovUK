NotGovUK - Breadcrumbs
======================

The [GDS Breadcrumbs component].

A component to help users to understand where they are within a website's structure and move between levels.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/breadcrumbs
```

Then use it in your code as follows:

```js
import React, { createElement as h } from 'react';
import Breadcrumbs from '@not-govuk/breadcrumbs';

export const MyComponent = props => (
  <Breadcrumbs
    items={[
      { text: 'Home', href: '#' },
      { text: 'Passports, travel and living abroad', href: '#' },
      { text: 'Travel abroad', href: '#' }
    ]}
  />
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


[GDS Breadcrumbs component]: https://design-system.service.gov.uk/components/breadcrumbs/
