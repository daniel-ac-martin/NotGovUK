NotGovUK - Fastify
==================

A customised Fastify server for running websites.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/fastify
```

Then use it in your code as follows:

```js
import Fastify from '@not-govuk/fastify';

const httpd = Fastify({});

httpd.get('/', async (req, reply) => {
  return {
    message: 'Hello world!'
  };
});

await httpd.listen({ port: 8080 });
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
