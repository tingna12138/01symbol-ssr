// import { resolve } from 'dns';
const handleSSR = require('./router/dev-ssr')

// 服务端入口文件

const { createApp } = require('./app')

// 解决服务端第一次路由导航的问题
module.exports.createHtml = context => {
  return new Promise((res,rej) => {
    const { app, router } = createApp()
    // router.get('*', handleSSR(context))
    // 服务器将路径跳转交给vue-router
    router.push(context.url)  // 请求路径的url

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      // 如果没有匹配到的路由，返回404
      if (!matchedComponents.length) {
        return rej({ code: 404 })
      }
      res(app)
    })
  })
}