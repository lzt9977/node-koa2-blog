const userModel = require('../lib/mysql.js')
const moment = require('moment')
module.exports = {
    async route( ctx ) {
        //文集列表  文集下的文章列表  具体的文章标题  文章内容  文集id
        let writer_menu,list,articleTitle,articleContent
        //用户id
        let uid = ctx.session.id
        //文集id
        let menuId = ctx.params.menuId
        //文章id
        let articleId = ctx.params.articleId

        //查询这个id下的所有文集栏目
        await userModel.userFindDataByWriter(uid)
        .then(async (result) => {
            writer_menu = result
            //查询文集下面的所有文章
            await userModel.findDataByWriterArticleList(uid,menuId)
            .then(async (result) => {
                list = result
                list.forEach(i => {
                    if(i.id == articleId){
                        articleTitle = i.title
                        articleContent = i.content
                    }
                });
            })
        }).then(async (result) => {
            await userModel.findDataByWriterMenu(uid,menuId)
            .then(async (result) => {
                if(result.length<1){
                    ctx.response.redirect('/writer/'+writer_menu[0].id)
                    console.log('重定向1')
                }
            })

            // await userModel.findDataByWriterArticleList(uid,menuId)
            // .then(async (result) => {
            //     if(!articleId && result.length>1){
            //         ctx.response.redirect('/writer/'+writer_menu[0].id+'/'+result[0].id)
            //         console.log('重定向2')
            //     }
            // })

            // await userModel.findDataByWriterArticle(uid,menuId,articleId)
            // .then(async (result) => {
            //     if(menuId && result.length==0){
            //         ctx.session.redirect_wieter_url = ctx.host+ctx.url
            //         ctx.response.redirect('/error')
            //     }
            // })
            
            await ctx.render('writer',{
                writer_id: menuId,
                writer_menu : writer_menu?writer_menu:[],
                writer_menu_article_list : list?list:[],
                article_id : articleId?articleId:-1,
                article_title : articleTitle?articleTitle:'',
                article_content : articleContent?articleContent:'',
            })
        })


        
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
        let writer_id = ctx.request.body.writer_id
        await userModel.createWriterArticle([ctx.session.id,writer_id, time, '', time, unixtime])
            .then(async res=>{
                await userModel.findDataByWriterArticleList(uid,writer_id)
                .then(async (result) => {
                    ctx.body = {
                        code: 0,
                        msg:'插入成功',
                        data:{
                            addTime: time,
                            article_id: result[0].id
                        }
                    }
                })

            }) 
    },
    async article_update (ctx) {
        let uid = ctx.session.id
        let writer_id = ctx.request.body.writer_id
        let article_id = ctx.request.body.article_id
        let title = ctx.request.body.title
        let content = ctx.request.body.content
        
        await userModel.updateWriterArticle([title, content, uid, writer_id, article_id])
            .then(res=>{
                ctx.body = {
                    code: 0,
                    msg:'更新成功',
                    data:{
                        
                    }
                }
            }) 
        
    }
}