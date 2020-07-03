NotGovUk - Simple Table
=======================

A simple table for displaying data.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/simple-table
```

Then use it in your code as follows:

```js
import React, { createElement as h } from 'react';
import SimpleTable from '@not-govuk/simple-table';

export const MyComponent = props => (
  <SimpleTable
    keys={['name', 'qty', 'cost']}
    headings={{
      cost: 'Price',
      qty: 'Quantity',
      name: 'Name'
    }}
    data={[
      {
        cost: '£7.99',
        qty: '4',
        name: 'Blu-ray disk'
      },
      {
        cost: '£0.85',
        qty: '10',
        name: 'Pencil'
      },
      {
        cost: '£21.45',
        qty: '1',
        name: 'Text book'
      },
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
