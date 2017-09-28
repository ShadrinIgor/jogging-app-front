module.exports = {
  entry: "./app/app.js",
  output: {
    filename: "./app.bundle.js"
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
  watchOptions: {
    ignored: /node_modules/
  }
}
