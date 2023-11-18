import { Context } from 'koa';
import * as teaModels from '../models/teaModels';
import { Tea } from '../../interfaces/Tea';

async function getTea(ctx: Context): Promise<void> {
  try {
    const result = await teaModels.getTea();
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    const errorMessage = (error as Error).message;
    ctx.status = 500;
    ctx.body = { error: errorMessage };
    console.log('Error in getTea:', errorMessage);
  }
}

async function postTea(ctx: Context): Promise<void> {
  try {
    const teaData: Tea = ctx.request.body as Tea;
    if (!teaData || Object.keys(teaData).length === 0) {
      // if teadata empty or falsy (null, undefined etc) send error to client
      ctx.status = 400;
      ctx.body = { error: 'Bad Request: No data provided' };
      return;
    }
    const result = await teaModels.postTea(teaData);
    ctx.status = 201;
    ctx.body = result;
  } catch (error) {
    const errorMessage = (error as Error).message;
    ctx.status = 500;
    ctx.body = { error: errorMessage };
    console.log('Error in postTea:', errorMessage);
  }
}

export { getTea, postTea };
