const { getMongooseModel } = require('../utils/index')

module.exports = getMongooseModel('tags', {
  tagName: String,
  
})