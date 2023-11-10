const models = require('../models/accountModels.js');

async function login(ctx) {
    try {
        const result = await models.login(ctx.request.body);
        ctx.status = 200;
        ctx.body = result;
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

module.exports = { login, register }