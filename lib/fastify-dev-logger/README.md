NotGovUK - Fastify Dev Logger
=============================

A Pino transport for pretty printing [Fastify] logs in **dev** environments.
Built on [pino-pretty].

The output looks like this (but with colours):

```
[16:56:26.501]  info      | Server listening at http://[::1]:5173
[16:56:34.020]  info (01) | GET / - incoming request
[16:56:48.565]  info (01) | GET / - request completed; 200 OK (64ms)
```

**Note:** It should be possible to use this in [pino] without Fastify, but we
provide extra features for handling Fastify's (request) objects.


Using this package
------------------

First install the package into your project:

```shell
npm install -D @not-govuk/fastify-dev-logger
```

Then use it in your code as follows:

```js
import fastifyDevLogger from '@not-govuk/fastify-dev-logger';
import Fastify from 'fastify';

const httpd = Fastify({
  logger: {
    transport: {
      target: '@not-govuk/fastify-dev-logger'
    }
  }
});

[...]
```


Working on this package
-----------------------

Before working on this package you must install its dependencies using
the following command:

```shell
pnpm install
```

### Testing

Test the package by running the unit tests.

```shell
npm test
```


[Fastify]: https://fastify.dev/
[pino]: https://getpino.io/
[pino-pretty]: https://www.npmjs.com/package/pino-pretty
