const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/user');
const { secret } = require('../config');
class UserCtl {
  async create(ctx) {
    ctx.verifyParams({
      user: {
        type: 'string',
        required: true
      },
      password: {
        type: 'string',
        required: true
      }
    });
    const { user } = ctx.request.body;
    const isRepeat = await User.findOne({ user });
    if (isRepeat) {
      ctx.throw(409, '用户已存在');
    }
    const userInfo = await new User(ctx.request.body).save();
    ctx.body = userInfo;
  }
  async updateUserInfo(ctx) {
    ctx.verifyParams({
      user: {
        type: 'string',
        required: false
      },
      password: {
        type: 'string',
        required: false
      }
    });
    console.log(ctx.request.header);
    const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body);
    ctx.body = user;
  }
  async delete(ctx) {
    const user = await User.findByIdAndRemove(ctx.params.id);
    if (!user) {
      ctx.throw(404, '用户不存在');
    }
    ctx.status = 204;
  }
  async find(ctx) {
    const user = await User.findById(ctx.params.id);
    if (!user) ctx.throw(404, '用户不存在');
    ctx.body = user;
  }

  async findList(ctx) {
    ctx.body = await User.find();
  }
  async login(ctx) {
    ctx.verifyParams({
      user: {
        type: 'string',
        required: true
      },
      password: {
        type: 'string',
        required: true
      }
    });
    const userInfo = await User.findOne(ctx.request.body);
    if (!userInfo) ctx.throw(401, '用户名或密码不正确');
    const { _id, user } = userInfo;
    //expiresIn: '1d'过期事件一天
    const token = jsonwebtoken.sign({ _id, name: user }, secret, {
      expiresIn: '1d'
    });
    ctx.success(
      {
        token: token
      },
      '注册成功'
    );
  }
}
module.exports = new UserCtl();
