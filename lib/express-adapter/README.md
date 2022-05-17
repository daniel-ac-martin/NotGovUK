NotGovUK - Express-Adapter
==========================

Adapts to Express middleware to run on Restify.

This is probably far from perfect, but it works sufficiently for my purposes.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/express-adapter
```

Then use it in your code as follows:

```js
import { adapt } from '@not-govuk/express-adapter';
import { someExpressMiddleware } from '@someone/something;
import { restifyServer } from './my-server.js';

const restifyMiddleware = adapt(someExpressMiddleware);

restifyServer.use(restifyMiddleware);

[...]
```


Working on this package
-----------------------

Before working on this package you must install its dependencies using
the following command:

```shell
pnpm install
```


### Building

Build the package by compiling the source code.

```shell
npm run build
```


### Clean-up

Remove any previously built files.

```shell
npm run clean
```
