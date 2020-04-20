const path = require('path')
// 引入vue-loader插件
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const VueClientPlugin = require('vue-server-renderer/client-plugin')

module.exports = {
  target: 'web',
  entry: path.join(__dirname, '../client/client-entry'),
  output: {
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  devServer: {
    port: '8000'
  },
  module: {
    rules: [//配置vue
      {
          test: /\.vue$/,
          use: ['vue-loader']
      }
    ]  
  },
  plugins: [
    // vue加载器插件
    new VueLoaderPlugin(),
    // 将打包后的结果变成.json文件，且默认文件名为vue-ssr-client-manifest.json
    new VueClientPlugin()  
  ]
}