var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getTea } from '../controllers/teaController';
import * as teaModels from '../models/teaModels';
// Mock the teaModels module
jest.mock('../models/teaModels', () => ({
    getTea: jest.fn(),
    postTea: jest.fn(),
}));
// Helper function to create a mock Koa context
const createMockCtx = (body) => ({
    request: {
        body: body || null,
    },
    status: 0,
    body: null,
});
describe('teaController', () => {
    describe('getTea', () => {
        it('should set ctx.body with tea data and status 200 on success', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockTeaData = [{ name: 'Black Tea' }, { name: 'Milk Oolong' }];
            teaModels.getTea.mockResolvedValue(mockTeaData);
            const ctx = createMockCtx();
            yield getTea(ctx);
            expect(ctx.status).toBe(200);
            expect(ctx.body).toEqual(mockTeaData);
        }));
        it('should set ctx.status to 500 on failure', () => __awaiter(void 0, void 0, void 0, function* () {
            teaModels.getTea.mockRejectedValue(new Error('Error'));
            const ctx = createMockCtx();
            yield getTea(ctx);
            expect(ctx.status).toBe(500);
            expect(ctx.body).toHaveProperty('error');
        }));
    });
});
