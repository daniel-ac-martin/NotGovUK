NotGovUK - Fastify Harden
=========================

Fastify plugin for extra cyber-security hardening.

This adds extra HTTP headers to tell the browser to run in a stricter fashion in
order to prevent a variety of exploits. It also censors error messages on any
_Internal Server Errors_ that occur in production (they can still be found in
the logs.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/fastify-harden
```

Then use it in your code as follows:

```js
import Fastify from 'fastify';
import fastifyHarden from '@not-govuk/fastify-harden';

const httpd = Fastify({});

await httpd.register(fastifyHarden, {
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
