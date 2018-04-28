const router = require('koa-router')()
const error = require('../controllers/error')

const routers = router.get('/error', error.route)
module.exports = routers