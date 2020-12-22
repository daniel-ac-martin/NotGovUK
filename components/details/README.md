NotGovUK - Details
==================

The [GDS Details component].

Make a page easier to scan by letting users reveal more detailed information only if they need it.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/details
```

Then use it in your code as follows:

```js
import React, { createElement as h } from 'react';
import Details from '@not-govuk/details';

export const MyComponent = props => (
  <Details summary="Help with nationality">
    We need to know your nationality so we can work out which elections you’re entitled to vote in. If you cannot provide your nationality, you’ll have to send copies of identity documents through the post.
  </Details>
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


[GDS Details component]: https://design-system.service.gov.uk/components/details/
