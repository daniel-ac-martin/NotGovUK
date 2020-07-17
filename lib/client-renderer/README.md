Not Govuk - Client Renderer
===========================

A client-side renderer of React applications served via the server-renderer.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/client-renderer
```

Then use it in your code as follows:

```js
import { hydrateOrRender } from '@not-govuk/client-renderer';
import { AppWrap } from '../common/app-wrap';
import { PageWrap } from '../common/page-wrap';
import { ErrorPage } from '../common/error-page';
import { LoadingPage } from '../common/loading-page';
import { pageLoader } from '../common/page-loader';

hydrateOrRender(AppWrap, PageWrap, ErrorPage, LoadingPage, pageLoader);
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
