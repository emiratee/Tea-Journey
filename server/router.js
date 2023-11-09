const Router = require('koa-router');
const teaController = require('./controllers/teaController.js');
const funfactController = require('./controllers/funfactController.js');
const router = new Router();

// Tea
router.get('/tea', teaController.getTea);
router.post('/tea', teaController.postTea);

//Funfacts
router.get('/funfact', funfactController.getFunfact);

module.exports = router;