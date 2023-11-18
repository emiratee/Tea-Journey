import { getTea, postTea } from '../controllers/teaController';
import * as teaModels from '../models/teaModels';

// Mock the teaModels module
jest.mock('../models/teaModels', () => ({
  getTea: jest.fn(),
  postTea: jest.fn(),
}));

// Helper function to create a mock Koa context
const createMockCtx = (body?: any) => ({
  request: {
    body: body || null,
  },
  status: 0,
  body: null,
});

describe('teaController', () => {
  describe('getTea', () => {
    it('should set ctx.body with tea data and status 200 on success', async () => {
      const mockTeaData = [{ name: 'Black Tea' }, { name: 'Milk Oolong' }];
      (teaModels.getTea as jest.Mock).mockResolvedValue(mockTeaData);

      const ctx = createMockCtx();
      await getTea(ctx as any);

      expect(ctx.status).toBe(200);
      expect(ctx.body).toEqual(mockTeaData);
    });

    it('should set ctx.status to 500 on failure', async () => {
      (teaModels.getTea as jest.Mock).mockRejectedValue(new Error('Error'));

      const ctx = createMockCtx();
      await getTea(ctx as any);

      expect(ctx.status).toBe(500);
      expect(ctx.body).toHaveProperty('error');
    });
  });
});
