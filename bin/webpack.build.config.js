const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')


const config = merge(base, {
  devtool: false,
  performance: {
    maxEntrypointSize: 300000,
    hints: 'warning'
  },
  plugins: [
        new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      
    // extract vendor chunks for better caching
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        // a module is extracted into the vendor chunk if...
        return (
          // it's inside node_modules
          /node_modules/.test(module.context) &&
          // and not a CSS file (due to extract-text-webpack-plugin limitation)
          !/\.css$/.test(module.request)
        )
      }
    }),
    // extract webpack runtime & manifest to avoid vendor chunk hash changing
    // on every build.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    })
  ]
})

module.exports = config
