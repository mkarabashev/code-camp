var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: ['./src/index.js', './src/index.jade'],
  output: {
    path: path.join(__dirname + '/dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jade$/,
        loaders: ['file?name=index.html', 'jade-html']
      },
      {
        test: /\.sass$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /.png/,
        loaders: ['file-loader']
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ]
};
