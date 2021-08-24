 
 function send(data = {}) {
   return JSON.stringify({
     code: 0,
     msg: 'success',
     data
   })
 }


module.exports = {
  send
}