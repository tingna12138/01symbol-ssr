// import Vue from 'vue'
const Vue = require('vue')
const { createRouter } = require('./router/router')

module.exports.createApp = () => {
  const router = createRouter()
  const app = new Vue({
    router,
    template: `<div>这是服务端用的vue模板 </div>`
   })
   return { app, router }
}