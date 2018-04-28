const router = require('koa-router')()
const writer = require('../controllers/writer')

const routers = router.get('/writer', writer.route)
.get('/writer/:menuId', writer.route)
.get('/writer/:menuId/:articleId', writer.route)
.post('/writer/anthology/add', writer.anthology_add)
.post('/writer/article/create', writer.article_create)
.post('/writer/article/update', writer.article_update)


module.exports = routers