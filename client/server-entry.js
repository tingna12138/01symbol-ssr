// 服务端入口文件

const { createApp } = require('./app')

const { app } = createApp()

module.exports.app = app