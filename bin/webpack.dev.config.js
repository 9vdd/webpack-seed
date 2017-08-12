const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const config = merge(base, {
  devtool: false,
  performance: {
    maxEntrypointSize: 300000,
    hints: false
  },
  plugins: [
    new FriendlyErrorsPlugin()
  ]
})

module.exports = config