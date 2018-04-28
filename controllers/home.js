const userModel = require('../lib/mysql.js')
var md = require('markdown-it')();
module.exports = {
  async route( ctx ) {
    // 查询首页所需要的数据
    let uid = ctx.session.id
    let list
    
    await userModel.findDataArticle()
    .then(async (result) => {
        result.forEach(element => {
          element.content = md.render(element.content)
        });
        list = result
    })
    await ctx.render('home',{
      list
    })
  }
}