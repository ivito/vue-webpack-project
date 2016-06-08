var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  // entry point of our application
  entry: {
    'entry-css': './src/css/main.styl',
    'entry-js': './src/main.js',
    'login-css': './src/css/login.styl',
    'login-js': './src/login.js'
  },
  // where to place the compiled bundle
  output: {
    path: __dirname + '/asset',
    filename: '[name].js',
    publicPath: 'http://localhost:8081/asset'
  },
  devServer: {
    inline:true,
    port: 8081,
    proxy: {
      '/': 'http://127.0.0.1:8080/',
      '/coach': 'http://127.0.0.1:8080/coach',
      '/organization': 'http://127.0.0.1:8080/organization',
      '/visitor': 'http://127.0.0.1:8080/visitor',
      '/login': 'http://127.0.0.1:8080/',
      '/api/*': 'http://127.0.0.1:8080/'
    },
  },
  vue: {
    loaders: {
      js: ''
    }
  },
  module: {
    loaders: [
      {
        test: /\.svg$/,
        loader: 'file'
      },
      {
        test: /\.vue$/, // a regex for matching all files that end in `.vue`
        loader: 'vue'   // loader to use for matched files
      },
      {
          test: /\.styl$/,
          // 第一个参数可选，用于不是所有样式都提取到一个文件时候需要用到的 loader
          // 第二个参数，为导出 css 样式内容的 loader 给提取插件
          loader: ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader')
      }
    ]
  },
  plugins: [
    // allChunks: true，会提取所有附加的代码块（比如异步加载）的样式到文件里
    new ExtractTextPlugin('./[name].css', {
      allChunks: true
    })
  ]
}