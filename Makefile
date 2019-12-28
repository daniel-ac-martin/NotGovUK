.PHONY = all deps test tmux

all: deps

deps: node_modules/

test: deps
	npm test

tmux: deps
	tmux source-file ./.tmuxrc

node_modules/: package.json
	npm install
