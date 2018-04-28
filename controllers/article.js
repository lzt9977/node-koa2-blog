const userModel = require('../lib/mysql.js')
var md = require('markdown-it')();
module.exports = {
  async route( ctx ) {
    // 查询首页所需要的数据
    let uid = ctx.session.id
    let articleId = ctx.params.articleId
    
    await userModel.findDataByArticleId( uid, articleId )
    .then(async (result) => {
        result = result[0]
        await ctx.render('article',{
            content: md.render(result.content),
            title: result.title
        })
    })
    
  }
}