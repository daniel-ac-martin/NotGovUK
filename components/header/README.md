Header
======

The [GDS Header component] that shows users whether they are on GOV.UK
and which service they are using.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/header
```

Then use it in your code as follows:

```js
import React, { createElement as h } from 'react';
import Header from '@not-govuk/header';

export const MyComponent = props => (
  <Header
    govUK
    navigation={[
      {
        href: "#1",
        text: "Navigation item 1",
        active: true,
      },
      {
        href: "#2",
        text: "Navigation item 2",
      },
      {
        href: "#3",
        text: "Navigation item 3",
      },
      {
        href: "#4",
        text: "Navigation item 4",
      },
    ]}
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


[GDS Header component]: https://design-system.service.gov.uk/components/header/
