NotGovUK - Button
=================

A component to allow users to carry out an action.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/button
```

Then use it in your code as follows:

```js
import React, { createElement as h } from 'react';
import Button from '@not-govuk/button';

export const MyComponent = props => (
  <Button>Save and continue</Button>
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
