Warning Text
============

A component to warn the user of something important.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/warning-text
```

Then use it in your code as follows:

```js
import React, { createElement as h } from 'react';
import WarningText from '@not-govuk/warning-text';

export const MyComponent = props => (
  <WarningText>
    You can be fined up to £5,000 if you do not register.
  </WarningText>
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
