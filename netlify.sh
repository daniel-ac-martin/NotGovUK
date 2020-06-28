#! /bin/bash

set -euxo pipefail

# Install pnpm
npm install pnpm serverless --no-progress --no-audit --no-fund --no-save --no-package-lock

# Install dependencies
./node_modules/.bin/pnpm i --shamefully-hoist

# Build docs website
cd ./apps/govuk-docs/
npm run build

# Package functions
../../node_modules/.bin/sls package
echo "process.env['MODE'] = 'serverless'; module.exports = require('./dist/server/index.js');" > govuk-docs.js
zip -rv .serverless/govuk-docs.zip govuk-docs.js
rm govuk-docs.js

# Arrange static assets
mkdir public
mv dist/public/entrypoints.json public/
mv dist/public/ public/public
mv public/ dist/public
rm -rf dist/servers/css/
cd ../../

# Prepare node_modules/ for caching
mv node_modules/.ignored/* node_modules/ || true
