import Koa from 'koa';
import bodyparser from 'koa-bodyparser';
import cors from '@koa/cors';
import router from './router';

const PORT = 3001;

const app = new Koa();

app.use(cors());
app.use(bodyparser());
app.use(router.routes());
app.use(async (ctx: Koa.Context, next: () => Promise<void>) => {
  await next();
  if (ctx.status === 404) {
    ctx.status = 418;
    ctx.body = "Error 418: I'm a teapot (actually 404 but this is way cooler)";
  }
});

// Port is not hardcoded anymore
app.listen(PORT, () => {
  console.log(`Server running on Port: ${PORT} ✅`);
});
