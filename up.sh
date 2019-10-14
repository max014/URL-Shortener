docker-compose -f mongoSetup/shard1/docker-compose.yml up -d

# mongo mongodb://192.168.1.114:50001 connect.js


docker-compose -f mongoSetup/shard2/docker-compose.yml up -d
docker-compose -f mongoSetup/config-server/docker-compose.yml up -d
docker-compose -f mongoSetup/mongos/docker-compose.yml up -d
# docker-compose up