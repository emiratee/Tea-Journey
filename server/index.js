const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const cors = require('@koa/cors');
const router = require('./router');

const app = new Koa();

app.use(cors());
app.use(bodyparser());
app.use(router.routes());

app.listen(3001, () => {
    console.log('Server running on Port 3001');
});