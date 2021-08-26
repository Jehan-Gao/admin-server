const router = require('koa-router')()
const JWTUtil = require('../utils/jwt')
const { findUser } = require('../controllers/users')
const { sendStringify } = require('../utils/index')

router.post('/login', async (ctx, next) => {
  const { body = {} } = ctx.request
  const { userName, password } = body
  try {
    const result = await findUser(userName)
    if (!result) {
      ctx.body = sendStringify({ msg: '查找不到对应账号', code: 1 })
      return
    }
    if (result.password === password) {
      let jwt = new JWTUtil(result._id)
      let token = jwt.generateToken()
      ctx.body = sendStringify({ data: { token } })
    } else {
      ctx.body = sendStringify({ msg: '密码错误', code: 1 })
    }
  } catch (error) {
    console.log('login:', error)
  }
})

module.exports = router.routes()