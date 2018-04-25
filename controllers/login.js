const userModel = require('../lib/mysql.js')
const md5 = require('md5')

module.exports = {
  async route( ctx ) {
    await ctx.render('login',{
      session: ctx.session.user
    })
  },
  async login( ctx ) {
    let user = {
        name: ctx.request.body.nickname,
        pass: ctx.request.body.password
    }
    await userModel.findDataByNameAndMobile(user.name)
      .then(async (result) => {
        if(result.length){
          if(md5(user.pass) == result[0].password){
            ctx.session.user = result[0].nickname
            ctx.body = {
              code: 0,
              msg:'登录成功'
            }
          }else{
            ctx.body = {
              code: 2,
              msg:'密码错误'
            }
          }
        }else{
          ctx.body = {
            code: 1,
            msg:'没有该用户'
          }
        }
      })
  }
}