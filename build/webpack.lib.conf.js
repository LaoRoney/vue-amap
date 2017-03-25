var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

var env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.lib_build.env

var webpackConfig = merge(baseWebpackConfig, {
  entry: {
    app: './src/lib/index.js'
  },
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.lib_build.productionSourceMap,
      extract: true
    })
  },
  devtool: config.lib_build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.lib_build.assetsRoot,
    filename: 'index.js',
    chunkFilename: 'index.js',
    libraryTarget: "umd"
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'search-box.css'
    })
  ]
})

module.exports = webpackConfig
