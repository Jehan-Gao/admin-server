const router = require('koa-router')()
const { sendStringify } = require('../utils/index')
const { findAllDocsType } = require('../controllers/docsType')


router.get('/docs_type', async function(ctx, next) {
  const data = await findAllDocsType()
  ctx.body = sendStringify({
    data
  })
})

router.get('/tags', async function (ctx, next) {
  
})


module.exports = router.routes()
