const router = require('koa-router')()
const settings = require('../controllers/settings')

const routers = router.get('/settings', settings.route)
.post('/settings/avatar', settings.avatar)
.post('/settings/basic', settings.basic)
module.exports = routers