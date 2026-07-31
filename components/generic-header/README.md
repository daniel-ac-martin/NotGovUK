Generic header
==============

The [Generic header component] tells users they're using a government service
that's not part of the GOV.UK website.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/generic-header
```

Then use it in your code as follows:

```js
import React, { createElement as h } from 'react';
import GenericHeader from '@not-govuk/generic-header';

export const MyComponent = props => (
  <GenericHeader
    organisationHref="#"
    serviceName="Service name"
    serviceHref="#"
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


[Generic header component]: https://design-system.service.gov.uk/components/generic-header/
