const { getMongooseModel } = require('../utils/index')

module.exports = getMongooseModel('docs_types', {
  docType: String,
  value: String
})
