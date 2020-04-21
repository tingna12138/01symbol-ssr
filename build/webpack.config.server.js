const baseConfig = require('./webpack.config.base')
const path = require('path')
const merge = require('webpack-merge')
const VueServerPlugin = require('vue-server-renderer/server-plugin')

const plugins = baseConfig.plugins.concat([
  // 将打包后的结果变成.json文件，且默认文件名为vue-ssr-client-manifest.json
  new VueServerPlugin()
])
module.exports = merge(baseConfig, {
  target: 'node',
  // entry: '../client/server-entry.js'   用这种方式会有找不到文件的提示，应该和打包路径有关
  entry: path.join(__dirname, '../client/server-entry.js'),

  // 此处告知 server bundle 使用 Node 风格导出模块(Node-style exports)
  output: {
    libraryTarget: 'commonjs2'
  },
  plugins
})