const path = require("path")
const webpack = require("webpack")

module.exports = {
  devtool: "inline-source-map",
  entry: {
    index: ["babel-polyfill", "./src/index.js"],
    typing: ["babel-polyfill", "./src/typing.js"]
  },
  output: {
    path: path.join(__dirname, "public"),
    pathinfo: true,
    filename: "[name].js",
    publicPath: "/"
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [".js"],
    alias: {}
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
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "less-loader"
        }]
      }
    ]
  },
  plugins: ([
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]),
  devServer: {
    contentBase: path.join(__dirname, "public"),
    compress: true,
    port: 9000,
    hot: true
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
