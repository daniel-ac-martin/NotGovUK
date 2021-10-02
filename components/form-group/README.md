NotGovUK - Form Group
=====================

A group of form fields.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/form-group
```

Then use it in your code as follows:

```js
import React, { createElement as h } from 'react';
import FormGroup from '@not-govuk/form-group';

export const MyComponent = props => (
  <FormGroup
    hint="Enter your date of birth"
    id="dob"
    label="Birthday"
  >
    Content
  </FormGroup>
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
