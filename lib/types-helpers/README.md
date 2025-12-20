NotGovUK - Types-Helpers
========================

Types to aid in defining other types.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/types-helpers
```

Then use it in your code as follows:

```ts
import type { Maybe, Promised } from '@not-govuk/types-helpers';

const foo = (): Maybe<string> => {
  if (something) {
    return 'yes';
  }
};

type Fn = (): Promised<string>;

const bar: Fn = async () => 'result';
const baz: Fn = () => 'result';
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
