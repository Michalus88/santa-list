const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
client.connect();

const db = client.db('santa-list');

module.exports = {
  client,
  db,
};
