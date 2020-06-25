#! /bin/env sh

set -euxo pipefail

# Install pnpm
mkdir -p tools
cd tools
echo '{}' > package.json
npm install pnpm
cd ..

# Install npm dependencies
./tools/node_modules/.bin/pnpm i

# Build docs website
cd ./apps/govuk-docs/
npm run build
