const docsTypeModel = require('../models/docsType')

function findAllDocsType() {
  return new Promise((resolve, reject) => {
    docsTypeModel.find(function(err, docs) {
      if (err) {
        reject(err)
      }
      console.log(docs)
      resolve(docs)
    })
  })
}

module.exports = {
  findAllDocsType
}
