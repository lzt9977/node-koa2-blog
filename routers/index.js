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
const users = require('./users')
const settings = require('./settings')
const search = require('./search')

router.use(home.routes())
router.use(register.routes())
router.use(login.routes())
router.use(writer.routes())
router.use(error.routes())
router.use(article.routes())
router.use(users.routes())
router.use(settings.routes())
router.use(search.routes())

module.exports = router
