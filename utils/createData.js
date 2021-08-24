
const mongoose = require('mongoose')

function createSchema(schemaOpt = {}) {
  return mongoose.Schema(schemaOpt)
}

function createModel(modelName, schema, data) {
  const Model = mongoose.model(modelName, schema)
  const instance = new Model(data)
  return instance
}

module.exports = {
  createSchema,
  createModel
}
