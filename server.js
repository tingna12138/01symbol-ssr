const devSSR = require('./client/router/dev-ssr')
const express = require('express')
const { createBundleRenderer } = require('vue-server-renderer')

const server = express()
let renderer
devSSR((serverBundle, clientManifestResp, template) => {
  renderer = createBundleRenderer(serverBundle, {
    // runInNewContext: false, // 推荐,每次创建一个独立的进程
    template, // （可选）页面模板
    clientManifest: clientManifestResp.data // （可选）客户端构建 manifest
  })
})
server.get('*', (req,res) => {
  if(req.url === "/favicon.ico"){
    res.end();
  } else {
    res.status(200)
    res.setHeader('Content-Type', 'text/html;charset=utf-8')
    renderer.renderToString(
      {url: req.originalUrl},(err, html) => {
        if(err) {
          console.log(4567, err)
          return
        }
        // console.log(123,html)
        res.end(html)
      }
    )
  }
})

server.listen(3000, () => {
  console.log('服务启动了')
})