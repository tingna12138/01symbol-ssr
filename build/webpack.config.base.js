const path = require('path')
// 引入vue-loader插件
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: path.join(__dirname, '../client/client-entry'),
  output: {
    filename: 'bundle.js',
    publicPath: '/public/'
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
    new VueLoaderPlugin()
  ]
}