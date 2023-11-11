const Router = require('koa-router');
const teaController = require('./controllers/teaController.js');
const funfactController = require('./controllers/funfactController.js');
const accountController = require('./controllers/accountController.js');
const router = new Router();

// Tea
router.get('/tea', teaController.getTea);
router.post('/tea', teaController.postTea);
router.post('/tea/counter/:direction/:token', teaController.changeCounter);
router.post('/tea/brew/:token', teaController.brewTea);

//Funfacts
router.get('/funfact', funfactController.getFunfact);

//Account
router.post('/register', accountController.register);
router.post('/login', accountController.login);
router.get('/user/:token', accountController.getUser)
router.post('/user/tea/time/:token', accountController.brewTime);

module.exports = router;