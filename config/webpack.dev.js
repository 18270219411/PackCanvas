const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  entry: {
    index: ['babel-polyfill', path.join(__dirname, '../src/index.tsx')],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/index.html'),
      title: 'Slice for Figma',
      description: '',
      debug: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      CONFIGS: JSON.stringify({
        isDebug: true,
        isWeb: true,
      }),
    })
  ],
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    port: 22222,
    host: '0.0.0.0',
    hot: true,
    contentBase: '../dist',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /(node_modules|dist)/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
});
