const router = require('koa-router')()
const register = require('../controllers/register')

const routers = router.get('/register', register.route)
.post('/register', register.register)
module.exports = routers