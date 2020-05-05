const PATH = require('path')
const FS = require('fs')
const MFS = require('memory-fs')
const WEBPACK = require('webpack')
const axios = require('axios')
const serverConfig = require('../../build/webpack.config.server')

module.exports = (callback) => {
  // console.log(123456, serverConfig.module.rules.test)
  console.log(123456, serverConfig)
  // 让服务端从内存中读取文件
  const mfs = new MFS()
  const serverCompiler = WEBPACK(serverConfig)
  serverCompiler.outputFileSystem = mfs
  // 监听服务端运行
  serverCompiler.watch({}, async (err, state) => {
    if (err) throw err
    state = state.toJson()
    state.errors.forEach(err => console.log('2err', err))
    state.warnings.forEach(err => console.log('1warning', err))
    
    // 读取内存中的服务端文件
    let serverBundlePath = PATH.join(serverConfig.output.path, 'vue-ssr-server-bundle.json')
    let serverBundle = JSON.parse(mfs.readFileSync  (serverBundlePath, 'utf-8'))
  
    // 读取客户端打包的json文件
    const clientManifestResp = await axios.get(
      'http://127.0.0.1:8000/public/vue-ssr-client-manifest.json'
    )
  
    // 获取模板
    const template = FS.readFileSync(PATH.join(__dirname, '../../template.html'), 'utf-8')
    // console.log(template)

    callback(serverBundle, clientManifestResp, template)
  })
}

// 不要在 terminal里直接通过node .\dev-ssr的方式运行这个文件，它会找所有e盘下的node_module。要通过在package.json文件里指定，好知道那个是项目文件

// UnhandledPromiseRejectionWarning: ReferenceError: path is not defined   出现这个问题不一定是你的Promise对象写错了，这种结构代码写在watch里面，有没有错误处理机制所以才会报这样的错，可能