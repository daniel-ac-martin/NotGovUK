NotGovUK - Visually Hidden
==========================

Invisible text that can be read by software such as screen-readers.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/visually-hidden
```

Then use it in your code as follows:

```js
import React, { createElement as h } from 'react';
import VisuallyHidden from '@not-govuk/visually-hidden';

export const MyComponent = props => (
  <VisuallyHidden>Error:</VisuallyHidden> Something went wrong
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

Run the unit tests.

```shell
npm test
```


### Building

Build the package by compiling the TypeScript source code.

```shell
npm run build
```


### Clean-up

Remove any previously built files.

```shell
npm run clean
```
