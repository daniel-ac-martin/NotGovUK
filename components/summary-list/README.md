NotGovUK - Summary List
=======================

A component to summarise information, for example, a user’s responses at the end of a form.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/summary-list
```

Then use it in your code as follows:

```js
import React, { createElement as h } from 'react';
import SummaryList from '@not-govuk/summary-list';

export const MyComponent = props => (
  <SummaryList
    items={[
      {
        name: 'Name',
        actions: [ { href: '#', children: (<Fragment>Change<VisuallyHidden> name</VisuallyHidden></Fragment>) } ],
        children: 'Sarah Philips'
      },
      {
        name: 'Date of birth',
        actions: [ { href: '#', children: (<Fragment>Change<VisuallyHidden> date of birth</VisuallyHidden></Fragment>) } ],
        children: '5 January 1978'
      },
      {
        name: 'Address',
        actions: [ { href: '#', children: (<Fragment>Change<VisuallyHidden> address</VisuallyHidden></Fragment>) } ],
        children: (<Fragment>72 Guild Street<br />London<br />SE23 6FH</Fragment>)
      },
      {
        name: 'Contact details',
        actions: [ { href: '#', children: (<Fragment>Change<VisuallyHidden> contact details</VisuallyHidden></Fragment>) } ],
        children: (<Fragment><p class="govuk-body">07700 900457</p><p class="govuk-body">sarah.phillips@example.com</p></Fragment>)
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
