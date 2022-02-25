const Router = require('koa-router');

const router = new Router({ prefix: '/user' });
const { find, findList, create } = require('../controllers/user');

router.get('/', findList);
router.post('/', create);
router.get('/:id', find);
module.exports = router;
