const express = require('express')
const render = require('vue-server-renderer')
const { app } = require('./client/server-entry')
const path = require('path')

const server = express()
const renderer = render.createRenderer({
  template: require('fs').readFileSync(path.join(__dirname, './template.html'), 'utf-8')
})

server.get('*', (req,res) => {
  renderer.renderToString(app, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return  
    }
    res.setHeader("content-type","text/html; charset=utf-8") 
    res.end(html)
  })
})

server.listen(8080, () => {
  console.log('服务启动了')
})