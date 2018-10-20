.DEFAULT_GOAL := serve

CHECK_PREREQUISITES := $(shell ./check-prerequisites)
ifneq ($(CHECK_PREREQUISITES),)
$(error $(CHECK_PREREQUISITES))
endif


.PHONY: serve test report docker
serve: node_modules spin-up-development-server

test: node_modules lint unit

report: node_modules unit-coverage open-coverage-report

docker:
	docker -t spotty-kiwi -f ./Dockerfile . 


.PHONY: lint unit spin-up-development-server open-coverage-report unit-coverage
lint:
	yarn run lint
unit:
	yarn run test
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
