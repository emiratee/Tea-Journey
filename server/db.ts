import { MongoClient } from 'mongodb';
const url: string = 'mongodb://127.0.0.1:27017';
const client: MongoClient = new MongoClient(url);

export default client;
