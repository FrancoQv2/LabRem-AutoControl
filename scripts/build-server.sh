#!/bin/bash


#docker build -f dockerfiles/Dockerfile.server -t teleco:$1 server
docker build -t teleco:$1 server

# docker run -ti -p 8080:8080 --name teleco teleco:v1
