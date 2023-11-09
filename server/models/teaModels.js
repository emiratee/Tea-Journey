const client = require('../db')
const db = client.db('teajourney').collection('teas');

async function getTea() {
    await client.connect();
    const res = await db.find({}).toArray();
    //client.close();
    return res;
}

async function postTea(body) {
    if (!body) return new Error();
    await client.connect();
    const res = await db.insertOne(body);
    //client.close();
    return res;
}

module.exports = { getTea, postTea }