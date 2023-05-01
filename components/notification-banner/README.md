NotGovUK - Notification Banner
==============================

A component to tell the user about something they need to know about, but that’s not directly related to the page content.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/notification-banner
```

Then use it in your code as follows:

```js
import React, { createElement as h } from 'react';
import NotificationBanner from '@not-govuk/notification-banner';

export const MyComponent = props => (
  <NotificationBanner>
    <p class="govuk-notification-banner__heading">
      You have 7 days left to send your application.
      <a class="govuk-notification-banner__link" href="#">View application</a>.
    </p>
  </NotificationBanner>
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
