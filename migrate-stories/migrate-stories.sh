#! /bin/env bash

set -euo pipefail

components_dir="components"

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"

for f in "${components_dir}"/*/spec/*.stories.mdx; do
    echo "${f}"
    readarray -d '/' -t parts <<< "${f}"
    dir=${parts[1]}
    echo "  Directory: ${dir}"
    spec_dir=$(dirname ${f})
    base=$(basename "${f}")
    camel=${base%.stories.mdx}
    spec="${components_dir}/${dir}/spec/${camel}"
    docs="${spec}.mdx"
    stories="${spec}.stories.tsx"

    # Create new stories file
    echo -n "  Stories: ${stories}"
    ${script_dir}/mdx-to-stories/mdx-to-stories.mjs "${f}" > "${stories}"
    sed -i -E 's/\\\\\\\\xA3/£/g' "${stories}"
    sed -i -E 's/\\\\\\\\u2019/’/g' "${stories}"
    sed -i -E 's/\\\\u2013/–/g' "${stories}"
    echo " WRITTEN"

    # Create new documentation file
    echo -n "  Docs: ${docs}"
    COMPONENT="${camel}" ${script_dir}/mdx-to-docs.pl "${f}" > "${docs}"
    echo " WRITTEN"

    # # Parse out info
    # name=$(grep 'title=".*"' "${f}" | sed 's/^.*"\(.*\)".*$/\1/')
    # desc=$(grep -E "description: '.*'" "${f}" | sed "s/^.*'\(.*\)'.*\$/\1/")
    # echo "  Name: ${name}"
    # echo "  Description: ${desc}"
    # viewports=$(grep -E 'viewports: \[.*\]' "${f}" | sed 's/^.*\[\(.*\)\].*$/\1/')
    # echo "  Viewports: ${viewports}"

    # # Create new spec files
    # echo "  +" npm run create:component "${name}" "${desc}"

    # # Patch the output
    # echo "  +" sed -i "s/viewports: \[.*\]/viewports: [${viewports}]/" "${stories}"
    # awk -f regen-stories.awk "${f}"

    # # Overwrite original file
    # echo "  +" mv "${mdx}" "${old_spec_dir}/"
    # echo "  +" mv "${stories}" "${old_spec_dir}/"
done
