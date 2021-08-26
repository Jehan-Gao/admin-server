const articleModel = require('../models/articles')

function createArticle (articleData = {}) {
  articleData.crateTime = Date.now()
  const article = new articleModel(articleData)
  return new Promise((resolve, reject) => {
    article.save(function(err, res) {
      if (err) {
        reject(err)
      }
      resolve(res)
    })
  })
}

module.exports = {
  createArticle
}