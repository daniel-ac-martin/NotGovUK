NotGovUK - Navigation Menu
==========================

A component that provides users with a list of pages to choose from.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/navigation-menu
```

Then use it in your code as follows:

```js
import React, { createElement as h } from 'react';
import NavigationMenu from '@not-govuk/navigation-menu';

export const MyComponent = props => (
  <NavigationMenu items={[
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
