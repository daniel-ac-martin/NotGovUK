cp = cp -P --preserve=all
patch_package = sed -Ei 's/"@(not-govuk)\/([^"]+)": "workspace:(.+)"/"@\1\/\2": "\3"/'
strip_package = jq '{ scripts: .scripts, devDependencies: .devDependencies }'
build_dir = ./build
dist_dir = ./dist
source_dir = ../..
target_dir = $(build_dir)/skel
sources := $(wildcard \
	$(source_dir)/.github/workflows/* \
	$(source_dir)/.gitignore \
	$(source_dir)/.jest/*/* \
	$(source_dir)/.npm/* \
	$(source_dir)/.storybook/* \
	$(source_dir)/apps/README.md \
	$(source_dir)/components/README.md \
	$(source_dir)/jest.config*.js \
	$(source_dir)/lib/README.md \
	$(source_dir)/plopfile.js \
	$(source_dir)/pnpm-lock.yaml \
	$(source_dir)/pnpm-workspace.yaml \
	$(source_dir)/skel/*/*/*/*/* \
	$(source_dir)/tsconfig*.json \
)
docs_app = govuk-docs
docs_source_dir = $(source_dir)/apps/$(docs_app)
docs_target_dir = $(target_dir)/apps/docs
docs_sources := $(wildcard \
	$(docs_source_dir)/src/mdx.d.ts \
	$(docs_source_dir)/src/common/pages/components.tsx \
	$(docs_source_dir)/src/common/pages/index.tsx \
	$(docs_source_dir)/webpack.config*.js \
)
skel_deps = \
	$(patsubst $(source_dir)/%,$(target_dir)/%,$(sources)) \
	$(patsubst $(docs_source_dir)/%,$(docs_target_dir)/%,$(docs_sources)) \
	$(docs_target_dir)/package.json
plopfile = $(target_dir)/plopfile.js

.PHONY: all clean

all: \
	$(dist_dir)/skel.tar \
	$(dist_dir)/package.base.json

clean:
	rm -rf build dist

$(dist_dir)/package.base.json: $(source_dir)/package.json
	mkdir -p '$(@D)'
	$(strip_package) '$(<)' > '$(@)'
	$(patch_package) '$(@)'

$(build_dir)/package.app.json: $(plopfile) $(docs_source_dir)
	./node_modules/.bin/plop --plopfile '$(plopfile)' app 'docs' 'Documentation website.'
	rm '$(docs_target_dir)/webpack.config'*.js '$(docs_target_dir)/src/common/pages/'*
	mv '$(docs_target_dir)/package.json' '$(@)'

$(build_dir)/package.docs.json: $(docs_source_dir)/package.json
	mkdir -p '$(@D)'
	jq '{ devDependencies: .devDependencies }' '$(<)' > '$(@)'
	$(patch_package) '$(@)'

$(dist_dir)/skel.tar: $(skel_deps)
	mkdir -p '$(@D)'
	sed -i 's/$(docs_app)/docs/g' 'build/skel/.github/workflows/deploy-docs.yml'
	cd 'build/' && tar -cf '../$(@)' 'skel/'

$(docs_target_dir)/package.json: $(build_dir)/package.app.json $(build_dir)/package.docs.json
	jq -s '.[0] * .[1]' $(^) > '$(@)'

$(docs_target_dir)/%: $(docs_source_dir)/% $(docs_target_dir)/package.json
	mkdir -p '$(@D)'
	$(cp) '$(<)' '$(@D)'

$(target_dir)/%: $(source_dir)/%
	mkdir -p '$(@D)'
	$(cp) '$(<)' '$(@D)'
