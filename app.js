const Koa = require('koa')
const app = new Koa()
// const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
// mongodb
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/blog');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongo connect success!')
  // 存docsType
  // require('./utils/create')
});

// routers
const users = require('./routes/users')
const doscsType = require('./routes/docsType')

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

app.use(async (ctx, next) => {
  ctx.res.setHeader('Access-Control-Allow-Origin', '*')
  ctx.res.setHeader(
    'Access-Control-Allow-Headers',
    'x-requested-with,Content-Type,token,Authorization'
  )
  if (ctx.method === 'OPTIONS') {
    ctx.body = ''
    ctx.status = 200
  } else {
    await next()
  }
})

// routes
// app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(doscsType.routes())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
