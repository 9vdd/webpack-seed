const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
// const uuid = require('uuid')
const base = require('./webpack.base.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// const version = uuid.v1().substr(0, 8)

const config = merge(base, {
  devtool: false,
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: `[name].[chunkhash:8].js`
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: 'warning'
  },
  module: {
    rules: [{
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [`url-loader?limit=10000&img/[name].[ext]?[hash]`],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [`url-loader?limit=10000&img/[name].[ext]?[hash]`],
        exclude: /(node_modules)/
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: `[name].[contenthash:8].css`
    }),
    new HtmlWebpackPlugin({
      filename: `index.html`,
      template: './src/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        pure_funcs: ['console.log']
      },
      sourceMap: false,
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
    })
  ]
})

module.exports = config