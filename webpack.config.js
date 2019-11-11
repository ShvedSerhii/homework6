var path = require("path")
var ExtractTextPlugin = require("extract-text-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: "./src/script",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "build.js"
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["file-loader?name=[name].[ext]", "extract-loader", "html-loader"]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"]
        })
      },
      {
        test: /\.(jpe?g|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "img/[name].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [new ExtractTextPlugin("styles.css")]
}
