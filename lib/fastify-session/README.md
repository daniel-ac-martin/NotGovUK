NotGovUK - Fastify Session
==========================

Fastify plugin to provide a session in `req.session`. Supports a few modes of
operation:
1. Custom (hook up to Redis or similar)
2. In-memory (for testing)
3. Encrypted cookies (data must be kept small)


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/fastify-session
```

Then use it in your code as follows:

```js
import Fastify from 'fastify';
import { SessionStore, fastifySession } from '@not-govuk/fastify-session';

const httpd = Fastify();

httpd.register(fastifySession, {
  store: SessionStore.Custom,
  read: (id) => {
    const data = PULL_FROM_STORE(id); // Replace this with something that will pull data out of a store based on the `id`.
    return data;
  },
  write: (id, data) => {
    // Add code to write the session `data` based on the `id`.
  },
  cookies: {
    secret: 'changeme' // Change this to a secret string that is shared across instances of your application
  }
});

httpd.get('/', async (req, reply) => {
  const count = (req.session.count || 0) + 1;

  req.session.count = count;

  return count;
});

await httpd.listen({
  host: '::'
  port: 8080
});
```


### `fastifySession`

A Fastify plugin which can be 'registered' with the following options.

Options object:

- **`store: 'cookies' | 'custom' | 'memory'`**
  Default: 'cookies'

  The data store to use for the session. `'cookies'` provides a very small
  session in an encrypted cookie. (Data size is severely limited.) `'memory'`
  stores data in the memory of the instance which works as long as you don't
  have multiple instances and don't restart the application. `'custom'` can be
  used to provide bespoke read and write functions to pull and push data from a
  data store of your choice, such as a database.
- **`read: function(id: string): object | Promise<object>`**
  When using a `'custom'` store, this function must be provided to return the
  session data for the provided session id.
- **`write: function(id: string, data: object): void | Promise<void>`**
  When using a `'custom'` store, this function must be provided to write the
  provided session data according to the provided id.
- **`cookies: object`**
  See: https://www.npmjs.com/package/@not-govuk/fastify-consent-cookies

  Make sure that you at least provide a secret.
  - **`secret: string`**
    A secret that is used to encrypt your cookies. You should ensure that
    you set this in production to ensure that they cannot be decrypted by
    an attacker. If you horizontally scale your application, you must
    ensure that the secret is shared between each instance, so that they
    can decrypt cookies that were set by other instances.


### `req.session: object`

An object representing the session data for the particular request. When you
write to this object, it will be persisted in the session and so will also be
available on the next request that the user makes.


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
