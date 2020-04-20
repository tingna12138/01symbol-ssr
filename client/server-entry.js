// 服务端入口文件

// import Vue from 'vue'
const Vue = require('vue')

module.exports = () => {
  return new Vue({
    template: '<div>这是服务端用的vue模板</div>'
   })
}