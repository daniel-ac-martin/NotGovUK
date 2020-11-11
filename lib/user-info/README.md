NotGovUK - User Info
====================

A React context (with hook) for providing information on the user.

This is useful for:
- referring to the user by name
- letting them know that they are logged in
- communicating to them what they are allowed to do on the system with
  their current permissions / roles

> **Note:** This is _NOT_ a security enforcing function; security should
>           be enforced on the server-side in API endpoints and GraphQL
>           resolvers.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/user-info
```

Then use it in your code as follows:

```js
import React, { createElement as h } from 'react';
import { UserInfoContext, useUserInfo } from '@not-govuk/user-info';

const dummyUserInfo = {
  username: 'DummyUser',
  groups: ['DummyGroup'],
  roles: ['DummyRole']
};

export const MyConsumer = props => {
  const { username } = useUserInfo();

  return (
    <p>Welcome {username}.</p>
  );
};

export const MyComponent = props => (
  <UserInfo.Provider value={dummyUserInfo}>
    <MyConsumer />
  </UserInfo.Provider>
);

export default MyComponent;
```

(Most users will only need to use the hook as the context has already
been set up for them.)


Working on this package
-----------------------

Before working on this package you must install its dependencies using
the following command:

```shell
pnpm install
```


### Testing

```shell
npm test
```


### Building

```shell
npm run build
```


### Clean-up

```shell
npm run clean
```
