NotGovUK - Label
================

A label for a form field.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/label
```

Then use it in your code as follows:

```js
import React, { createElement as h } from 'react';
import Label from '@not-govuk/label';

export const MyComponent = props => (
  <Label htmlFor="my-field">My label</Label>
  <input type="text" id="my-field" name="my-field" />
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
