var path = require('path');
var webpack = require('webpack');

var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');
var pathToReactDom = path.resolve(node_modules, 'react-dom/dist/react-dom.min.js');

var config = {
  entry: [
    'webpack/hot/dev-server',
    path.resolve(__dirname, './app/main.jsx')
  ],
  resolve: {
    extensions: ['', '.js', '.json', '.jsx', '.css'],
    alias: {
      'react': pathToReact,
      'react-dom': pathToReactDom,
    }
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    noParse: [pathToReact],
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react']
      }
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url?limit=50000'
    }]
  }
};

module.exports = config;
