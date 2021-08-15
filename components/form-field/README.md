NotGovUK - Form Field
=====================

A component for collecting a piece of data from the user.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/form-field
```

Then use it in your code as follows:

```js
import React, { createElement as h } from 'react';
import FormField from '@not-govuk/form-field';

export const MyComponent = props => (
  <FormField
    name="name"
    label={<h1 className="govuk-heading-l">What is the name of the event?</h1>}
    hint="The name you’ll use on promotional material."
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
