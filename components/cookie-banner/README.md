NotGovUK - Cookie Banner
========================

A component to allow users to accept or reject cookies which are not essential to making your service work.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/cookie-banner
```

Then use it in your code as follows:

```js
import React, { createElement as h } from 'react';
import CookieBanner from '@not-govuk/cookie-banner';

export const MyComponent = props => (
  <CookieBanner
    aria-label="Cookies on [name of service]"
    messages={[
      {
        heading: 'Cookies on [name of service]',
        content: (
          <Fragment>
            <p className="govuk-body">We use some essential cookies to make this service work.</p>
            <p className="govuk-body">We’d also like to use analytics cookies so we can understand how you use the service and make improvements.</p>
          </Fragment>
        ),
        actions: (
          <Fragment>
            <Button value="accept" name="cookies">
              Accept analytics cookies
            </Button>
            <Button value="reject" name="cookies">
              Reject analytics cookies
            </Button>
            <A href="#">View cookies</A>
          </Fragment>
        )
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
