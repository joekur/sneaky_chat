var webpackServer = 'http://localhost:8080/';
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    index: [
      'webpack-dev-server/client?' + webpackServer,
      'webpack/hot/only-dev-server',
      './web/static/js/app.js',
    ],
    styles: [
      'webpack/hot/only-dev-server',
      './web/static/css/app.scss',
    ]
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
  plugins: [
    new ExtractTextPlugin('priv/static/js/styles.css')
  ]
};
