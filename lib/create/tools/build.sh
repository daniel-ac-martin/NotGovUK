#! /bin/env bash

set -euo pipefail

root_dir='../..'
workflows_dir='.github/workflows'

cp -av "${root_dir}/${workflows_dir}/chromatic.yml" "skel/${workflows_dir}/"
cp -av "${root_dir}/${workflows_dir}/test.yml" "skel/${workflows_dir}/"
cp -av "${root_dir}/.storybook/" 'skel/'

source_docs="${root_dir}/apps/govuk-docs"
target_docs='skel/apps/docs'

mkdir -p "${target_docs}/src/common/pages/"
cp -av "${source_docs}/src/common/pages/"{components,index}.tsx "${target_docs}/src/common/pages/"
cp -av "${source_docs}/webpack.config"*.js "${target_docs}"
