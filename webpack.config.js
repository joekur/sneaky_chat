var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

var env = process.env.MIX_ENV || 'dev';
var prod = env === 'prod';

var webpackServer = 'http://localhost:8080/';

var hot = 'webpack-hot-middleware/client?path=' +
  webpackServer + '__webpack_hmr'

var entry = './web/static/js/app.js';
var stylesEntry = './web/static/css/app.scss';

var plugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    __PROD: prod,
    __DEV: env === 'dev'
  }),
  new ExtractTextPlugin('priv/static/js/styles.css'),
  new webpack.ProvidePlugin({
        Promise: 'imports-loader?this=>global!exports-loader?global.Promise!es6-promise',
        fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
   })
];

if (env === 'dev') {
  plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = {
  entry: {
    index: prod ? entry : [hot, entry],
    styles: prod ? stylesEntry : [hot, stylesEntry],
  },
  output: {
    publicPath: webpackServer,
    filename: 'priv/static/js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loaders: ['react-hot-loader/webpack', 'babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!postcss-loader!sass-loader'
        })
      }
    ]
  },
  plugins: plugins,
};
