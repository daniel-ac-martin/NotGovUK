#! /bin/bash

set -euxo pipefail

# Prepare for pnpm run
npm install pnpm --no-progress --no-audit --no-fund --no-save --no-package-lock

# Install npm dependencies
./node_modules/.bin/pnpm i --shamefully-hoist
ls -l node_modules

# Build docs website
cd ./apps/govuk-docs/
npm run build
du -h dist/
cd ../../

# Prepare node_modules/ for caching
mv node_modules/.ignored/* node_modules/ || true
