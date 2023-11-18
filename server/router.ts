import Router from 'koa-router';
import * as teaController from './controllers/teaController';
import * as funfactController from './controllers/funfactController';
import * as accountController from './controllers/accountController'; //has to be converted in TS

const router = new Router();

// Tea
router.get('/tea', teaController.getTea);
router.post('/tea', teaController.postTea);

//Funfacts
router.get('/funfact', funfactController.getFunfact);

//Account
router.post('/user/account/register', accountController.register);
router.post('/user/account/login', accountController.login);
router.get('/user/account', accountController.getUser);
router.post('/user/account/update', accountController.updateUser);

//Tea
router.post('/user/tea/counter/:direction', accountController.changeCounter);
router.post('/user/tea/brew', accountController.addTea);
router.post('/user/tea/time', accountController.addBrewTime);
router.post('/user/tea/favourite', accountController.markAsFavourite);
router.post('/user/tea/rate', accountController.rateTea);
//Journey
router.post('/user/journey/reset', accountController.resetJourney);

export default router;
