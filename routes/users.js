const router = require('koa-router')()


router.get('/getUserInfo', function (ctx, next) {
  console.log(ctx.origin)
  ctx.body = JSON.stringify({
    code: 0, 
    msg: 'success',
    data: 'this is getUserInfo data'
  })
})

router.post('/saveUserInfo', function (ctx, next) {
  ctx.status = 500
  ctx.body = JSON.stringify({
    code: 1,
    msg: 'error',
    data: 'this is saveUserInfo data'
  })
})

module.exports = router
