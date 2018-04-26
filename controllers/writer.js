const userModel = require('../lib/mysql.js')
const moment = require('moment')
module.exports = {
    async route( ctx ) {
        let uid = ctx.session.id
        let menuId = ctx.params.menuId
        let articleId = ctx.params.articleId
        await userModel.userFindDataByWriter(uid)
        .then(async (result) => {
            let writer_menu = result
            await userModel.findDataByWriterArticleList(uid,menuId)
            .then(async (result) => {
                let list = result
                await ctx.render('writer',{
                    writer_menu : writer_menu?writer_menu:[],
                    writer_menu_article_list : list?list:[]
                })
            })
        })
        //ctx.response.redirect('/writer/'+result[0].id+'/'+list[0].id);
    },
    async anthology_add( ctx ) {
        // let session_id = ctx.request.header.cookie.split('=')[1]
        let anthology = ctx.request.body.anthology
        let uid = ctx.session.id
        
        await userModel.findDataByWriterMenuName(uid, anthology)
        .then(async (result) => {
            if (result.length) {
                // 用户存在
                ctx.body = {
                    code: 1,
                    msg:'文集名已经存在'
                }
                return
            }
            await userModel.createWriterMenu([uid, anthology])
                  .then(res=>{
                    ctx.body = {
                        code: 0,
                        msg:'插入成功'
                    }
                  }) 
        })
    },
    async article_create (ctx) {
        let time = moment().format('YYYY-MM-DD HH:mm:ss')
        let unixtime = moment().format('X')
        let uid = ctx.session.id
        await userModel.createWriterArticle([ctx.session.id, time, '', time, unixtime])
            .then(res=>{
                ctx.body = {
                    code: 0,
                    msg:'插入成功',
                    data:{
                        addTime: time
                    }
                }
            }) 
        
    }
}