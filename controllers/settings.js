const userModel = require('../lib/mysql.js')
const isSign = require('../middlewares/isSign.js').isSign

module.exports = {
  async route( ctx ) {
    let session = ctx.session
    let uid = ctx.session.id
    let users

    let isLogin = await isSign( ctx )
    if(isLogin){
      await userModel.findDataByUid(uid)
      .then(async (result) => {
        users = result[0]
      })

      await ctx.render('settings',{
        session,
        users
      })
    }
    
  },
  async avatar (ctx) {
    let avatar = ctx.request.body.avatar
    let session = ctx.session
    
    await userModel.updateAvatar([ avatar , session.id ])
      .then(async (result) => {
        ctx.session.avatar = avatar
        ctx.body = {
          code: 0,
          msg: '头像上传成功'
        }
      })
  },
  async basic (ctx) {
    let session = ctx.session
    let basic = {
      name: ctx.request.body.nickname,
      email: ctx.request.body.email,
      sex: ctx.request.body.sex,
      about: ctx.request.body.about,
      website: ctx.request.body.website,
    }

    await userModel.updateUsers([ basic.name , basic.email, basic.sex, basic.about, basic.website, session.id ])
      .then(async (result) => {
        ctx.body = {
          code: 0,
          msg: '个人资料更改成功'
        }
      })
  }
}