// As of webpack version 4, a config file is not necessary, but we want to use one so that we can be more specific 
// with how webpack will function.

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

// path is a core Node.js module that we've used previously
const path = require("path");

const webpack = require("webpack");

// For a basic configuration, we need to provide webpack with three properties: entry, output, and mode.
// It is common and best practice to put your bundled code into a folder named dist
module.exports = {
  entry: {
    app: "./assets/js/script.js",
    events: "./assets/js/events.js",
    schedule: "./assets/js/schedule.js",
    tickets: "./assets/js/tickets.js"
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jpg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name(file) {
                return '[path][name].[ext]';
              },
              publicPath: function(url) {
                return url.replace('../', '/assets/');
              }
            }
          },
          {
            loader: 'image-webpack-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static", // the report outputs to an HTML file in the dist folder
    })
  ],
  mode: 'development'
};