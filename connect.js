rs.initiate(
  {
    _id: "shard1rs",
    members: [
      { _id : 0, host : "localhost:50001" },
      { _id : 1, host : "localhost:50002" },
      { _id : 2, host : "localhost:50003" }
    ]
  }
)