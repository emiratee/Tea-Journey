const models = require('../models/teaModels.js');

async function getTea(ctx) {
    try {
        const result = await models.getTea()
        ctx.status = 200;
        ctx.body = result;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
        console.log(error);
    }
}

async function postTea(ctx) {
    try {
        if(!ctx.request.body) return new Error();
        const result = await models.postTea(ctx.request.body)
        ctx.status = 201;
        ctx.body = result;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
        console.log(error);
    }
}

async function changeCounter(ctx) {
    try {
        if(!ctx.request.body) return new Error();
        const { direction, token } = ctx.params;
        const result = await models.changeCounter(direction, token);
        ctx.status = 200;
        ctx.body = { status: 200, result };
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
        console.log(error);
    }
}

async function brewTea(ctx) {
    try {
        const { name } = ctx.request.body;
        const { token } = ctx.params;
        const result = await models.brewTea(name, token);
        ctx.status = 200;
        ctx.body = { status: 200, result };
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
        console.log(error);
    }
}

module.exports = { getTea, postTea, changeCounter, brewTea }