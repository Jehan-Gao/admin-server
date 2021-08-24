const mongoose = require('mongoose')

const schema = mongoose.Schema()
const model = mongoose.model('docs_types', schema)

function findAllDocsType() {
  return new Promise((resolve, reject) => {
    model.find(function(err, docs) {
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

