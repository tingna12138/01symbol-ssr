// import Vue from 'vue'
const Vue = require('vue')
const { createRouter } = require('./router/router')

module.exports.createApp = () => {
  const router = createRouter()
  const app = new Vue({
    router,
    template: `<div>这是服务端用的vue模板 
      <router-link to="/about">关于我们</router-link>
      <router-link to="/menu">菜单</router-link>
      <router-view></router-view>
    </div>`
   })
   return { app, router }
}