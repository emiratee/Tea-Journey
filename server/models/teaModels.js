const client = require('../db');
const { tokenToUserId } = require('../utils/util');
const db = client.db('teajourney').collection('teas');
const userdb = client.db('teajourney').collection('users');

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

async function changeCounter(direction, token) {
    const user_id = tokenToUserId(token)
    await client.connect();
    const res = (direction === 'up') ? await userdb.findOneAndUpdate({ user_id: user_id }, { $inc: { teas_drunken: + 1 } }, { returnDocument: 'after' }) : await userdb.updateOne({ user_id }, { $inc: { teas_drunken: - 1 } }, { returnDocument: 'after' });
    return res
}

module.exports = { getTea, postTea, changeCounter }