Table
=====

The [GDS Table component].


Preview
-------

![Preview][Preview]


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/table
```

Then use it in your code as follows:

```js
import React, { createElement as h } from 'react';
import Table from '@not-govuk/table';

export const MyComponent = props => (
  <Table
    keys={['date', 'amount']}
    headings={{
      amount: 'Amount',
      date: 'Date'
    }}
    data={[
      {
        amount: '£109.80 per week',
        date: 'First 6 weeks'
      },
      {
        amount: '£109.80 per week',
        date: 'Next 33 weeks'
      },
      {
        amount: '£4,282.20',
        date: 'Total estimated pay'
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


[GDS Table component]: https://design-system.service.gov.uk/components/table/
[Preview]: ../../__image_snapshots__/storyshots-itest-ts-image-storyshots-components-table-text-1-snap.png
