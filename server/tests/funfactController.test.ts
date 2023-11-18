import request from 'supertest';
import Koa from 'koa';
import { getFunfact as fetchFunfactFromModel } from '../models/funfactModels';
import { getFunfact } from '../controllers/funfactController';

// Create a mock Koa app for testing
const app = new Koa();

// Mock the fetchFunfactFromModel function
jest.mock('../models/funfactModels', () => ({
  getFunfact: jest.fn(),
}));

describe('Getting some funfacts', () => {
  it('should return funfacts', async () => {
    // Mock the behavior of fetchFunfactFromModel
    const mockFunfacts = ['Funfact 1', 'Funfact 2'];
    (fetchFunfactFromModel as jest.Mock).mockResolvedValue(mockFunfacts);

    // Set up a test route
    app.use(async (ctx) => {
      await getFunfact(ctx);
    });

    // Send a GET request to the test route
    const response = await request(app.callback()).get('/funfact');

    // Check if the response status is 200
    expect(response.status).toBe(200);

    // Check if the response body matches the mock funfacts
    expect(response.body).toEqual(mockFunfacts);
  });

  it('should handle errors', async () => {
    // Mock an error from fetchFunfactFromModel
    const errorMessage = 'Test error message';
    (fetchFunfactFromModel as jest.Mock).mockRejectedValue(
      new Error(errorMessage)
    );

    // Set up a test route
    app.use(async (ctx) => {
      await getFunfact(ctx);
    });

    // Send a GET request to the test route
    const response = await request(app.callback()).get('/funfact');

    // Check if the response status is 500
    expect(response.status).toBe(500);

    // Check if the response body contains the error message
    expect(response.body).toEqual({ error: errorMessage });
  });
});
