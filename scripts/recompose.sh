#!/bin/bash

# Pararse en .../teleco/
# sudo chmod 777 scripts/recompose.sh
# ./scripts/recompose.sh

# docker compose stop

# sudo rm -rf /home/francoq/labrem/volumenes/teleco-db/*

# docker rmi $(docker images -aq)

# docker rmi teleco-server:latest teleco-client:latest

# alias recompose-teleco='/home/francoq/labrem/teleco/scripts/recompose.sh && /home/francoq/labrem/teleco/scripts/create-db.sh'

docker compose down
docker rmi teleco-server:latest
docker compose up
