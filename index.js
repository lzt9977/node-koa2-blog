const path = require('path')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const router = require('koa-router')
const session = require('koa-session-minimal')
const MysqlStore = require('koa-mysql-session')
const views = require('koa-views')
const koaStatic = require('koa-static')

const config = require('./config/default.js')
const routers = require('./routers/index')

const app = new Koa()


// session存储配置
const sessionMysqlConfig= {
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    host: config.database.HOST,
    charset:'utf8'
}

//存放sessionId的cookie配置
let cookie = {
    maxAge: '',// cookie有效时长
    expires: '',// cookie失效时间
    path: '', // 写cookie所在的路径
    domain: '', // 写cookie所在的域名
    httpOnly: '', // 是否只用于http请求中获取
    overwrite: '',  // 是否允许重写
    secure: '',
    sameSite: '',
    signed: '',
}

// 配置session中间件
app.use(session({
    key: 'SESSION_ID',
    store: new MysqlStore(sessionMysqlConfig),
    cookie: {
        maxage:24*60*60*1000
    }
}))


// 配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
}))


// 配置静态资源加载中间件
app.use(koaStatic(
    path.join(__dirname , './public')
))

// 配置ctx.body解析中间件
app.use(bodyParser())

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())


app.listen(config.port)
console.log(`listening on port ${config.port}`)
