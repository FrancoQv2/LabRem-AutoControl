#!/bin/bash

docker build -t web:v1 teleco/client
docker run -ti --name web -p 8080:80 web:v1