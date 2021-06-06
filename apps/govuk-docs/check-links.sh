#!/bin/bash +x

set -e
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "${SCRIPT_DIR}"

[ -d node_modules ] && [ -f dist/server/index.js ] || make deps build > /dev/null
set +e
npm run ssr > /dev/null &
server=$!

selector='.links | .[] | select(.state | contains("BROKEN"))'
template='.state, " link [", .status, "] in page ", .parent, ", for target: ", .url, "\n"'
curl -fs \
  --retry 15 \
  --retry-delay 2 \
  --retry-max-time 30 \
  --retry-connrefused \
  http://localhost:8080/ > /dev/null && \
  linkinator http://localhost:8080 \
    --verbosity warning \
    --config ./linkinator.config.json \
    | tee >( jq -jr "${selector} | ${template}" > .missing-links ) \
    | jq -er '.passed | "Links and assets verified: ", .'
result=$?
kill $server
cat .missing-links
exit $result
