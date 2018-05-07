module.exports ={
    // 是否登录
    isSign: (ctx) => {
      if (!ctx.session.id) {     
        ctx.response.redirect('/login')
        return false
      }
      return true
    }
}
  