const userModel = require('../lib/mysql.js')
const md5 = require('md5')
const moment = require('moment')
const fs = require('fs')

module.exports = {
  async route( ctx ) {
    await ctx.render('register')
  },
  async register( ctx ) {
    let user = {
        name: ctx.request.body.nickname,
        mobile: ctx.request.body.mobile,
        pass: ctx.request.body.password
    }
    await userModel.findDataByName(user.name)
        .then(async (result) => {
            if (result.length) {
                // 用户存在
                ctx.body = {
                    code: 1,
                    msg:'用户已经存在'
                }
            } else if (user.name === '' && user.mobile ==='' && user.pass === '') {
                ctx.body = {
                    code: 2,
                    msg:'必填项不能为空'
                };
            } else { 
              await userModel.insertData([user.name, md5(user.pass), user.mobile, moment().format('YYYY-MM-DD HH:mm:ss'), moment().format('X'),'//cdn2.jianshu.io/assets/default_avatar/15-a7ac401939dd4df837e3bbf82abaa2a8.jpg'])
                  .then(res=>{
                    ctx.body = {
                      code: 0,
                      msg:'注册成功'
                    }
                    console.log(res)
                  })
                  
                  await userModel.findDataByName(user.name)
                    .then(async (result) => {
                        await userModel.createByWriterArticleMenu([result[0].id,'日记本'])
                        .then(res=>{
                            
                        })
                        await userModel.createByWriterArticleMenu([result[0].id,'随笔'])
                        .then(res=>{
                            
                        })
                    })
            }
        })
  }
}