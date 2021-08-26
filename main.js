const fs = require('fs')
const path = require('path')
const notVerifyTokenList = require('./utils/notVerifyTokenList')


function main() {
  const routers = []
  const routersPath = []
  try {
    const files = fs.readdirSync(path.resolve(__dirname, './routes'))
    if (!Array.isArray(files)) return
    files.forEach(file => {
      const routerFunc = require(`./routes/${file}`)
      if (!routerFunc) {
        throw('require 路由模块失败')
      }
      routerFunc.router.stack.forEach(obj => {
        if (!notVerifyTokenList.includes(obj.path)) {
          routersPath.push(obj.path)
        }
      })
      routers.push(routerFunc)
    })
  } catch (error) {
    console.log(error)
    return error
  }
  return {
    routers,
    routersPath
  }
}
main()

module.exports = main

