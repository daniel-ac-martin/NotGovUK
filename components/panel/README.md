Panel
=====

A visible container used on confirmation or results pages to highlight important content.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/panel
```

Then use it in your code as follows:

```js
import React, { createElement as h } from 'react';
import Panel from '@not-govuk/panel';

export const MyComponent = props => (
  <Panel
    classModifiers="confirmation"
    title="Application complete"
  >
    Your reference number<br />
    <strong>HDJ2123F</strong>
  </Panel>
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
