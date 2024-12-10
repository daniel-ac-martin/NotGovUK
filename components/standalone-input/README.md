NotGovUK - Standalone Input
===========================

A single-line, form field with a submit button.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/standalone-input
```

Then use it in your code as follows:

```js
import React, { createElement as h } from 'react';
import StandaloneInput from '@not-govuk/standalone-input';

export const MyComponent = props => (
  <StandaloneInput
    label="Your message"
    name="message"
    button="Send"
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
