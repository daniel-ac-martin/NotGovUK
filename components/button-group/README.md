NotGovUK - Button Group
=======================

A component for grouping buttons and links on a single line.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/button-group
```

Then use it in your code as follows:

```js
import React, { createElement as h } from 'react';
import ButtonGroup from '@not-govuk/button-group';

export const MyComponent = props => (
  <ButtonGroup>
    <Button>Save and continue</Button>
    <Button classModifiers="secondary">Save as draft</Button>
    <A href="#">Cancel</A>
  </ButtonGroup>
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
