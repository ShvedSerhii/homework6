var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: "./script",
  output: {
    path: path.resolve(__dirname),
    filename: "build.js"
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },  {
        test: /\.(ttf|eot|svg|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        // include: SRC,
        use: [{
            loader: 'file-loader'
        }]
    }]
},
  plugins: [
    new ExtractTextPlugin('styles.css')
   ]
};
