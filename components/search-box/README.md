NotGovUK - Search Box
=====================

A single-line, form field for searching, with submit button.

(Heavily inspired by the [Search component] in the [GOV.UK Component Guide].)

Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/search-box
```

Then use it in your code as follows:

```js
import React, { createElement as h } from 'react';
import SearchBox from '@not-govuk/search-box';

export const MyComponent = props => (
  <form method="get" action="https://www.google.co.uk/search">
    <SearchBox name="q" label="Search Google" width={15} />
  </form>
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

[Search component]: https://components.publishing.service.gov.uk/component-guide/search
[GOV.UK Component Guide]: https://components.publishing.service.gov.uk/component-guide
