const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')
const koajwt = require('koa-jwt')

// 过期时间 一小时
const EXPRIE_TIME = 60 * 60

class JWT {
  constructor (data) {
    this.data = data
  }

  generateToken () {
    let data = this.data
    const created = Math.floor(Date.now() / 1000)
    const cert = fs.readFileSync(path.resolve(__dirname, '../pem/jwt.pem'))
    let token = jwt.sign({
      uid: data, 
      exp: created + EXPRIE_TIME,
    },  cert, { algorithm: 'RS256'})
    return token
  }

  verifyToken () {
    let token = this.data
    let cert = fs.readFileSync(path.resolve(__dirname, '../pem/jwt_pub.pem'))
    let res 
    try {
      let result = jwt.verify(token, cert, { algorithm: 'RS256' }) || {}
      let { exp = 0, data = {} } = result
      let current = Math.floor(Date.now() / 1000)
      if (current <= exp) {
        res = data || {}
      }
    } catch (error) {
        console.log('token 已过期',)
        res = 'err'      
    }
    return res
  }

  decode () {
    let token = this.data
    const decoded = jwt.decode(token)
    return decoded
  }
}

module.exports = JWT