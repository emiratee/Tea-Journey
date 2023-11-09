const Router = require('koa-router');
const { getTopics, postTopic, deleteTopic, upvoteTopic, downvoteTopic } = require('./controllers/topicController');
const router = new Router();

router.get('/topics', getTopics);
router.post('/topics', postTopic);
router.delete('/topics/:id', deleteTopic);
router.put('/topics/:id/up', upvoteTopic)
router.put('/topics/:id/down', downvoteTopic)

module.exports = router;