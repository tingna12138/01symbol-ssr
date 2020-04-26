// 用于获取客户端、服务端、和vue路由，并将他们合并在一起
const path = require('path')
const fs = require('fs')
const memoryFs = require('memory-fs')
const webpack = require('webpack')
const axios = require('axios')
const VueServerRenderer = require('vue-server-renderer')
const serverConfig = require('../../build/webpack.config.server')

const mfs = new memoryFs()
const serverCompiler = webpack(serverConfig)

// 将server端打包的目录存放到内存中
serverCompiler.outputFileSystem = mfs
let buldle

module.exports = function (callback) {
  // 开启server端服务
  serverCompiler.watch({},async (err, state) => {
    
    if (err) throw err
    state = state.toJson()
    state.errors.forEach(err => console.log('2err', err));
    state.warnings.forEach(err => console.log('1warning', err));
    
    // server端的打包目录: 和webpack方式打包的目录一样，只不过在内存中
    let bundlePath = path.join(serverConfig.output.path, 'vue-ssr-server-bundle.json')
    bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
    const clientManifestResp = await axios.get(
      'http://127.0.0.1:8000/public/vue-ssr-client-manifest.json'
    ) 
    const template = fs.readFileSync(path.join(__dirname, '../../template.html'), 'utf-8')
    callback(bundle, clientManifestResp, template)
  })
 
}

