NotGovUK - Tabs
===============

A component that lets users navigate between related sections of content, displaying one section at a time.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/tabs
```

Then use it in your code as follows:

```js
import React, { createElement as h } from 'react';
import Tabs from '@not-govuk/tabs';

export const MyComponent = props => (
  <Tabs
    items={[
      {
        id: 'a1',
        label: 'AAA',
        content: (<p>A</p>)
      },
      {
        id: 'b1',
        label: 'BBB',
        content: (<p>B</p>)
      },
      {
        id: 'c1',
        label: 'CCC',
        content: (<p>C</p>)
      }
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
