const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const paths = {
  buildPath: path.resolve('../priv/static')
};

module.exports = {
  entry: { app: './src/app.js' },
  output: {
    path: paths.buildPath,
    filename: 'js/[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('css/[name].css'),
    new CopyWebpackPlugin([{ from: path.join(__dirname, 'static') }])
  ],
  resolve: {
    modules: ['node_modules', path.join(__dirname, 'src')]
  },
  devtool: 'eval-cheap-module-source-map'
};
