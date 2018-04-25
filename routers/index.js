/**
 * 整合所有子路由
 */

const router = require('koa-router')()

const home = require('./home')
const register = require('./register')
const login = require('./login')
const writer = require('./writer')

router.use(home.routes())
router.use(register.routes())
router.use(login.routes())
router.use(writer.routes())

module.exports = router
