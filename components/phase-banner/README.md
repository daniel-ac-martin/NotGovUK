NotGovUK - Phase Banner
=======================

The [GDS Phase banner component].

Use the phase banner component to show users your service is still being worked on.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/phase-banner
```

Then use it in your code as follows:

```js
import React, { createElement as h } from 'react';
import PhaseBanner from '@not-govuk/phase-banner';

export const MyComponent = props => (
  <PhaseBanner phase="alpha">This is a new service – your <a href="#">feedback</a> will help us to improve it.</PhaseBanner>
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


[GDS Phase banner component]: https://design-system.service.gov.uk/components/phase-banner/
