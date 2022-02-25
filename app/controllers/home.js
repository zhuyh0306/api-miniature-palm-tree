class HomeCtl {
  index(ctx) {
    ctx.body = '这是home首页';
  }
}
module.exports = new HomeCtl();
