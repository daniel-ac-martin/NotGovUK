#! /bin/bash

set -euxo pipefail

# Debug
ls
ls -l node_modules

# Prepare for pnpm run
npm install pnpm --no-progress --no-audit --no-fund --no-save --no-package-lock

# Debug
ls -l node_modules

# Install npm dependencies
./node_modules/.bin/pnpm i
ls -l node_modules

# Build docs website
cd ./apps/govuk-docs/
#npm run build
cd ../../

# Prepare node_modules/ for caching
mv -v node_modules/.ignored/* node_modules/ || true
ls -l apps/govuk-docs/node_modules
ls -l node_modules
ls -l node_modules/.pnpm
