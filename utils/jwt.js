const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')

class JWT {
  constructor (data) {
    this.data
  }

  generateToken () {
    let data = this.data
    const created = Math.floor(Date().now / 1000)
    const cert = fs.readFileSync(path.resolve(__dirname, '../pem/jwt.pem'))
    let token = jwt.sign({
      data, 
      exp: created + 60 * 30,
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
      let current = Math.floor(Date().now / 1000)
      if (current <= exp) {
        res = data
      }
    } catch (error) {
        res = error      
    }
    return res
  }
}

module.exports = JWT