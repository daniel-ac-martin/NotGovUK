NotGovUK - Memoize
==================

Higher-order functions for memoizing pure functions.

[Memoization] is a crude optimisation whereby the results of a function
are store in memory. It only works for functions that offer
[referential transparency], meaning that they return the same value for
the same input.

**Note:** Currently, only single-parameter functions are supported.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/memoize
```

Then use it in your code as follows:

```js
import memoize from '@not-govuk/memoize';

const myPureFunction = str => str.length;

const memoizedFn = memoize(myPureFunction);

memoizedFn('foo'); // 3
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


[Memoization]: https://en.wikipedia.org/wiki/Memoization
[referential transparency]: https://en.wikipedia.org/wiki/Referential_transparency
