NotGovUK - Task List
====================

A component to show all the tasks a user needs to do, and allow them to easily identify which ones are done and which they still need to do.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/task-list
```

Then use it in your code as follows:

```js
import React, { createElement as h } from 'react';
import Tag from '@not-govuk/tag';
import TaskList from '@not-govuk/task-list';

export const MyComponent = props => (
  <TaskList
    items={[
      {
        title: 'Company Directors',
        href: '/company-directors',
        status: 'Completed'
      },
      {
        title: 'Financial history',
        href: '/financial-history',
        hint: 'Include 5 years of the company’s relevant financial information',
        status: (<Tag classModifiers="blue">Incomplete</Tag>)
      },
      {
        title: 'Payment',
        status: 'Cannot start yet',
        statusClassModifiers: 'cannot-start-yet'
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
