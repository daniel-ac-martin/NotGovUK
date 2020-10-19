Inset Text
==========

A block of text that is inset.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/inset-text
```

Then use it in your code as follows:

```js
import React, { createElement as h } from 'react';
import InsetText from '@not-govuk/inset-text';

export const MyComponent = props => (
  <InsetText>
    It can take up to 8 weeks to register a lasting power of attorney if there are no mistakes in the application.
  </InsetText>
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
