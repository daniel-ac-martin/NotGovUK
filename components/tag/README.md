Tag
===

The [GDS Tag component] for displaying the status of something.


Preview
-------

![Preview][Preview]


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/tag
```

Then use it in your code as follows:

```js
import React, { createElement as h } from 'react';
import Tag from '@not-govuk/tag';

export const MyComponent = props => (
  <Tag text="example" />
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


[GDS Tag component]: https://design-system.service.gov.uk/components/tag/
[Preview]: ../../__image_snapshots__/storyshots-itest-ts-image-storyshots-components-tag-text-1-snap.png
