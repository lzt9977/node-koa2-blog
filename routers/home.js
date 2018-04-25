const router = require('koa-router')()
const home = require('../controllers/home')

const routers = router.get('/', home.route)
module.exports = routers