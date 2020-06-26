#! /bin/bash

set -euxo pipefail

# Debug
ls
ls node_modules

# Prepare for pnpm run
npm install pnpm --no-progress --no-audit --no-fund --no-save
mkdir -p tools
mv node_modules/ tools/node_modules
[ -f tools/node_modules/.pnpm-cache ] && mv tools/node_modules/.pnpm-cache node_modules || true

# Debug
ls -l
cat package.json

# Install npm dependencies
./tools/node_modules/.bin/pnpm i

# Build docs website
cd ./apps/govuk-docs/
npm run build

# Prepare node_modules/ for caching
mv node_modules/ tools/node_modules/.pnpm-cache
mv tools/node_modules/ node_modules

# Clean-up
rmdir tools
