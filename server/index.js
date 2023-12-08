const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const cors = require('@koa/cors');
const router = require('./router');
const app = new Koa();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyparser());
app.use(router.routes());
app.use(async (ctx, next) => {
    await next();
    if (ctx.status === 404) {
        ctx.status = 418;
        ctx.body = "Error 418: I'm a teapot (actually 404 but this is way cooler)"
    }
})

app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
});