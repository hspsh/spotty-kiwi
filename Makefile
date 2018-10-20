.DEFAULT_GOAL := serve

CHECK_PREREQUISITES := $(shell ./check-prerequisites)
ifneq ($(CHECK_PREREQUISITES),)
$(error $(CHECK_PREREQUISITES))
endif


.PHONY: serve build test report docker
serve: node_modules spin-up-development-server

test: node_modules lint unit

report: node_modules unit-coverage open-coverage-report

docker:
	docker build -t transaction_tagger -f ./Dockerfile . 


.PHONY: lint unit e2e spin-up-development-server open-coverage-report unit-coverage
lint:
	yarn run lint
unit:
	yarn run test:unit
spin-up-development-server:
	yarn run serve
open-coverage-report:
	xdg-open coverage/lcov-report/index.html
unit-coverage:
	yarn run coverage

node_modules: yarn.lock
	yarn install --frozen-lockfile
	# at this point yarn.lock is newer than node_modules,
	# because of how yarn accesses those files.

	@touch node_modules # prevent unnecessary rebuilds
