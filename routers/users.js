const router = require('koa-router')()
const users = require('../controllers/users')

const routers = router.get('/users/:usersId', users.route)
module.exports = routers