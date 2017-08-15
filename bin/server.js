var config = require("./webpack.dev.config.js");
var webpack = require('webpack');
// var OpenBrowserPlugin = require('open-browser-webpack-plugin');

var WebpackDevServer = require('webpack-dev-server');

// config.entry.index.unshift("webpack-dev-server/client?http://localhost:" + port + "/", 'webpack/hot/dev-server');
// config.plugins.push(new OpenBrowserPlugin({
//   url: 'http://localhost:' + port
// }));

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
  hot: true,
  disableHostCheck: true,
  open: true,
  openPage: '/index.html',
  stats: {
    colors: true // 用颜色标识
  },
  contentBase: 'src'
});
server.listen(3000);
