import request from 'supertest';
import Koa from 'koa';
import { getFunfact as fetchFunfactFromModel } from '../models/funfactModels';
import { getFunfact } from '../controllers/funfactController';

const app = new Koa();

jest.mock('../models/funfactModels', () => ({
  getFunfact: jest.fn(),
}));

describe('Getting some funfacts', () => {
  it('should return funfacts', async () => {
    const mockFunfacts = ['Funfact 1', 'Funfact 2'];
    (fetchFunfactFromModel as jest.Mock).mockResolvedValue(mockFunfacts);

    app.use(async (ctx) => {
      await getFunfact(ctx);
    });

    const response = await request(app.callback()).get('/funfact');

    expect(response.status).toBe(200);

    expect(response.body).toEqual(mockFunfacts);
  });

  it('should handle errors', async () => {
    const errorMessage = 'Test error message';
    (fetchFunfactFromModel as jest.Mock).mockRejectedValue(
      new Error(errorMessage)
    );

    app.use(async (ctx) => {
      await getFunfact(ctx);
    });

    const response = await request(app.callback()).get('/funfact');

    expect(response.status).toBe(500);

    expect(response.body).toEqual({ error: errorMessage });
  });
});
