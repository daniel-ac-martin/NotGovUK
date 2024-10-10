NotGovUK - Head
===============

A React component for altering the contents of the HTML head tag, that works across multiple frameworks.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/head
```

Then use it in your code as follows:

```js
import React, { createElement as h } from 'react';
import Head from '@not-govuk/head';

export const MyComponent = props => (
  <Head>
    <title>My new title</title>
  </Head>
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


### Building

Build the package by compiling the source code.

```shell
npm run build
```


### Clean-up

Remove any previously built files.

```shell
npm run clean
```
