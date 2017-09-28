const path = require('path');
const webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './app/app.js',
  output: {
    filename: './app.bundle.js',
    library: 'app'
  },
  module: {
    rules: [
      {test: /\.html/, use: ['html-loader']},
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {test: /\.(pug|jade)$/, loader: 'pug-loader'},
      {
        test: /\.sass$/,
        loaders: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.css/,
        loaders: 'style-loader!css-loader'
      },
      {
        test   : /\.(png|jpg)$/,
        loader : 'url-loader?limit=8192'
      },
      {
        test   : /\.(ttf|eot|svg|woff|woff2)(\?[a-z0-9]+)?$/,
        loader : 'file-loader'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new webpack.ProvidePlugin({
      moment: 'moment',
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
  ],
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  }
};