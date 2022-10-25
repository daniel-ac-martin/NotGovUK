NotGovUK - File Upload
======================

A component to help users select and upload a file.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/file-upload
```

Then use it in your code as follows:

```js
import React, { createElement as h } from 'react';
import FileUpload from '@not-govuk/file-upload';

export const MyComponent = props => (
  <FileUpload
    id="file-upload-1"
    name="file-upload-1"
    label="Upload a file"
  />
);

export default MyComponent;
```


Working on this package
-----------------------

Before working on this package you must install its dependencies using
the following command:

```shell
pnpm install
```


### Testing

Run the unit tests.

```shell
npm test
```


### Building

Build the package by compiling the TypeScript source code.

```shell
npm run build
```


### Clean-up

Remove any previously built files.

```shell
npm run clean
```
