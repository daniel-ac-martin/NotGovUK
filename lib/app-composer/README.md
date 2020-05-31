Not Govuk - App Composer
========================

Composes isomorphic React applications from a set of components.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/app-composer
```

Then use it in your client-side code as follows:

```js
import { compose } from '@not-govuk/app-composer';

const MyApp = compose({
  AppWrap,
  ErrorPage,
  LoadingPage,
  PageWrap,
  pageLoader,
  browserRouterProps
});
```

And/or in your server-side code as follows:

```js
import { compose } from '@not-govuk/app-composer';

const MyApp = compose({
  AppWrap,
  ErrorPage,
  PageWrap,
  staticRouterProps
});
```

Working on this package
-----------------------

Before working on this package you must install its dependencies using
the following command:

```shell
pnpm install
```


### Building

```shell
npm run build
```


### Clean-up

```shell
npm run clean
```
