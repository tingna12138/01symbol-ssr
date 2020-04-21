const baseConfig = require('./webpack.config.base')
const merge = require('webpack-merge')
const VueClientPlugin = require('vue-server-renderer/client-plugin')

const plugins = baseConfig.plugins.concat([
  // 将打包后的结果变成.json文件，且默认文件名为vue-ssr-client-manifest.json
  new VueClientPlugin()
])
module.exports = merge(baseConfig, {
  target: 'web',
  devServer: {
    port: '8000'
  },
  plugins
})