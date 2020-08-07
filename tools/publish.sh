#! /bin/env bash

set -euo pipefail

function usage {
    cat <<EOF
Usage: ${0} VERSION

Versions the entire monorepo to the VERSION provided. This includes
making a Git commit and tag just as `npm version` would in a normal
repository.

It is your responsibility to:
  1. set the VERSION correctly
  2. ensure that you are working on a recent branch from `master`
  3. merge in the commit afterwards
  4. push the tag
EOF
}

function check_arg {
    if [ -z "${1}" ]; then
        echo "Error: Missing ${2} in arguments";
        echo
        usage
        exit 1;
    fi
}

version="${1}"

check_arg "${version}" "VERSION"

npm run all:version "${version}"
git add {apps,components,components-internal,lib,lib-govuk,packages}/*/package.json
git commit -m "${version}"
git tag "v${version}"
npm run all:publish "${version}"

echo "Packages pushed. Now ensure this is merged into the master branch."
