const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const parts = require('./parts.js');

const PATHS = {
  src: path.join(__dirname, 'app'),
  jade: path.join(__dirname, 'app', 'index.jade'),
  style: [
    path.join(__dirname, '/app/sass', 'main.sass'),
    path.join(__dirname, '/node_modules/normalize.css', 'normalize.css')
  ],
  build: path.join(__dirname, 'dist')
}

const base = {
  entry: {
    app: PATHS.src,
    style: PATHS.style
  },
  output: {
    path: PATHS.build,
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: PATHS.jade
    })
  ]
};

const common = merge(
  base,
  parts.jade(),
  parts.js(),
  parts.png(PATHS.src),
  parts.mp3(PATHS.src)
);

var config;
switch(process.env.npm_lifecycle_event) {
  case 'build':
    config = merge(
      common,
      {
        devtool: 'source-map',
        output: {
          path: PATHS.build,
          filename: '[name].[chunkhash].js',
          chunkFilename: '[chunkhash].js'
        }
      },
      parts.clean(PATHS.build),
      parts.extractVendors(),
      parts.extractSASS(),
      parts.purifyCSS(['app/index.jade']),
      parts.minify()
    );
    break;
  default:
    config = merge(
      common,
      {
        devtool: 'eval-source-map'
      },
      parts.setupSASS(),
      parts.setupCSS(),
      parts.devServer({
        host: process.env.HOST,
        port: process.env.PORT
      })
    );
}

module.exports = validate(config);
