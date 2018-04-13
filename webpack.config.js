const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
  devtool: "inline-source-map",
  entry: {
    index: ["babel-polyfill", "./src/index.js"]
  },
  output: {
    path: path.join(__dirname, "public"),
    pathinfo: true,
    filename: "[name].js",
    publicPath: "/"
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".less"],
    alias: {
      components: path.join(__dirname, "src/components"),
      middleware: path.join(__dirname, "src/middleware"),
      less: path.join(__dirname, "src/less")
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        include: path.join(__dirname, "src"),
        exclude: /node_modules/,
        use: [
          {
            loader: "eslint-loader",
            options: {
              cache: true,
              useEslintrc: true,
              failOnError: false
            }
          }
        ]
      },
      {
        test: /\.js$/,
        include: path.join(__dirname, "src"),
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: { minimize: true }
          },
          'less-loader']
        })
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      }
    ]
  },
  plugins: ([
    new ExtractTextPlugin({
      filename: '/index.css',
      allChunks: true
    }),
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve("public", "index.html"),
      template: path.join(__dirname, "templates/index.pug"),
      cache: false,
      inject: false,
      hash: true
    }),
  ]),
  devServer: {
    contentBase: path.join(__dirname, "public"),
    port: 9000,
    hot: true,
    inline: true,
    historyApiFallback: true,
    publicPath: "/"
  },
  performance: {
    hints: false
  },
  watch: false,
  watchOptions: {
    aggregateTimeout: 300,
    poll: true
  }
}
