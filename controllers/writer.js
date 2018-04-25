module.exports = {
    async route( ctx ) {
      let a = '123'  
      await ctx.render('writer',{
          a
      })
    }
}