const router = require('koa-router')()
const { decodeToken, sendStringify } = require('../utils/index')
const { findUseInfoById} = require('../controllers/users')


router.get('/getUserInfo', async function (ctx, next) {
  try {
    let res = await decodeToken(ctx)
    if (!res) {
      ctx.status = 403
      ctx.body = sendStringify({ msg: 'error', code: 1})
      return
    }
    const { uid } = res
    const userInfo = await findUseInfoById(uid)
    if (!userInfo) {
      ctx.body = sendStringify({
        code: 1,
        msg: '没有查找到用户信息'
      })
    } else {
      ctx.body = sendStringify({
        data: {
          userName: userInfo.userName,
          role: userInfo.role
        }
      })
    }
  } catch (error) {
    console.log('getUserInfo', error)
  }
})

module.exports = router.routes()
