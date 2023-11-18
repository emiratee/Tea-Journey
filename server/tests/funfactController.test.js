var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    it('should return funfacts', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the behavior of fetchFunfactFromModel
        const mockFunfacts = ['Funfact 1', 'Funfact 2'];
        fetchFunfactFromModel.mockResolvedValue(mockFunfacts);
        // Set up a test route
        app.use((ctx) => __awaiter(void 0, void 0, void 0, function* () {
            yield getFunfact(ctx);
        }));
        // Send a GET request to the test route
        const response = yield request(app.callback()).get('/funfact');
        // Check if the response status is 200
        expect(response.status).toBe(200);
        // Check if the response body matches the mock funfacts
        expect(response.body).toEqual(mockFunfacts);
    }));
    it('should handle errors', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock an error from fetchFunfactFromModel
        const errorMessage = 'Test error message';
        fetchFunfactFromModel.mockRejectedValue(new Error(errorMessage));
        // Set up a test route
        app.use((ctx) => __awaiter(void 0, void 0, void 0, function* () {
            yield getFunfact(ctx);
        }));
        // Send a GET request to the test route
        const response = yield request(app.callback()).get('/funfact');
        // Check if the response status is 500
        expect(response.status).toBe(500);
        // Check if the response body contains the error message
        expect(response.body).toEqual({ error: errorMessage });
    }));
});
