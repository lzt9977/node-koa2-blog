module.exports = {
  async route( ctx ) {
    let url = ctx.session.redirect_wieter_url
    await ctx.render('error',{
      url: url
    })
  }
}