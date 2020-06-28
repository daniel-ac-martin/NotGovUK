#! /bin/bash

set -euxo pipefail

# Install pnpm
npm install pnpm serverless --no-progress --no-audit --no-fund --no-save --no-package-lock

# De-scope unnecessary packages
mkdir -p .descoped
mv apps/ .descoped/apps
mv packages/ .descoped/packages
mkdir -p apps
mkdir -p packages
mv .descoped/apps/govuk-docs/ apps/govuk-docs
mv .descoped/packages/components/ packages/components

# Install dependencies
./node_modules/.bin/pnpm i --shamefully-hoist
ls -l node_modules
ls -l node_modules/@storybook
ls -l node_modules/.pnpm/@storybook

# Restore de-scoped packages
mv apps/* .descoped/apps/
mv packages/* .descoped/packages/
rmdir apps
rmdir packages
mv .descoped/* ./

# Build docs website
cd ./apps/govuk-docs/
npm run build
../../node_modules/.bin/sls package
echo "process.env['MODE'] = 'serverless'; module.exports = require('./dist/server/index.js');" >> govuk-docs.js
zip -rv .serverless/govuk-docs.zip govuk-docs.js
rm govuk-docs.js

# Arrange static assets
mkdir public
mv dist/public/entrypoints.json public/
mv dist/public/ public/public
mv public/ dist/public
rm -rf dist/servers/css/
du -h dist/
cd ../../

# Prepare node_modules/ for caching
mv node_modules/.ignored/* node_modules/ || true
