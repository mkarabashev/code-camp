const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const parts = require('./parts.js');

const PATHS = {
  src: path.join(__dirname, 'src'),
  style: path.join(__dirname, '/src/sass', 'main.sass'),
  dist: path.join(__dirname, 'dist')
}

const base = {
  entry: {
    app: PATHS.src,
    style: PATHS.style
  },
  output: {
    path: PATHS.dist,
    filename: '[name].js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname + '/src/index.jade')
    })
  ]
};

const common = merge(
  base,
  parts.jade(PATHS.src),
  parts.js(PATHS.src),
  parts.png(PATHS.src)
);

var config;
switch(process.env.npm_lifecycle_event) {
  case 'build':
    config = merge(
      common,
      {
        devtool: 'source-map',
        output: {
          path: PATHS.dist,
          filename: '[name].[chunkhash].js',
          chunkFilename: '[chunkhash].js'
        }
      },
      parts.clean(PATHS.dist),
      parts.extractVendors(),
      parts.extractSASS(PATHS.style),
      parts.minify()
    );
    break;
  default:
    config = merge(
      common,
      {
        devtool: 'eval-source-map'
      },
      parts.SASS(PATHS.style),
      parts.devServer({
      host: process.env.HOST,
      port: process.env.PORT
    }));
}

module.exports = validate(config);
