.PHONY = all deps test tmux

all: deps

deps: node_modules/

test: deps
	pnpm test
	pnpm run test:integration

tmux: deps
	tmux source-file ./.tmuxrc

node_modules/: package.json packages/*/package.json
	pnpm install
