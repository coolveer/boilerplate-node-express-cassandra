const ExpressCassandra = require('express-cassandra');
const connect = ExpressCassandra.createClient({
   clientOptions: {
      contactPoints: [process.env.contactPoints],
      localDataCenter: 'datacenter1',
      protocolOptions: { port: 9042 },
      keyspace: process.env.keyspace,
      queryOptions: { consistency: ExpressCassandra.consistencies.one },
      socketOptions: { readTimeout: 60000 },
   },
   ormOptions: {
      defaultReplicationStrategy: {
         class: 'SimpleStrategy',
         replication_factor: 1,
      },
      migration: 'safe',
   },
});

console.log('Cassandra connected');

module.exports = connect;
