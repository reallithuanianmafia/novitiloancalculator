DOCKER_COMP = docker compose
PHP_CONT = $(DOCKER_COMP) exec noviti-app

help:
	@(cat Makefile)

build: # build docker containers
	@$(DOCKER_COMP) build --no-cache

up: # start docker containers in detached mode
	@$(DOCKER_COMP) up -d

stop: # stop containers
	@$(DOCKER_COMP) stop

down: # stop and remove containers
	@$(DOCKER_COMP) down --remove-orphans

restart: down build up # rebuild and start new containers

logs: # show logs for started containers
	@$(DOCKER_COMP) logs --tail=0 --follow

sh: # open shell inside php container
	@$(PHP_CONT) bash

stan: # check for errors using phpstan
	@$(DOCKER_COMP) exec lizis-app ./phpstan/check-project.sh
