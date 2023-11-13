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

//Account
router.post('/register', accountController.register);
router.post('/login', accountController.login);
router.get('/user', accountController.getUser)
router.post('/user/tea/counter/:direction', accountController.changeCounter);
router.post('/user/tea/brew', accountController.addTea);
router.post('/user/tea/time', accountController.addBrewTime);
router.post('/user/tea/favourite', accountController.markAsFavourite);

module.exports = router;