NAME='katacoda/redis-node-docker-example'

build:
	docker build -t $(NAME) .

debug:
	docker run -it --rm --entrypoint=/bin/bash $(NAME)

run:
	docker run -it --rm -p 3000:3000 $(NAME)

push:
	docker push $(NAME)
