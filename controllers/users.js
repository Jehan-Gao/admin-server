const usersModel = require('../models/users')

function findUseInfoById (uid) {
  return new Promise((resolve, reject) => {
    usersModel.findById(uid, function (err, data) {
      if (err) {
        reject(err)  
      }
      resolve(data)
    })
  })
}

function findUser(userName) {
  return new Promise((resolve, reject) => {
    usersModel.findOne({ userName }, function(err, res) {
      if (err) {
        reject(err)
      }
      console.log(res)
      resolve(res)
    })
  })
}

module.exports = {
  findUseInfoById,
  findUser
}