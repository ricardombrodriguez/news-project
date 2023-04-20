rs.initiate(
{
  _id: "rs0",
  members: [
    { _id: 0, host: "mongodb-0.mongodb.gic-group-6.svc.cluster.local:27017" },
    { _id: 1, host: "mongodb-1.mongodb.gic-group-6.svc.cluster.local:27017" },
    { _id: 2, host: "mongodb-2.mongodb.gic-group-6.svc.cluster.local:27017" }
  ]
}
)