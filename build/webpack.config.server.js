const baseConfig = require('./webpack.config.base')
const Path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const VueServerPlugin = require('vue-server-renderer/server-plugin')
const webpackNodeExternals = require('webpack-node-externals')


module.exports = merge(baseConfig, {
  mode: 'development',
  // 不打包node_module包，因为程序是运行在node端，可以直接引入
  // 如果是 .css文件需要打包；因为node端不能识别.css文件；可以通过白名单设置
  externals: [webpackNodeExternals()],
  target: 'node',
  devtool: 'source-map',
  // entry: '../client/server-entry.js'   用这种方式会有找不到文件的提示，应该和打包路径有关
  entry: {
    app: Path.join(__dirname, '../client/server-entry')
  },

  // 对 bundle renderer 提供 source map 支持
  devtool: 'source-map',

  // 此处告知 server bundle 使用 Node 风格导出模块(Node-style exports)
  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2',
    path: Path.resolve(__dirname, '../public/')
  },
  // module: {
  //   rules: [
  //     {
  //       test: /\.vue/,
  //       use: 'vue-loader'
  //     }
  //   ]
  // },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"',
      'process.env.VUE_ENV': '"server"'
    }),
    // 将打包后的结果变成.json文件，且默认文件名为vue-ssr-client-manifest.json
    new VueServerPlugin(),
  ]
})