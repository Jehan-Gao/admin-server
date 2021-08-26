const { getMongooseModel } = require('../utils/index')

module.exports = getMongooseModel('articles', {
  title: String,
  content: String,
  tag: Array,
  isTop: Boolean,
  crateTime: Date,
  docType: String
})

