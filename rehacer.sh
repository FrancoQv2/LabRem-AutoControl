echo "-> Removing container..."
docker compose -v -f docker-compose.dev.yml down
echo "-> Removing volume..."
docker volume rm control-db
echo "-> Removing image..."
docker rmi control-server
echo "-> Running..."
docker compose -f docker-compose.dev.yml up
