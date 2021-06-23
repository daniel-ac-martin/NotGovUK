NotGovUK - Application plop-pack
================================

Generators for use within applications and prototypes.


Using this package
------------------

First install the package into your project:

```shell
npm install -D @not-govuk/app-plop-pack
```

Then use it in your `plopfile.js` as follows:

```js
module.exports = plop => {
  plop.load('@not-govuk/app-plop-pack');

  // ...
}
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
