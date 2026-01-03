NotGovUK - React-Router-Context
===============================

A collection of React Router contexts for use in NotGovUK applications.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/react-router-context
```

Then use it in your code as follows:

```js
import type { RouterContextProvider } from '@not-govuk/react-router-context'; // Replaces import from react-router
import { userInfoContext, cspNonceContext } from '@not-govuk/react-router-context';

export const loader = async ({ context: _context }: Route.LoaderArgs) => {
  const context = _context as RouterContextProvider; // Needed to get extra properties recognised

  const cspNonce = context.cspNonce;
  const userInfo = context.userInfo;

  // Alternatively...
  const cspNonceAlt = context.get(cspNonceContext);
  const userInfoAlt = context.get(userInfoContext);

  // ...
};
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
