const { createModel, createSchema } = require('./createData')
const { docsType } = require('../json/docsType')

const schema = createSchema({
 docType: String,
 value: Number
})

let finish = []

async function loop(item) {
  await save(item)
  finish.push(1)
  if (finish.length === docsType.length) return
  loop(docsType[finish.length])
}

loop(docsType[0])

function save(item) {
  const model = createModel('docs_type', schema, item)
  return new Promise((resolve, reject) => {
    model.save(function(err) {
      if (err) {
        reject(err)
      }
      resolve()
    })
  })
}
