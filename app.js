const Koa = require('koa')
const app = new Koa()
// const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const Router = require('koa-router')
const router = new Router()
const mongoose = require('mongoose')
// const jwt = require('koa-jwt')
// const fs = require('fs')
// const path = require('path')

const main = require('./main')
const result = main()

const JWTUtil = require('./utils/jwt')
const { sendStringify, getToken, koajwtVerifyToken } = require('./utils/index')

mongoose.connect('mongodb://localhost/blog');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongo connect success!')
  // 存docsType
  // require('./utils/create')
  // require('./models/articles').createArticle()
});

app.use(async (ctx, next) => {
  ctx.res.setHeader('Access-Control-Allow-Origin', '*')
  // 设置响应头
  ctx.res.setHeader(
    'Access-Control-Allow-Headers',
    'x-requested-with,Content-Type,token,Authorization'
  )
  // 处理options请求
  if (ctx.method === 'OPTIONS') {
    ctx.body = ''
    ctx.status = 200
  } else {
    await next()
  }
})

// token 验证
app.use(koajwtVerifyToken({ key: 'data' }).unless({ path: [/\/login/]}))

app.use(async function (ctx, next) {
  console.log(ctx.state)
  router.use('', ...result.routers)
  await next()
})

// error handler
onerror(app) 

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

// app.use(views(__dirname + '/views', {
//   extension: 'pug'
// }))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})


// routes
// app.use(index.routes(), index.allowedMethods())
app.use(router.routes(), router.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx.url)
});

module.exports = app
