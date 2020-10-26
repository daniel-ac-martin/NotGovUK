Footer
======

The [GDS Footer Component]; a page footer providing copyright, licensing
and other information about your service and department.

This has been adapted to also support _not_ including the standard GOV.UK
notices; making this also suitable for non-GOV.UK services.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/footer
```

Then use it in your code as follows:

```js
import React, { createElement as h } from 'react';
import Footer from '@not-govuk/footer';

export const MyComponent = props => (
  <Footer govUK />
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

[GDS Footer component]: https://design-system.service.gov.uk/components/footer
