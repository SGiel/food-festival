// As of webpack version 4, a config file is not necessary, but we want to use one so that we can be more specific 
// with how webpack will function.

// path is a core Node.js module that we've used previously
const path = require("path");

const webpack = require("webpack");

// For a basic configuration, we need to provide webpack with three properties: entry, output, and mode.
// It is common and best practice to put your bundled code into a folder named dist
module.exports = {
  entry: './assets/js/script.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.bundle.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
  ],
  mode: 'development'
};