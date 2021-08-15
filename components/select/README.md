NotGovUK - Select
=================

A component to allow users to choose from many options.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/select
```

Then use it in your code as follows:

```js
import React, { createElement as h } from 'react';
import Select from '@not-govuk/select';

export const MyComponent = props => (
  <Select
    label="Sort by"
    name="sort"
    options={[
      { value: 'published', label: 'Recently published' },
      { value: 'updated', label: 'Recently updated', selected: true },
      { value: 'views', label: 'Most views' },
      { value: 'comments', label: 'Most comments' }
    ]}
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

Run the unit tests.

```shell
npm test
```


### Building

Build the package by compiling the TypeScript source code.

```shell
npm run build
```


### Clean-up

Remove any previously built files.

```shell
npm run clean
```
