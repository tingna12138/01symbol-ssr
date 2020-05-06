// const Router = require('vue-router')
// const Vue = require('vue')
import Router from 'vue-router'
import Vue from 'vue'
import AboutUs from '../view/AboutUs.vue'
import LearnMore from '../view/LearnMore.vue'

Vue.use(Router)
export default () => {
  return new Router({
    mode: 'history',
    routes: [
      { path: '/', 
         component: AboutUs },
      { path: '/menu', 
         component: AboutUs },
      { path: '/about',
        component: LearnMore }
    ]
  })
}

// 最后问题：如何将template模板换成 .vue文件