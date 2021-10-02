NotGovUK - Textarea
===================

A component to allow users to enter multiple lines of text.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/textarea
```

Then use it in your code as follows:

```js
import React, { createElement as h } from 'react';
import Textarea from '@not-govuk/textarea';

export const MyComponent = props => (
  <Textarea
    hint="Do not include personal or financial information, like your National Insurance number or credit card details."
    label={<h1 className="govuk-heading-l">Can you provide more detail?</h1>}
    name="more-detail"
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
