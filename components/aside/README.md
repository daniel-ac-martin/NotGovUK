NotGovUK - Aside
================

A component for displaying indirectly related content.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/aside
```

Then use it in your code as follows:

```js
import React, { createElement as h } from 'react';
import Aside from '@not-govuk/aside';

export const MyComponent = props => (
  <Aside>
    <h2>Did you know?</h2>
    <p>You can put indirectly related content in an Aside component.</p>
  </Aside>
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

```shell
npm test
```


### Building

```shell
npm run build
```


### Clean-up

```shell
npm run clean
```
