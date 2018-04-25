const router = require('koa-router')()
const writer = require('../controllers/writer')

const routers = router.get('/writer', writer.route)
module.exports = routers