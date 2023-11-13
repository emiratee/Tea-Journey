const models = require('../models/accountModels.js');
const jwt = require('jsonwebtoken');
const client = require('../db');
const { tokenToUserId } = require('../utils/util.js');
const db = client.db('teajourney').collection('users');
const SECRET_KEY = 'I love tea and I especially love my cat but I do not love it when my tea is cold';

async function login(ctx) {
    const { username, password } = ctx.request.body;
    if(!username || !password) throw new Error();
    try {
        const user = await db.findOne({ username });
        if(!user) {
            ctx.status = 401;
            ctx.body = { status: 401, message: 'User does not exists' };
            return;
        }

        const token = await models.login(user.user_id, password, user.password); //First one is the one the user submits, 2nd one is from db
        if(!token) {
            ctx.status = 401;
            ctx.body = { status: 401, message: 'Invalid password.' }
            return;
        }
        ctx.status = 200;
        ctx.body = { status: 200, message: 'Success', token };
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
        console.log(error);
    }
}

async function register(ctx) {
    const { name, username, password } = ctx.request.body;
    if(!name || !username || !password) throw new Error();
    try {
        const userWithUsername = await db.findOne({ username });
        if(userWithUsername) {
            ctx.status = 401;
            ctx.body = { status: 401, message: 'User with this username already exists' };
            return;
        }

        const token = await models.register(name, username, password);
        ctx.status = 201;
        ctx.body = { status: 201, message: 'Success', token };

    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
        console.log(error);
    }
}

async function getUser(ctx) {
    try {
        const { authorization } = ctx.headers;
        const user_id = tokenToUserId(authorization, SECRET_KEY);
        const user = await db.findOne({ user_id });
        if(!user) {
            ctx.status = 404;
            ctx.body = { status: 404, message: 'User not found' }
            return
        }
        const user_info = await models.getUser(user);
        ctx.status = 200
        ctx.body = { status: 200, user_info }
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
        console.log(error);
    }
}

async function changeCounter(ctx) {
    try {
        if(!ctx.request.body) return new Error();
        const { authorization } = ctx.headers;
        const { direction } = ctx.params;
        const user_id = tokenToUserId(authorization)
        const result = await models.changeCounter(direction, user_id);
        ctx.status = 200;
        ctx.body = { status: 200, result };
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
        console.log(error);
    }
}

async function addTea(ctx) {
    try {
        const { name } = ctx.request.body;
        const { authorization } = ctx.headers;
        const user_id = tokenToUserId(authorization, SECRET_KEY);
        const result = await models.addTea(name, user_id);
        ctx.status = 200;
        ctx.body = { status: 200, result };
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
        console.log(error);
    }
}

async function addBrewTime(ctx) {
    try {
        const { authorization } = ctx.headers;
        const { time } = ctx.request.body;
        const user_id = tokenToUserId(authorization, SECRET_KEY);
        const result = await models.addBrewTime(time, user_id)
        ctx.status = 200;
        ctx.body = { status: 200, result }
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
        console.log(error);
    }
}

async function markAsFavourite(ctx) {
    try {
        const { authorization } = ctx.headers;
        const { name } = ctx.request.body;
        const user_id = tokenToUserId(authorization, SECRET_KEY);
        const result = await models.markAsFavourite(name, user_id)
        ctx.status = 200;
        ctx.body = { status: 200, result }
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
        console.log(error);
    }
}

module.exports = { login, register, changeCounter, getUser, addTea, addBrewTime, markAsFavourite }