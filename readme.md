## Running sharded mongo culster on one machine:

Update the private IP address in mongoSetup/mongos/docker-compose.yml and app.js
Run `./up.sh`
This starts all the mongo instances with docker.

Enter the mongo shell for one of the config servers:
`mongo "mongodb://<IP>:40001"`
Connect the three config servers into one replica set:
`rs.initiate(
  {
    _id: "cfgrs",
    configsvr: true,
    members: [
      { _id : 0, host : "<IP>:40001" },
      { _id : 1, host : "<IP>:40002" },
      { _id : 2, host : "<IP>:40003" }
    ]
  }
)`

Leave shell: `exit`

Enter the mongo shell for one of the shard1 servers:
`mongo "mongodb://<IP>:50001"`
Connect the three shard1 servers into one replica set:
`rs.initiate(
  {
    _id: "shard1rs",
    members: [
      { _id : 0, host : "<IP>:50001" },
      { _id : 1, host : "<IP>:50002" },
      { _id : 2, host : "<IP>:50003" }
    ]
  }
)`

Leave shell: `exit`

Repeat for all other shards:
`mongo "mongodb://<IP>:50004"`
Connect the three shard2 servers into one replica set:
`rs.initiate(
  {
    _id: "shard2rs",
    members: [
      { _id : 0, host : "<IP>:50004" },
      { _id : 1, host : "<IP>:50005" },
      { _id : 2, host : "<IP>:50006" }
    ]
  }
)`

Leave shell: `exit`

Enter the mongo shell for the mongos server:
`mongo "mongodb://<IP>:60000"`
Connect shards to mongos:
`sh.addShard("shard1rs/<IP>:50001,<IP>:50002,<IP>:50003")`
`sh.addShard("shard2rs/<IP>:50004,<IP>:50005,<IP>:50006")`

Create and select database: `use express_url_shortener`
Enable sharding on database: `sh.enableSharding("express_url_shortener")`
Create collenction: `db.createCollection('shorturls')`
Shard collection: `sh.shardCollection("express_url_shortener.shorturls", {"shortened": "hashed"})`

Leave shell: `exit`

Start Express application:
`docker-compose up -d --build`

Stop database servers: `./down.sh` (all data and configuration is still in docker volumes)
Stop Application server: `docker-compose down`






