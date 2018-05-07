const userModel = require('../lib/mysql.js')
const moment = require('moment')

module.exports = {
    async route( ctx ) {
      let session = ctx.session
      let q = ctx.query.q
      let article,userList  
      
      await userModel.searchStrArticle(q)
      .then(async (result) => {

        await result.forEach(async (element) => {
                
            element.content = element.content.substr(0,190)+'...'
            element.unixtime = moment(element.unixtime*1000).format('MM-DD HH:mm:ss')
            await userModel.findDataByUser(element.uid)
                .then(async (user) => {
                    element.users = user[0]
                })

        })

        article = result
      })


      await userModel.searchNameUsers(q)
      .then(async (result) => {
        userList = result
      })
      
      userList.length = 3

      await userModel.findDataByUid(ctx.session.id)
        .then(async (result) => {
        users = result[0]
        })
        
      await ctx.render('search',{
        session,
        article,
        users,
        userList
      })
    }
}