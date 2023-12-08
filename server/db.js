const { MongoClient } = require('mongodb');
const url = 'mongodb://mongo:aEaAB22-BfGHh1cdB6E4ec6F1feB5-4E@monorail.proxy.rlwy.net:46361';
const client = new MongoClient(url);

module.exports = client;