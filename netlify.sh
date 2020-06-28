#! /bin/bash

set -euxo pipefail

# Install pnpm
npm install pnpm --no-progress --no-audit --no-fund --no-save --no-package-lock

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

# Arrange static assets
mkdir public
mv dist/public/entrypoints.json public/
mv dist/public/ public/public
mv public/ dist/public
rm -rf dist/servers/css/
du -h dist/
cd ../../

# Dirty hack (fake vue package)
mkdir -p node_modules/vue
echo '{ "name": "vue", "version": "2.6.10" }' > node_modules/vue/package.json

# Prepare node_modules/ for caching
mv node_modules/.ignored/* node_modules/ || true
