const express = require('express')
const render = require('vue-server-renderer')
const { createHtml } = require('./client/server-entry')
const path = require('path')

const server = express()
const renderer = render.createRenderer({
  template: require('fs').readFileSync(path.join(__dirname, './template.html'), 'utf-8')
})
const context = {}

server.get('*', (req,res) => {
  console.log('req', req.url)
  context.url = req.url
  createHtml(context).then( app => {
    renderer.renderToString(app, (err, html) => {
      if (err) {
        res.status(500).end('Internal Server Error')
        return  
      }
      res.setHeader("content-type","text/html; charset=utf-8") 
      res.end(html)
    })
  }).catch ( err => {
    res.end(JSON.stringify(err))
  })
})

server.listen(8080, () => {
  console.log('服务启动了')
})