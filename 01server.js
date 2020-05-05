const express = require('express')
const { createBundleRenderer } = require('vue-server-renderer')
// const { createHtml } = require('./client/server-entry')
const path = require('path')
const handleSSR =  require('./client/router/01dev-ssr')

const server = express()
// const renderer = render.createRenderer({
//   template: require('fs').readFileSync(path.join(__dirname, './template.html'), 'utf-8')
// })
const context = {}

server.get('*', (req,res) => {
  handleSSR((bundle, clientManifestResp, template) => {
    let renderer = createBundleRenderer(bundle, {
      // runInNewContext: false, // 推荐
      template, // （可选）页面模板
      clientManifest: clientManifestResp.data // （可选）客户端构建 manifest
    })
   
    console.log(111, renderer)
    renderer.renderToString({url: req.originalUrl}, (err, html) => {
      if(err) {
        console.log(456, err)
        return
      }
      console.log(123,html)
    })
  })
 
})

server.listen(3000, () => {
  console.log('服务启动了')
})