#! /bin/env bash

set -euo pipefail

version="$(jq -r '.version' 'package.json')"

npm run all:version -- "${version}"
git add {apps,components,components-internal,lib,lib-govuk,packages}/*/package.json
