Not Govuk - Form
================

A component to collect information from the user.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/form
```

Then use it in your code as follows:

```js
import React, { createElement as h } from 'react';
import Form from '@not-govuk/form';

export const MyComponent = props => (
  <Form action="/result" method="get">
    <Form.TextInput
      name="fullName"
      label={<h2>What is your name?</h2>}
      hint="Write your firstname followed by your surname"
      validators={[
        required()
      ]}
    />
    <Form.Radios
      name="sex"
      label={<h2>Sex?</h2>}
      options={[
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'no', label: 'No thanks, we\'re British' }
      ]}
      validators={[
        required('Provide your sex')
      ]}
    />
    <Form.DateInput
      name="dob"
      prettyName="date of birth"
      label={<h2>What is your date of birth?</h2>}
      validators={[
        required('Provide your date of birth'),
        past(),
        after('1900-01-01')()
      ]}
    />
    <Form.Radios
      name="married"
      label={<h2>Are you married?</h2>}
      options={[
        { value: 'Y', label: 'Yes' },
        { value: 'N', label: 'No' }
      ]}
      validators={[
        required('Provide your marital status')
      ]}
    />
    <Form.Submit value="Submit" />
  </Form>
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
