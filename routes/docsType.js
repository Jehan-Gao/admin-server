const router = require('koa-router')()
const utils = require('../utils/index')
const { findAllDocsType } = require('../model/docsType')


router.get('/docs_type', async function(ctx, next) {
  const data = await findAllDocsType()
  ctx.body = utils.send(data)
})

module.exports = router
