NotGovUK - Consent-Cookies
==========================

Connect middleware to parse and set cookies only with user consent. This
aids compliance with European regulations.

Also provides a session via a cookie. (Accessible by reading and writing
to `req.session`.)

Tested on Restify but should work on other Connect-like systems such as
Express.

Features
--------

- Essential cookies
- Optional cookies with opt-in system
- Sessions
- Encryption (except when `httpOnly` is set to false)
- Secure by default


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/consent-cookies
```

Then use it in your code as follows:

```js
const restify = require('restify');
const consentCookies = require('@not-govuk/consent-cookies');

const myCookies = [
  {
    name: 'ga',
    description: 'Enables us to track you use of the site and helps us to optimise your experience.',
    group: 'Analytics',
    httpOnly: false
  },
  {
    name: 'seen,
    description: 'Allows us to know whether you have visited the site before.',
    group: 'Analytics'
  }
];

const httpd = restify.createServer();

httpd.use(consentCookies({ cookies: myCookies, secret: 'my-encryption-secret' }));

httpd.get('/', (req, res, next) => {
  const seen = req.cookies['seen'] || false;
  const message = (
    seen
      ? 'Hello!'
      : 'Welcome back.'
  );

  res.setCookie('seen', true);
  res.send(`<html><body>${seen}</body></html>`);
  next();
});

httpd.listen(8080, '0.0.0.0', () => {
  httpd.log.info('%s listening at %s', httpd.name, httpd.url);
});
```

Subsequent middlewares will be able to discover the cookies available for
use via `req.cookiesMeta` as well as the current cookies of enabled
cookies via `req.cookies`. New cookies can be set with `res.setCookie()`.


### `consentCookies(options: object)`

Provides a middleware that can be given to `httpd.use()`.

Options object:

- **`cookies: object`**
  A description of all the cookies your application uses. Only cookies
  described here will be available for reading and writing.
  - **`name: string`**
    The name of the cookie.
  - **`description: string`**
    A description of the cookies purpose. (To be shown to the user.)
  - **`group?: string`**
    The category that an optional cookie belongs to. e.g. 'Analytics'. If
    the cookie is mandatory, do not define this and the cookie will
    always be available.
  - **`httpOnly?: boolean = true`**
    Whether the cookie can be accessed on the client. Unlike other cookie
    options, this _must_ be defined here and cannot be provided later,
    when setting the cookie. This is because consent-cookies will encrypt
    all httpOnly cookies as a security precaution and so needs to know
    whether to decrypt them when reading them.
  - **Other `cookie.serialize()` options besides `encode`**
    See: https://www.npmjs.com/package/cookie
- **`secret: string`**
  A secret that is used to encrypt your cookies. You should ensure that
  you set this in production to ensure that they cannot be decrypted by
  an attacker. If you horizontally scale your application, you must
  ensure that the secret is shared between each instance, so that they
  can decrypt cookies that were set by other instances.
- **`provideSession?: boolean = true`**
  Whether to provide a session at `req.session`. Set this to `false` if
  you do not require a session or if you wish to provide a session using
  a different middleware.
- **`cookie.serialize()` options besides `encode` and `httpOnly`**
  These will become the defaults within your application. Note that we
  set some sensible defaults for your with a 'secure by default' mindset,
  so you should only need to provide these options in order to loosen up
  the security.
  See: https://www.npmjs.com/package/cookie


### `res.setCookie(name: string, value: any[, options: object])`

Sets a cookie.

- **`name: string`**
  The name of the cookie you wish to set.
  **Note:** If this cookie has not been consented to and is not
  mandatory, an exception will be thrown.
- **`value: any`**
  The value you wish to set for the cookie. This can be anything that
  `JSON.stringify` can serialise but must fit within the size limits of
  cookies.
- **`options: object`**
  Any `cookie.serialize()` option besides `encode` and `httpOnly`.
  (To set `httpOnly` you must declare it when initially describing the
  cookie.)
  See: https://www.npmjs.com/package/cookie


### `req.cookies`

An object containing the data from all active cookies.


### `req.cookiesMeta`

An object that contains a description of all supported cookies and
whether the user has consented to them.


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
