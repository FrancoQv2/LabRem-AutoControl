#!/bin/bash

# sudo chmod 777 scripts/dev-server.sh
# ./scripts/dev-server.sh

IMAGE_NAME=control-dev
CONTAINER_NAME=control-dev
NETWORK_NAME=labrem-net

docker rm -f $CONTAINER_NAME
docker rmi $IMAGE_NAME

docker build -f server/Dockerfile.dev -t $IMAGE_NAME server

docker run -ti --name $CONTAINER_NAME -v $(pwd)/server:/usr/src/server -p 3031:3000 --network $NETWORK_NAME $IMAGE_NAME

# docker build -f server/Dockerfile.dev -t dev-server:latest server
# docker run -ti --name dev-teleco -v $(pwd)/server:/usr/src/server -p 3030:3000 --network labrem-net dev-server:latest


# Control
# cd labrem/control
# docker build -f server/Dockerfile.dev -t dev-control:latest server
# docker run -ti --name dev-control -v $(pwd)/server:/usr/src/server -p 3031:3000 --network labrem-net dev-control:latest