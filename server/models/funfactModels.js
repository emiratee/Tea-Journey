const client = require('../db')
const db = client.db('teajourney').collection('funfacts');

async function getFunfact() {
    await client.connect();
    const res = await db.find({}).toArray();
    //client.close();
    return res;
}

module.exports = { getFunfact }