const baseConfig = require('./webpack.config.base')
const Path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const VueServerPlugin = require('vue-server-renderer/server-plugin')
const webpackNodeExternals = require('webpack-node-externals')

const plugins = baseConfig.plugins.concat([
  // 将打包后的结果变成.json文件，且默认文件名为vue-ssr-client-manifest.json
  new VueServerPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"development"',
    'process.env.VUE_ENV': '"server"'
  })
])
module.exports = merge(baseConfig, {
  // 不打包node_module包，因为程序是运行在node端，可以直接引入
  externals: [webpackNodeExternals()],
  target: 'node',
  devtool: 'source-map',
  // entry: '../client/server-entry.js'   用这种方式会有找不到文件的提示，应该和打包路径有关
  entry: Path.join(__dirname, '../client/server-entry.js'),

  // 对 bundle renderer 提供 source map 支持
  devtool: 'source-map',

  // 此处告知 server bundle 使用 Node 风格导出模块(Node-style exports)
  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2',
    // path: path.join(__dirname, '../dist')
    path: Path.resolve(__dirname, '../dist')
  },
  plugins
})