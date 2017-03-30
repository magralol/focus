var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
 entry: './src/js/main.js',
 output: {
   filename: './build/main.js',
   path: __dirname
 },
 module: {
   rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('css-loader!sass-loader')
      }
   ]
 },
 resolve: {
   extensions: [".vue", ".js", "scss", "css"]
 },
 plugins: [
    new ExtractTextPlugin({ filename: './build/style.css', disable: false, allChunks: true })
 ]
};