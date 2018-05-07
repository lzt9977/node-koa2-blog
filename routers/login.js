const router = require('koa-router')()
const login = require('../controllers/login')

const routers = router.get('/login', login.route)
.get('/sign_out', login.sign_out)
.post('/login', login.login)
module.exports = routers