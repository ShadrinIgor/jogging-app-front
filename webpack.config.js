const webpack = require('webpack');
const path = require('path');
// let ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('./app/config');

module.exports = {
  entry: './app/app.js',
  output: {
    filename: './app.bundle.js'
  },
  devtool: '#source-map',
  module: {
    rules: [
      {exclude: ['node_modules'], loader: 'babel', test: /\\.js?$/},
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react']
          }
        }
      },
      {
        test: /\.sass$/,
        loaders: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.css/,
        loaders: 'style-loader!css-loader'
      },
    ]
  },
  watch: true,
  plugins: [
    new webpack.DefinePlugin({
      CONFIG: JSON.stringify(config)
    })
  ],
/*  devServer: {
 open: false,
 host: SERVER_LOCAL.host,
 port: SERVER_LOCAL.port,
 hot: NODE_ENV_DEVELOPMENT,
 inline: NODE_ENV_DEVELOPMENT,
 historyApiFallback: true,
 disableHostCheck: true,
 headers: {
 "Access-Control-Allow-Origin": "null",
 "Access-Control-Allow-Credentials": "true"
 }
  }*/
};
