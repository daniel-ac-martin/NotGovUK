NotGovUK - Fastify-Auth
=======================

Authentication plugin for Fastify. Allows you to authenticate uses by a variety
of methods and obtain identity information and roles for use on each request.
Also provides a session when requested or when required by the authentication
method.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/fastify-auth
```

Then use it in your code as follows:

```ts
import Fastify from 'fastify';
import { AuthMethod, fastifyAuth } from '@not-govuk/fastify-auth';

const httpd = Fastify();

httpd.register(fastifyAuth, {
  privacy: false,
  session: {
    cookies: {
      secret: 'changeme' // Change this to a secret string that is shared across instances of your application
    }
  },
  method: AuthMethod.OIDC,
  issuer: 'https://keycloak/realms/my-realm/', // Change this to the URL for your OIDC provider
  clientId: 'my-client',                       // Change this to your client ID
  clientSecret: 'my-client-secret',            // Change this to your client secret
  redirectUri: 'https://my-website/'           // Change this to the base URL that the OIDC provider should redirect back to
});

httpd.get('/', async (req, _reply) => {
  const user = req.user.username || 'guest';
  const message = `Hello ${user}`;

  return message;
});

await httpd.listen({
  host: '::'
  port: 8080
});
```


### `fastifyAuth`

A Fastify plugin which can be 'registered' with the following options.

Options object:

- **`method: 'none' | 'dummy' | 'headers' | 'basic' | 'oidc'`**
  The method to use to authenticate users.
  - `'none'`: No authentication (you might want this if you just want a
              session).
  - `'dummy'`: Dummy authentication; useful for testing.
  - `'headers'`: Trusts auth information provided on HTTP headers (such as by a
                 reverse proxy). **WARNING:** This is insecure when not behind a
                 reverse authentication proxy.
  - `'basic'`: HTTP [Basic authentication].
  - `'oidc'`: [OpenID Connect]. (Such as [Keycloak] etc.)
- **`privacy: boolean`**
  When `true`, user must be authenticated to access any part of the website.
  When `false`, users can still access the website but may not have access to
  all features when those features require certain roles. Users can typically
  choose to log-in to acquire extra permissions.
- **`session: object`**
  See: https://www.npmjs.com/package/@not-govuk/fastify-session


### `req.user: object`

An object representing the user data. Includes the `username` and `roles`. When
using OIDC, it should also contain the `accessToken` for making requests to
other services on behalf of the user.


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

[Basic authentication]: https://en.wikipedia.org/wiki/Basic_access_authentication
[OpenID Connect]: https://en.wikipedia.org/wiki/OpenID#OpenID_Connect_(OIDC)
[Keycloak]: https://www.keycloak.org/
