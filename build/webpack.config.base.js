const path = require('path')
// 引入vue-loader插件
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: path.join(__dirname, '../client/client-entry'),
  output: {
    filename: 'bundle.js',
    publicPath: 'http://localhost:8000/public/'
    // publicPath: '/public/'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      }
    ]
  },
  plugins: [
    // vue加载器插件
    new VueLoaderPlugin()
  ]
}