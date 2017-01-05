const webpack = require('webpack');
const pkg = require('./package.json');
const PurifyCSSPlugin = require('purifycss-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

exports.devServer = function(options) {
  return {
    devServer: {
      // Enable history API fallback so HTML5 History API based
      // routing works. This is a good default that will come
      // in handy in more complicated setups.
      historyApiFallback: true,

      // Unlike the cli flag, this doesn't set
      // HotModuleReplacementPlugin!
      hot: true,
      inline: true,

      // Display only errors to reduce the amount of output.
      stats: 'errors-only',

      // Parse host and port from env to allow customization.
      //
      // If you use Vagrant or Cloud9, set
      // host: options.host || '0.0.0.0';
      //
      // 0.0.0.0 is available to all network devices
      // unlike default `localhost`.
      host: options.host, // Defaults to `localhost`
      port: options.port // Defaults to 8080
    },
    plugins: [
      // Enable multi-pass compilation for enhanced performance
      // in larger projects. Good default.
      new webpack.HotModuleReplacementPlugin({
        multiStep: true
      })
    ]
  };
}

exports.eslint = function (path) {
  return {
    module: {
      preLoaders: [
        {
          test: /\.(js|jsx)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        }
      ]
    }
  };
};

exports.setupCSS = function () {
  return {
    module: {
      loaders: [
        {
          test: /\.css$/,
          loaders: ['style', 'css'],
        }
      ]
    }
  };
};

exports.setupSASS = function () {
  return {
    module: {
      loaders: [
        {
          test: /\.s(c|a)ss$/,
          loaders: ['style', 'css', 'sass'],
        }
      ]
    }
  };
};

exports.jade = function () {
  return {
    module: {
      loaders: [
        {
          test: /\.jade$/,
          loaders: ['jade'],
        }
      ]
    }
  };
};

exports.png = function (paths) {
  return {
    module: {
      loaders: [
        {
          test: /.png$/,
          loaders: ['file?name=[path][name].[ext]?[hash]&context=' + paths],
        }
      ]
    }
  };
};

exports.mp3 = function (paths) {
  return {
    module: {
      loaders: [
        {
          test: /.mp3$/,
          loaders: ['file?name=[path][name].[ext]?[hash]&context=' + paths],
        }
      ]
    }
  };
};

exports.js = function () {
  return {
    module: {
      loaders: [
        {
          test: /.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015']
          }
        }
      ]
    }
  };
};

exports.minify = function () {
  return {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        comments: false,
        compress: {
          warnings: false
        },
        // mangling
        mangle: {
          except: ['$', 'webpackJsonp', '_'],
          screw_ie8: true,
          keep_fnames: true
        }
      })
    ]
  };
};

exports.setFreeVariable = function (key, value) {
  const env = {};
  env[key] = JSON.stringify(value);
  return {
    plugins: [
      new webpack.DefinePlugin(env)
    ]
  };
};

exports.extractBundle = function(options) {
  const entry = {};
  entry[options.name] = options.entries;

  return {
    // Define an entry point needed for splitting.
    entry: entry,
    plugins: [
      // Extract bundle and manifest files. Manifest is
      // needed for reliable caching.
      new webpack.optimize.CommonsChunkPlugin({
        names: [options.name, 'manifest']
      })
    ]
  };
}

exports.extractVendors = function () {
  return {
    // Define an entry point needed for splitting.
    entry: {
      vendor: Object.keys(pkg.dependencies)
    },
    plugins: [
      // Extract bundle and manifest files. Manifest is
      // needed for reliable caching.
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest']
      })
    ]
  };
}

exports.clean = function(path) {
  return {
    plugins: [
      new CleanWebpackPlugin([path], {
        // Without `root` CleanWebpackPlugin won't point to our
        // project and will fail to work.
        root: process.cwd()
      })
    ]
  };
};

exports.extractSASS = function () {
  return {
    module: {
      loaders: [
        // Extract CSS during build
        {
          test: /\.s(c|a)ss$/,
          loader: ExtractTextWebpackPlugin.extract('style', ['css', 'sass'])
        }
      ]
    },
    plugins: [
      // Output extracted CSS to a file
      new ExtractTextWebpackPlugin('[name].[chunkhash].css')
    ]
  };
};

exports.extractCSS = function () {
  return {
    module: {
      loaders: [
        // Extract CSS during build
        {
          test: /\.css$/,
          loader: ExtractTextWebpackPlugin.extract('style', 'css')
        }
      ]
    },
    plugins: [
      // Output extracted CSS to a file
      new ExtractTextWebpackPlugin('[name].[chunkhash].css')
    ]
  };
};

exports.fontAwesome = function () {
  return {
    module: {
      loaders: [
        // the url-loader uses DataUrls.
        // the file-loader emits files.
        { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
        { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
      ]
    }
  }
};

exports.purifyCSS = function(paths) {
  return {
    plugins: [
      new PurifyCSSPlugin({
        basePath: process.cwd(),
        // `paths` is used to point PurifyCSS to files not
        // visible to Webpack. You can pass glob patterns
        // to it.
        paths: paths
      }),
    ]
  }
};

exports.bootstrap = function () {
  return {
    module: {
      loaders: [
        // the url-loader uses DataUrls.
        // the file-loader emits files.
        { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
        { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
      ]
    }
  }
};
