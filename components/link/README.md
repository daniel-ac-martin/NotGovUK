NotGovUK - Link
================

A drop-in replacement for the 'a' element with GovUK styling.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/link
```

Then use it in your code as follows:

```js
import React, { createElement as h } from 'react';
import { A } from '@not-govuk/link';

export const MyComponent = props => (
  <A href="#">My link</A>
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
