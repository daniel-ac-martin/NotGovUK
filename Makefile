version ?= next

.PHONY = all deps publish test tmux

all: deps

deps: node_modules/

test: deps
	pnpm test
	pnpm run test:integration

tmux: deps
	tmux source-file ./.tmuxrc

node_modules/: package.json packages/*/package.json
	pnpm install

publish:
	npm run all:clean
	git nb 'v$(version)'
	npm version '$(version)'
	npm run all:publish
	git push
	git push --tags
