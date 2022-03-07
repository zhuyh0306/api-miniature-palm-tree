const Router = require('koa-router');
const jwt = require('koa-jwt');
const jsonwebtoken = require('jsonwebtoken');
const { secret } = require('../config');
const router = new Router({ prefix: '/api/user' });
const auth = jwt({ secret });
// const auth = async (ctx, next) => {
//   const { authorization = '' } = ctx.request.header;
//   console.log(authorization);
//   const token = authorization.replace('Bearer ', '');

//   try {
//     const user = jsonwebtoken.verify(token, serect);
//     ctx.state.use = user;
//   } catch (err) {
//     console.log(err);
//     ctx.throw('401');
//   }
//   await next();
// };
const {
  find,
  findList,
  create,
  updateUserInfo,
  delete: del,
  login,
  upload
} = require('../controllers/user');

router.get('/', findList);
router.post('/', create);
router.get('/:id', find);
router.patch('/:id', auth, updateUserInfo);
router.delete('/:id', del);
router.post('/login', login);
router.post('/upload', upload);
module.exports = router;
