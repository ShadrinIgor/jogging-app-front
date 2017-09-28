const webpack = require('webpack');
const config = require('./app/config');

module.exports = {
  entry: './app/app.js',
  output: {
    filename: './app.bundle.js'
  },
  devtool: '#source-map',
  module: {
    loaders: [
      {
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  },
  watch: true,
  plugins: [
    new webpack.DefinePlugin({
      CONFIG: JSON.stringify(config)
    })
  ]
};
