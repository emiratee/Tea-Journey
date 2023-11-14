const Router = require('koa-router');
const teaController = require('./controllers/teaController.js');
const funfactController = require('./controllers/funfactController.js');
const accountController = require('./controllers/accountController.js');
const router = new Router();

// Tea
router.get('/tea', teaController.getTea);
router.post('/tea', teaController.postTea);

//Funfacts
router.get('/funfact', funfactController.getFunfact);

//User
//Account
router.post('/user/account/register', accountController.register);
router.post('/user/account/login', accountController.login);
router.get('/user/account', accountController.getUser)
router.post('/user/account/update', accountController.updateUser);
//Tea
router.post('/user/tea/counter/:direction', accountController.changeCounter);
router.post('/user/tea/brew', accountController.addTea);
router.post('/user/tea/time', accountController.addBrewTime);
router.post('/user/tea/favourite', accountController.markAsFavourite);
router.post('/user/tea/rate', accountController.rateTea);
//Journey
router.post('/user/journey/reset', accountController.resetJourney);

module.exports = router;