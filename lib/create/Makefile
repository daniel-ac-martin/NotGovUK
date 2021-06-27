cp = cp -P --preserve=all
patch_package = sed -Ei 's/"@(not-govuk)\/([^"]+)": "workspace:(.+)"/"@\1\/\2": "\3"/'
strip_package = jq '{ scripts: .scripts, devDependencies: .devDependencies }'
build_dir = ./build
dist_dir = ./dist
source_dir = ../..
target_dir = $(build_dir)/skel
sources := $(wildcard \
	$(source_dir)/.github/workflows/chromatic.yml \
	$(source_dir)/.github/workflows/test.yml \
	$(source_dir)/.gitignore \
	$(source_dir)/.jest/*/* \
	$(source_dir)/.npm/* \
	$(source_dir)/.storybook/* \
	$(source_dir)/apps/README.md \
	$(source_dir)/babel.config.js \
	$(source_dir)/components/README.md \
	$(source_dir)/docs/about.md \
	$(source_dir)/docs/contributing.md \
	$(source_dir)/docs/get-started.md \
	$(source_dir)/docs/working-on-your-project.md \
	$(source_dir)/jest.config*.js \
	$(source_dir)/lib/README.md \
	$(source_dir)/pnpm-lock.yaml \
	$(source_dir)/pnpm-workspace.yaml \
	$(source_dir)/tsconfig*.json \
)
docs_app = govuk-docs
docs_source_dir = $(source_dir)/apps/$(docs_app)
docs_target_dir = $(target_dir)/apps/docs
docs_sources := $(wildcard \
	$(docs_source_dir)/src/mdx.d.ts \
	$(docs_source_dir)/src/common/page-wrap.tsx \
	$(docs_source_dir)/src/common/pages/components.tsx \
	$(docs_source_dir)/src/common/pages/contributing.tsx \
	$(docs_source_dir)/src/common/pages/get-started.tsx \
	$(docs_source_dir)/src/common/pages/working-on-your-project.tsx \
	$(docs_source_dir)/src/common/pages/index.tsx \
	$(docs_source_dir)/webpack.config.js \
)
skel_deps = \
	$(patsubst $(source_dir)/%,$(target_dir)/%,$(sources)) \
	$(patsubst $(docs_source_dir)/%,$(docs_target_dir)/%,$(docs_sources)) \
	$(target_dir)/plopfile.js \
	$(docs_target_dir)/package.json
plopfile = $(target_dir)/plopfile.js

.PHONY: all clean

all: \
	$(dist_dir)/skel.tar \
	$(dist_dir)/skel-prototype.tar \
	$(dist_dir)/package.base.json

clean:
	rm -rf build dist

$(dist_dir)/package.base.json: $(source_dir)/package.json
	mkdir -p '$(@D)'
	$(strip_package) '$(<)' > '$(@)'
	$(patch_package) '$(@)'

$(build_dir)/skel-prototype/package.json: $(plopfile)
	./node_modules/.bin/plop --plopfile '$(plopfile)' app 'docs' 'Documentation' 'Documentation website.'
	$(cp) -r '$(target_dir)/apps/docs/' '$(@D)'
	rm '$(@D)/README.md' '$(@D)/tsconfig.json'

$(build_dir)/skel-prototype/tsconfig.json: $(source_dir)/tsconfig.json $(source_dir)/tsconfig.webpack.json $(build_dir)/skel-prototype/package.json
	mkdir -p '$(@D)'
	jq -s '.[0].compilerOptions * .[1].compilerOptions | { compilerOptions: . }' '$(<)' '$(word 2,$^)' > '$(@)'

$(build_dir)/package.app.json: $(build_dir)/skel-prototype/package.json $(docs_source_dir)
	rm '$(docs_target_dir)/webpack.config.js' '$(docs_target_dir)/src/common/pages/'* '$(docs_target_dir)/src/common/page-wrap.tsx'
	mv '$(docs_target_dir)/package.json' '$(@)'

$(build_dir)/package.docs.json: $(docs_source_dir)/package.json
	mkdir -p '$(@D)'
	jq '{ devDependencies: .devDependencies }' '$(<)' > '$(@)'
	$(patch_package) '$(@)'

$(dist_dir)/skel.tar: $(skel_deps)
	mkdir -p '$(@D)'
	cd 'build/' && tar -cf '../$(@)' 'skel/'

$(dist_dir)/skel-prototype.tar: $(build_dir)/skel-prototype/package.json $(build_dir)/skel-prototype/tsconfig.json
	mkdir -p '$(@D)'
	cd 'build/' && tar -cf '../$(@)' 'skel-prototype/'

$(docs_target_dir)/package.json: $(build_dir)/package.app.json $(build_dir)/package.docs.json
	jq -s '.[0] * .[1]' $(^) > '$(@)'

$(docs_target_dir)/%: $(docs_source_dir)/% $(docs_target_dir)/package.json
	mkdir -p '$(@D)'
	$(cp) '$(<)' '$(@D)'

$(target_dir)/plopfile.js: $(source_dir)/plopfile.js
	mkdir -p '$(@D)'
	sed 's/plop-pack/plop-pack-internal/' '$(<)' > '$(@)'

$(target_dir)/%: $(source_dir)/%
	mkdir -p '$(@D)'
	$(cp) '$(<)' '$(@D)'
