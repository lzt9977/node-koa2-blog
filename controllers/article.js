const userModel = require('../lib/mysql.js')
var md = require('markdown-it')();
module.exports = {
  async route( ctx ) {
    // 查询首页所需要的数据
    let articleId = ctx.params.articleId
    let session = ctx.session
    let author
    await userModel.findDataByArticleId( articleId )
    .then(async (result) => {
        result = result[0]

        await userModel.findDataByUid(result.uid)
        .then(async (list) => {
            author = list[0]
        })
        await ctx.render('article',{
            content: md.render(result.content),
            title: result.title,
            session,
            author
        })
    })
    
  }
}