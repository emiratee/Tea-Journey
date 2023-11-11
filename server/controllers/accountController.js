const models = require('../models/accountModels.js');
const jwt = require('jsonwebtoken');
const client = require('../db')
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
            ctx.body = { status: 401, message: 'Invalid username or password.' }
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
    try {
        const result = await models.register(ctx.request.body);
        ctx.status = 201;
        ctx.body = result;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
        console.log(error);
    }
}

async function getUser(ctx) {
    try {
        const { token } = ctx.params;
        const decoded = jwt.verify(token, SECRET_KEY);
        const { user_id } = decoded;
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

module.exports = { login, register, getUser }