const router = require('koa-router')()
const login = require('../controllers/login')

const routers = router.get('/login', login.route)
.post('/login', login.login)
module.exports = routers