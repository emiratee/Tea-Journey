const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const client = require('../db')
const db = client.db('teajourney').collection('users');

async function login(body) {
    if (!body) return new Error();
    const { username, password } = body;
    await client.connect();

    const check = await db.findOne({ username });
    if (check === null) return new Error() //user does not exists

    const hash = check.password;
    const validPassword = await bcrypt.compare(password, hash);

    return validPassword ? true : false;
}

async function register(body) {
    if (!body) return new Error();
    const { username, password } = body;
    await client.connect();

    const check = await db.findOne({ username });
    if(check !== null) return new Error('no'); //suer already exists

    const user = {
        user_id: uuidv4(),
        username,
        password: await bcrypt.hash(password, 10),
        favourite_tea: 'None',
        brewing_time: 0,
        brewed_teas: [],
        teas_drunken: 0,
        badges: [],
        day_streak: 0,
        reviews: [],
        average_rating: 0
    }

    const res = await db.insertOne(user);
    //client.close();
    return res;
}

module.exports = { login, register }


/*
user_id uuidv4
username 
password sha256
favourite_tea: tea._id
brewing_time: keep count -> array
most_brewed_tea: look into brew time
teas_drunken: counter
badges: arr
day_streak: counter
reviews: array and the lenght of it
avg_rating: look into reviews and calc middle
*/