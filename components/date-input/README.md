NotGovUK - Date Input
=====================

A component to allow users to enter a date.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/date-input
```

Then use it in your code as follows:

```js
import React, { createElement as h } from 'react';
import DateInput from '@not-govuk/date-input';

export const MyComponent = props => (
  <DateInput
    label={<h1 className="govuk-heading-l">When was your passport issued?</h1>}
    name="passport-issued"
    hint="For example, 12 11 2007"
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
