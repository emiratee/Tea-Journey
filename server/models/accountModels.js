const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const client = require('../db');
const { tokenToUserId } = require('../utils/util');
const db = client.db('teajourney').collection('users');
const SECRET_KEY = 'I love tea and I especially love my cat but I do not love it when my tea is cold'

async function login(user_id, userPassword, dbPassword) {
    await client.connect();

    const validPassword = await bcrypt.compare(userPassword, dbPassword);
    if(!validPassword) return;

    const token = jwt.sign({ user_id }, SECRET_KEY);
    return token;
}

async function register(name, username, password) {
    await client.connect();
    const user_id = uuidv4();

    const user = {
        user_id,
        name,
        username,
        password: await bcrypt.hash(password, 10),
        favourite_tea: 'None',
        brewing_time: 0,
        brewed_teas: [],
        teas_drunken: 0,
        badges: [],
        reviews: [],
        average_rating: 0,
        joined_at: Date.now()
    }
    await db.insertOne(user);
    const token = jwt.sign({ user_id }, SECRET_KEY);
    //client.close();
    return token;
}

async function getUser(user) {
    const { name, username, favourite_tea, brewing_time, brewed_teas, teas_drunken, badges, reviews, average_rating, joined_at } = user;
    return {
        name,
        username,
        favourite_tea,
        brewing_time,
        brewed_teas,
        teas_drunken,
        badges,
        reviews,
        average_rating,
        joined_at
    }
}

async function brewTime(time, token) {
    const user_id = tokenToUserId(token)
    await db.updateOne({ user_id }, { $inc: { brewing_time: time } });
}


module.exports = { login, register, getUser, brewTime }


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