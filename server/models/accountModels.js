const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const client = require('../db');
const db = client.db('teajourney').collection('users');
const SECRET_KEY = 'I love tea and I especially love my cat but I do not love it when my tea is cold'

async function login(user_id, userPassword, dbPassword) {
    await client.connect();

    const validPassword = await bcrypt.compare(userPassword, dbPassword);
    if (!validPassword) return;

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
        badges: [
            {
                name: 'Tea Noob', //When having 0 reviews
                unlocked: true
            },
            {
                name: 'Tea Hater', //When having an average rating below 2
                unlocked: false
            },
            {
                name: 'Tea Expert', //When having more then 10 reviews
                unlocked: false
            },
            {
                name: 'Tea Lover', //When having at least one 10 star reviews
                unlocked: false
            },
            {
                name: 'Tea Enthusiast', //When having the max amount of reviews
                unlocked: false
            }
        ],
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

async function changeCounter(direction, user_id) {
    await client.connect();
    const res = (direction === 'up') ? await db.findOneAndUpdate({ user_id: user_id }, { $inc: { teas_drunken: + 1 } }, { returnDocument: 'after' }) : await db.updateOne({ user_id }, { $inc: { teas_drunken: - 1 } }, { returnDocument: 'after' });
    return res
}

async function addTea(name, user_id) {
    const user = await db.findOne({ user_id });

    const existingTeaIndex = user.brewed_teas.findIndex(t => t.name === name);

    if (existingTeaIndex === -1) {
        await db.findOneAndUpdate(
            { user_id },
            { $push: { brewed_teas: { name, score: 1 } } }
        );
    } else {
        await db.findOneAndUpdate(
            { user_id, 'brewed_teas.name': name },
            { $inc: { 'brewed_teas.$.score': 1 } }
        );
    }
}

async function addBrewTime(time, user_id) {
    await db.updateOne({ user_id }, { $inc: { brewing_time: time } });
}

async function markAsFavourite(name, user_id) {
    await db.updateOne({ user_id }, { $set: { favourite_tea: name } });
}

async function rateTea(name, rating, user_id) {
    const user = await db.findOne({ user_id });

    const existingTeaIndex = user.reviews.findIndex(t => t.name === name);

    if (existingTeaIndex === -1) {
        await db.findOneAndUpdate(
            { user_id },
            { $push: { reviews: { name, score: rating } } }
        );
    } else {
        await db.findOneAndUpdate(
            { user_id, 'reviews.name': name },
            { $set: { 'reviews.$.score': rating } }
        );
    }

    const updatedUser = await db.findOne({ user_id });
    const reviews = updatedUser.reviews;

    let res = 0;
    await reviews.forEach(review => res += review.score);
    let avg = res / reviews.length;

    await db.updateOne({ user_id }, { $set: { average_rating: avg } });

    const isTeaNoob = reviews.length === 0;
    await db.updateOne(
        { user_id, 'badges.name': 'Tea Noob' },
        { $set: { 'badges.$.unlocked': isTeaNoob } }
    );

    const isTeaHater = avg < 2;
    await db.updateOne(
        { user_id, 'badges.name': 'Tea Hater' },
        { $set: { 'badges.$.unlocked': isTeaHater } }
    );

    const isTeaExpert = reviews.length >= 10;
    await db.updateOne(
        { user_id, 'badges.name': 'Tea Expert' },
        { $set: { 'badges.$.unlocked': isTeaExpert } }
    );

    const isTeaLover = reviews.some(review => review.score === 10)
    await db.updateOne(
        { user_id, 'badges.name': 'Tea Lover' },
        { $set: { 'badges.$.unlocked': isTeaLover } }
    );

    const isTeaEnthusiast = reviews.length === 42;
    await db.updateOne(
        { user_id, 'badges.name': 'Tea Enthusiast' },
        { $set: { 'badges.$.unlocked': isTeaEnthusiast } }
    );

    const returnUser = await db.findOne({ user_id }); //for the badges live update
    return returnUser.badges;
}

async function resetJourney(user_id) {
    const result = await db.updateOne({ user_id }, {
        $set: {
            favourite_tea: 'None',
            brewing_time: 0,
            brewed_teas: [],
            teas_drunken: 0,
            badges: [
                {
                    name: 'Tea Noob', //When having 0 reviews
                    unlocked: true
                },
                {
                    name: 'Tea Hater', //When having an average rating below 2
                    unlocked: false
                },
                {
                    name: 'Tea Expert', //When having more then 10 reviews
                    unlocked: false
                },
                {
                    name: 'Tea Lover', //When having at least one 10 star reviews
                    unlocked: false
                },
                {
                    name: 'Tea Enthusiast', //When having the max amount of reviews
                    unlocked: false
                }
            ],
            reviews: [],
            average_rating: 0,
            joined_at: Date.now()
        }
    });
    
    return result;
}

async function updateUser(data) {
    const { name, username, password, user_id } = data;
    const newPassword = await bcrypt.hash(password, 10);

    return await db.findOneAndUpdate({ user_id }, { $set: { name, username, password: newPassword } }, { returnDocument: 'after' });
}


module.exports = { login, register, getUser, changeCounter, addTea, addBrewTime, markAsFavourite, rateTea, resetJourney, updateUser }


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