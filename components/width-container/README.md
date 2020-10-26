Width Container
===============

A simple container to limit the width of its contents.

This is used by the page components to control the width of the page
contents. Users will not typically need to use this.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/width-container
```

Then use it in your code as follows:

```js
import React, { createElement as h } from 'react';
import WidthContainer from '@not-govuk/width-container';

const myMaxWidthInPixels = 300;

export const MyComponent = props => (
  <WidthContainer maxWidth={myMaxWidthInPixels}>
    My contents
  </WidthContainer>
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
