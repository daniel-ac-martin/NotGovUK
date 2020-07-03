NotGovUK - Anchor
=================

A drop in replacement for the HTML `<a>` tag that works with [React Router].


Preview
-------

![Preview][Preview]


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/anchor
```

Then use it in your code as follows:

```js
import React, { createElement as h } from 'react';
import { A } from '@not-govuk/anchor';

export const MyComponent = props => (
  <A href="#">My link</A>
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

```shell
npm run build
```


### Clean-up

```shell
npm run clean
```


[React Router]: https://reacttraining.com/react-router/
[Preview]: ../../__image_snapshots__/storyshots-itest-ts-image-storyshots-components-anchor-standard-1-snap.png
