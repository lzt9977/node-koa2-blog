const router = require('koa-router')()
const article = require('../controllers/article')

const routers = router.get('/article/:articleId', article.route)
module.exports = routers