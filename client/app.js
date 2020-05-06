// const Vue = require('vue')
// const { createRouter } = require('./router/router')
// const App = require('./App.vue')
// console.log('App', App)
import Vue from 'vue'
import createRouter from './router/router'
import App from './App.vue'

export default () => {
  const router = createRouter()
  const app = new Vue({
    router,
    render: h => h(App)
    // template: `<div id="app">这是服务端用的vue模板 
    //   <router-link to="/about">关于我们</router-link>
    //   <router-link to="/menu">菜单</router-link>
    //   <router-view></router-view>
    // </div>`
   })
   return { app, router }
}