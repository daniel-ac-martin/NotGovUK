DOCKER_IMAGE ?= not-govuk-docs
DOCKER_REGISTRY ?= hub.docker.com
DOCKER_REPO ?= $(DOCKER_REGISTRY)/$(DOCKER_IMAGE)
KUBE_CONTEXT ?= not-govuk-dev
KUBE_DEPLOYMENT ?= not-govuk-docs
KUBE_CONTAINER ?= app

kubectl ?= kubectl --context $(KUBE_CONTEXT)

patch_version != jq -r '.version' 'package.json'
minor_version != echo "$(patch_version)" | awk -F '.' '{print $$1"."$$2}'
major_version != echo "$(patch_version)" | awk -F '.' '{print $$1}'
full_version != echo "$(patch_version)-$${BUILD_NUMBER/%/-}$$(git rev-parse --short HEAD)"

.PHONY: all aws-lambda build clean deploy deps distclean docker docker-clean docker-push docker-test netlify node-deps test unit-test

all: deps test docker

clean:
	npm run clean
	rm -rf node_modules/ pkg/

distclean: clean docker-clean

deps: node-deps

node-deps: node_modules/.bin/react-router

node_modules/%: package.json
	pnpm install

build: dist/server/index.js

dist/%: node_modules/.bin/react-router
	npm run build

docker: build
	docker build -t '$(DOCKER_IMAGE)' .

docker-test:
	docker build -t '$(DOCKER_IMAGE)-test' -f 'test.Dockerfile' .

docker-clean:
	docker rmi -f '$(DOCKER_IMAGE)' || true
	docker rmi -f '$(DOCKER_IMAGE)-test' || true

docker-push: docker
	docker tag $(DOCKER_IMAGE) '$(DOCKER_REPO):$(full_version)' && docker push '$(DOCKER_REPO):$(full_version)'
	docker tag $(DOCKER_IMAGE) '$(DOCKER_REPO):$(patch_version)' && docker push '$(DOCKER_REPO):$(patch_version)'
	docker tag $(DOCKER_IMAGE) '$(DOCKER_REPO):$(minor_version)' && docker push '$(DOCKER_REPO):$(minor_version)'
	docker tag $(DOCKER_IMAGE) '$(DOCKER_REPO):$(major_version)' && docker push '$(DOCKER_REPO):$(major_version)'
	docker tag $(DOCKER_IMAGE) '$(DOCKER_REPO):latest' && docker push '$(DOCKER_REPO):latest'

docker-run:
	docker run --name=docs -p '8080:8080' '$(DOCKER_IMAGE)'

aws-lambda: pkg/aws-lambda/govuk-docs.zip

pkg/aws-lambda/govuk-docs.zip: dist/server/index.js
	mkdir -p '$(@D)'
	zip -rv '$(@)' '$(<D)/..'

netlify: pkg/netlify/functions/govuk-docs.zip pkg/netlify/publish/_redirects

pkg/netlify/functions/%.zip: pkg/aws-lambda/%.zip
	mkdir -p '$(@D)'
	cp -a '$(<)' '$(@)'
	printf "import { handler } from './dist/server/index.js';\nprocess.env['MODE'] = 'serverless';\nprocess.env['NODE_ENV'] = 'production';\nexport default handler;" > 'pkg/netlify/$(basename $(@F)).js'
	zip -mvj '$(@)' 'pkg/netlify/$(basename $(@F)).js'

pkg/netlify/publish/_redirects: dist/server/index.js
	mkdir -p '$(@D)'
	cp -a 'dist/app/client/' 'pkg/netlify/publish/public'
	echo '/* /.netlify/functions/govuk-docs/:splat 200' > '$(@)'

deploy: docker-push
	$(kubectl) set image "deployment/$(KUBE_DEPLOYMENT)" "$(KUBE_CONTAINER)=$(DOCKER_REPO):$(full_version)"
	$(kubectl) rollout status "deployment/$(KUBE_DEPLOYMENT)"

functional-test: build
	npm run 'test:functional:ci'

unit-test: node-deps
	npm test

test: unit-test functional-test
