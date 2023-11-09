const models = require('../models/funfactModels.js');

async function getFunfact(ctx) {
    try {
        const result = await models.getFunfact()
        ctx.status = 200;
        ctx.body = result;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
        console.log(error);
    }
}

module.exports = { getFunfact }