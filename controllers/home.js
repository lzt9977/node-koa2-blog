const userModel = require('../lib/mysql.js')
module.exports = {
  async route( ctx ) {
    // 查询首页所需要的数据
    let title = 'lzt'
    await ctx.render('home',{
      title
    })
  }
}