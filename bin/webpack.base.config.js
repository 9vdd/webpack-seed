const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const pagesPath = './src/pages/*/index.js';

var pages = [];
glob.sync(pagesPath).forEach(function (filepath) {
  const dir = path.dirname(filepath);
  const filename = dir.substr(dir.lastIndexOf('/') + 1)
  pages.push({
    filename,
    dir
  });
});

const plugins = pages.map((page) => {
  return new HtmlWebpackPlugin({
    filename: page.filename + '.html',
    template: page.dir + '/index.html',
    inject: true,
    chunks: ['vendor', page.filename],
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
    },
    chunksSortMode: 'dependency'
  })
});

const entry = {};
pages.forEach((page) => {
  entry[page.filename] = page.dir + '/index.js';
});

module.exports = {
  entry: entry,
  resolve: {
    extensions: ['.js', '.json'],
  },
  module: {
    rules: [{
        test: /\.html$/,
        use: ['html-withimg-loader', 'raw-loader'],
        exclude: /(node_modules)/
      },
      {
        test: /\.js$/,
        use: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader?minimize', 'postcss-loader']
        })
      }
    ]
  },
  plugins: plugins,
}