var webpack = require('webpack');
var path = require('path');
const autoprefixer = require('autoprefixer');

var BUILD_DIR = path.resolve(__dirname, '../static/build');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
  entry: APP_DIR + '\\Components\\index.jsx',
  output: {
    path: BUILD_DIR,
    filename: '\\app.js'
  },
  module : {
   loaders : [
     {
       test : /\.jsx?/,
       include : APP_DIR,
       loader : 'babel',
     },
     {
        test: /\.(scss|css)$/,
        loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass'
      }
   ]
 },
 resolve: {
   extensions: ['', '.scss', '.js', '.json'],
 },
 postcss: [autoprefixer]
};

module.exports = config;
