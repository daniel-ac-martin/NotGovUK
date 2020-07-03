Not Govuk - My Component
===

A component just for testing.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/my-component
```

Then use it in your code as follows:

```js
import React, { createElement as h } from 'react';
import MyComponent from '@not-govuk/my-component';

export const MyComponent = props => (
  <MyComponent />
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
