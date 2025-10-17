NotGovUK - Fastify-React-Router
===============================

Fastify plugin for React Router.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/fastify-react-router
```

Then use it in your code as follows:

```js
import Fastify from '@not-govuk/fastify';
import fastifyReactRouter from '@not-govuk/fastify-react-router';

const httpd = Fastify({});

await httpd.register(fastifyReactRouter, {
  build: {
    assets: join(import.meta.dirname, 'path', 'to', 'build', 'of', 'client'),
    server: await import('path/to/build/of/server/index.js'),
  }
});

await httpd.listen({ port: 8080 });
```

It is expected that you will have built the referenced files with
`react-router build`.

**Note:**: If you do not provide a build then the plugin will instead execute
`vite-dev-server` in an attempt to generate files it can serve.


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
