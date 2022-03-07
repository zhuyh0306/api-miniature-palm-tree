const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const User = require('../models/user');
const { secret } = require('../config');
const { sendMsg } = require('../utils/sendMessage');
const ossClient = require('../utils/saveOss');
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
    // await sendMsg();
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
  /*
  /*upload
  */
  async upload(ctx) {
    console.log(',upload');
    const files = ctx.request.files.files; // 获取上传文件

    // 创建可读流
    const stream = fs.createReadStream(files.path);
    // yuny 为文件，意思是将文件存放到yuny 文件夹下
    console.log(stream);
    let result = null;
    try {
      result = await ossClient.putStream('/avatar/' + files.name, stream);
    } catch (err) {
      throw new Error(err);
    }

    console.log(result);
    const reqBody = {
      avatar: result.url
    };
    const user = await User.findByIdAndUpdate(ctx.request.body._id, reqBody);
    ctx.body = user;
  }
}
module.exports = new UserCtl();
