Not Govuk - Restify
===================

A customised Restify server for running websites.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/restify
```

Then use it in your code as follows:

```js
const restify = require('@not-govuk/restify');

const httpd = restify.createServer();

httpd.get('/', (req, res, next) => {
  res.send('<html><body>Hello world.</body></html>');
  next();
});

httpd.listen(8080, '0.0.0.0', () => {
  httpd.log.info('%s listening at %s', httpd.name, httpd.url);
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
