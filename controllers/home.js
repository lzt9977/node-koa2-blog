const userModel = require('../lib/mysql.js')
const moment = require('moment')
const md = require('markdown-it')();
module.exports = {
  async route( ctx ) {
    // 查询首页所需要的数据
    let session = ctx.session
    let uid = ctx.session.id
    let nickname = ctx.session.nickname
    let articleList
    
    await userModel.findDataArticle()
    .then(async (result) => {
        await result.forEach(async (element) => {
                
                let regexp = /!\[.*?]\((.*?)\)/g;
                let cover = null
                let number = 1
                while((aa=regexp.exec(element.content))!==null){
                  if(number==1){
                    cover = aa[1]
                  }
                  number++
                }

                // if(!cover){
                //   let random = Math.floor(Math.random()*9)+1
                //   cover = './images/cover'+random+'.jpg'
                // }

                element.content = element.content.substr(0,90)+'...'
                element.cover = cover
                element.unixtime = moment(element.unixtime*1000).format('MM-DD HH:mm:ss')
                await userModel.findDataByUser(element.uid)
                  .then(async (user) => {
                    element.users = user[0]
                  })
              });
              articleList = result
    })
    await ctx.render('home',{
      articleList,
      session
    })
  }
}