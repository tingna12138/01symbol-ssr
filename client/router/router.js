const Router = require('vue-router')
const Vue = require('vue')

Vue.use(Router)
module.exports.createRouter = () => {
  return new Router({
    mode: 'history',
    routes: [
      { path: '/', component: { template: '<div>首页</div>'} },
      { path: '/menu', component: { template: '<div>菜单</div>'} },
      { path: '/about', component: { template: '<div>关于我们</div>'}}
    ]
  })
}