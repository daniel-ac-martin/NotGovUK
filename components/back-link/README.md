Back link
=========

The [GDS Back link component].


Preview
-------

![Preview][Preview]


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/back-link
```

Then use it in your code as follows:

```js
import React, { createElement as h } from 'react';
import BackLink from '@not-govuk/back-link';

export const BackLink = props => (
  <BackLink />
);

export default BackLink;
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


[GDS Back link component]: https://design-system.service.gov.uk/components/back-link/
[Preview]: ../../__image_snapshots__/storyshots-itest-ts-image-storyshots-components-back-link-text-1-snap.png
