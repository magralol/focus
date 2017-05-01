var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
 entry: './public/src/js/main.js',
 output: {
   filename: './public/build/main.js',
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
    new ExtractTextPlugin({ filename: './public/build/style.css', disable: false, allChunks: true })
 ]
};