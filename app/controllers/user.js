class UserCtl {
  create(ctx){
    ctx.verifyParams({
      name:{
        type:'string',
        required:true
      }
    })
    ctx.body = '注册成功'
  }
  find(ctx){
    if(ctx.params.id==='2'){
      ctx.throw(412,'412错误')
    }
    ctx.body = '获取用户信息'
  }  
  findList(ctx){
    ctx.body = '获取用户列表'
  }  
}
module.exports = new UserCtl()