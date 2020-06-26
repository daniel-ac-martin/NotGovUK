#! /bin/bash

set -euxo pipefail

# Debug
echo "${PWD}:"
ls
echo "${PWD}/node_modules:"
ls node_modules
echo "${PWD}/govuk-docs:"
ls apps/govuk-docs
echo "${PWD}/govuk-docs/node_modules:"
ls apps/govuk-docs/node_modules

# Install pnpm
mkdir -p tools
cd tools
echo '{}' > package.json
npm install pnpm
cd ..

# Install npm dependencies
./tools/node_modules/.bin/pnpm i

# Clean-up tools
rm -rf tools

# Build docs website
cd ./apps/govuk-docs/
npm run build
