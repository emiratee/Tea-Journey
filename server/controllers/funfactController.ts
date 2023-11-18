import { Context } from 'koa';
import { getFunfact as fetchFunfactFromModel } from '../models/funfactModels';

async function getFunfact(ctx: Context): Promise<void> {
  try {
    const result = await fetchFunfactFromModel();
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    const errorMessage = (error as Error).message;
    ctx.status = 500;
    ctx.body = { error: errorMessage };
    console.log('Error in getFunFact: ', errorMessage);
  }
}

export { getFunfact };
