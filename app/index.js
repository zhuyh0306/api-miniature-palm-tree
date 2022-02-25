const Koa = require('koa');

const app = new Koa();
const error = require('koa-json-error');
const bodyparser = require('koa-bodyparser');
const parameter = require('koa-parameter');
const momgoose = require('mongoose');
const installRoute = require('./routes');
const { dbUrl, port } = require('./config');

console.log(dbUrl);
momgoose.connect(dbUrl, () => { console.log('连接成功'); });
momgoose.connection.on('error', (err) => {
  console.log(err, '------------');
});

app.use(error({
  postFormat: (e, { stack, ...rest }) => (process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }),
}));
app.use(bodyparser());
app.use(parameter(app));
installRoute(app);
app.listen(port);
