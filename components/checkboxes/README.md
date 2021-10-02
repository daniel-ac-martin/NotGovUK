NotGovUK - Checkboxes
=====================

A component to allow users to select one or more options.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/checkboxes
```

Then use it in your code as follows:

```js
import React, { createElement as h } from 'react';
import Checkboxes from '@not-govuk/checkboxes';

export const MyComponent = props => (
  <Checkboxes
    label={<h1 className="govuk-heading-l">Which types of waste do you transport?</h1>}
    name="waste"
    options={[
      { value: 'carcasses', label: 'Waste from animal carcasses' },
      { value: 'mines', label: 'Waste from mines or quarries' },
      { value: 'farm', label: 'Farm or agricultural waste' }
    ]}
    hint="Select all that apply."
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
