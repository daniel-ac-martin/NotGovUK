NotGovUK - Anchor List
======================

A list of anchors. Items that contain links to the current page are
marked as active. Useful for navigation menus.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/anchor-list
```

Then use it in your code as follows:

```js
import React, { createElement as h } from 'react';
import AnchorList from '@not-govuk/anchor-list';

export const MyComponent = props => (
  <AnchorList items={[
    { href: '/', text: 'Inactive 1' },
    { href: '#main-content', text: 'Active' },
    { href: '/#main-content', text: 'Inactive 2' }
  ]} />
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
