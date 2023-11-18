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
import router from '../router';
const app = new Koa().use(router.routes());
describe('Tea Routes', () => {
    it('should get tea list', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app.callback()).get('/tea');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    }));
    it('should create a new tea', () => __awaiter(void 0, void 0, void 0, function* () {
        const newTea = {
            name: 'Green Tea',
            slug: 'green-tea',
            altnames: 'Chinese Green Tea',
            origin: 'China',
            type: 'Green',
            temperature: '80-85°C',
            brewTime: '3',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Tea_leaves_steeping_in_a_zhong_%C4%8Daj_05.jpg/1024px-Tea_leaves_steeping_in_a_zhong_%C4%8Daj_05.jpg',
            caffeine: '20-30mg',
            sources: ['https://en.wikipedia.org/wiki/Green_tea'],
            description: 'Green tea is a type of tea that is made from Camellia sinensis leaves and buds that have not undergone the same withering and oxidation process used to make oolong teas and black teas.',
            colorDescription: 'Pale green',
            tasteDescription: 'Grassy, fresh, slightly bitter',
        };
        const response = yield request(app.callback()).post('/tea').send(newTea);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('name', newTea.name);
        expect(response.body).toHaveProperty('type', newTea.type);
        expect(response.body).toHaveProperty('_id');
    }));
});
