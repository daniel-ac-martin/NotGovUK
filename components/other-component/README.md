Not Govuk - Other Component
===

Another component just for testing.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/other-component
```

Then use it in your code as follows:

```js
import React, { createElement as h } from 'react';
import OtherComponent from '@not-govuk/other-component';

export const MyComponent = props => (
  <OtherComponent
    // WRITEME
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
