/**
 * 整合所有子路由
 */

const router = require('koa-router')()

const home = require('./home')
const register = require('./register')
const login = require('./login')
const writer = require('./writer')
const error = require('./error')
const article = require('./article')

router.use(home.routes())
router.use(register.routes())
router.use(login.routes())
router.use(writer.routes())
router.use(error.routes())
router.use(article.routes())

module.exports = router
