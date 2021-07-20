module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: 'dist',
  lintOnSave: true,
  runtimeCompiler: true,
  chainWebpack: () => {},
  configureWebpack: () => {},
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: null, // string | Object
    before: app => {}
  }
}






// devServer : {
//     proxy : {
//      '/food':{
//       target : 'http://172.24.10.130:8080/foodService',
//       // ws : true,
//       changeOrigin:true,
//       pathRewrite:{
//        '^/food':''
//       }
//      }
//     }
//    }