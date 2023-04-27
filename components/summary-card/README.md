NotGovUK - Summary Card
=======================

A component to split multiple summary lists.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/summary-card
```

Then use it in your code as follows:

```js
import React, { createElement as h } from 'react';
import SummaryCard from '@not-govuk/summary-card';

export const MyComponent = props => (
  <SummaryCard title="Lead tenant">
    Content
  </SummaryCard>
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
