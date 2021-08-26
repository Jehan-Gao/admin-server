const { getMongooseModel } = require('../utils/index')

module.exports = getMongooseModel('users', {
  userName: String,
  password: String,
  role: String
})