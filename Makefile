.PHONY = all deps docs test tmux

all: deps

deps: node_modules/

docs: storybook-static/

test: deps
	npm test
	npm run test:integration

tmux: deps
	tmux source-file ./.tmuxrc

node_modules/: package.json
	npm install

storybook-static/:
	npm run 'build-storybook:docs'
