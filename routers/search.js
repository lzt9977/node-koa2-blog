const router = require('koa-router')()
const search = require('../controllers/search')

const routers = router.get('/search', search.route)
module.exports = routers