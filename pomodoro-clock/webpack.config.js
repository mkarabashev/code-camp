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
    path.join(__dirname, '/node_modules/font-awesome/scss', 'font-awesome.scss')
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
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
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
  parts.mp3(PATHS.src),
  parts.fontAwesome()
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
      parts.purifyCSS([
        'app/index.jade',
        'app/templates/mixins.jade'
      ]),
      parts.minify()
    );
    break;
  default:
    config = merge(
      common,
      {
        devtool: 'eval-source-map'
      },
      parts.SASS(),
      parts.devServer({
        host: process.env.HOST,
        port: process.env.PORT
      })
    );
}

module.exports = validate(config);
