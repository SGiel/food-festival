// As of webpack version 4, a config file is not necessary, but we want to use one so that we can be more specific 
// with how webpack will function.

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

// path is a core Node.js module that we've used previously
const path = require("path");

const webpack = require("webpack");

const WebpackPwaManifest = require("webpack-pwa-manifest");

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
    }),
    // Fingerprints tell webpack whether or not it should generate unique fingerprints so that each 
    // time a new manifest is generated, it looks like this: manifest.lhge325d.json. Because we do not 
    // want this feature, we set fingerprints to be false. The inject property determines whether the 
    // link to the manifest.json is added to the HTML. Because we are not using fingerprints, we can 
    // also set inject to be false. We will hardcode the path to the manifest.json instead, just like 
    // we would in an application without webpack.
    new WebpackPwaManifest({
      name: "Food Event",
      short_name: "Foodies",
      description: "An app that allows you to view upcoming food events.",
      start_url: "../index.html",
      background_color: "#01579b",
      theme_color: "#ffffff",
      fingerprints: false,
      inject: false,
      icons: [{
        src: path.resolve("assets/img/icons/icon-512x512.png"),
        sizes: [96, 128, 192, 256, 384, 512],
        destination: path.join("assets", "icons")
      }]
    })
  ],
  mode: 'development'
};