import  { MongoClient, ObjectId } from 'mongodb';

const url = process.env.MONGO_CONNECTION;
if(!url){
  throw new Error("Please add connection url")
}
const client = new MongoClient(url);
client.connect();

const db = client.db('santa-list');

export {
  client,
  db,
  ObjectId,
};
