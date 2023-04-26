NotGovUK - Error Summary
========================

A component to summarise any errors a user has made.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/error-summary
```

Then use it in your code as follows:

```js
import React, { createElement as h } from 'react';
import ErrorSummary from '@not-govuk/error-summary';

export const MyComponent = props => (
  <ErrorSummary
    title="There is a problem"
    items={[
      {
        text: "The date your passport was issued must be in the past",
        href: "#"
      },
      {
        text: "Enter a postcode, like AA1 1AA",
        href: "#"
      }
    ]}
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
