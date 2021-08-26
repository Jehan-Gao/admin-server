const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const koajwt = require('koa-jwt')

const JWTUtil = require('./jwt')

async function getToken(ctx) {
  const { authorization } = ctx.request.header
  if (!authorization) {
    return false
  }
  return authorization.match(/Bearer\s+(.+)/)[1] || ''
}

async function decodeToken(ctx) {
  let token = await getToken(ctx)
  if (!token) {
    return false
  }
  const jwt = new JWTUtil(token)
  return jwt.decode()
}

function koajwtVerifyToken(opt) {
  let cert = fs.readFileSync(path.resolve(__dirname, '../pem/jwt_pub.pem'))
  let middleware = koajwt({
    ...opt,
    secret: cert
  })
  return middleware
}

function getMongooseModel(modelName = '', schemaProp = {}) {
  const schema = mongoose.Schema(schemaProp)
  const model = mongoose.model(modelName, schema)
  return model
}

function sendStringify({ data = null, msg = 'success', code = 0 }) {
  return JSON.stringify({
    code,
    msg,
    data
  })
}

module.exports = {
  sendStringify,
  getToken,
  decodeToken,
  getMongooseModel,
  koajwtVerifyToken
}