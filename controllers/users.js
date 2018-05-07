const userModel = require('../lib/mysql.js')
const moment = require('moment')

module.exports = {
    async route( ctx ) {
      let session = ctx.session
      
      let usersId = ctx.params.usersId  
      let articleList
      
      await userModel.findDataByUser( usersId )
        .then(async (result) => {
            result = result[0]
            await userModel.findDataByArticle(result.id)
            .then(async (list) => {
                list.forEach((i,v) => {
                    let regexp = /!\[.*?]\((.*?)\)/g;
                    let cover = null
                    let number = 1
                    while((aa=regexp.exec(i.content))!==null){
                    if(number==1){
                        cover = aa[1]
                    }
                    number++
                    }

                    i.content = i.content.substr(0,90)+'...'
                    i.cover = cover
                    i.unixtime = moment(i.unixtime*1000).format('MM-DD HH:mm:ss')
                    i.users = result
                });

                articleList = list
            })
            await userModel.findDataByUid(usersId)
                .then(async (result) => {
                    users = result[0]
                })
            await ctx.render('users',{
                session,
                result,
                articleList,
                users
            })
        })
      
    }
}