const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const path = require('path');

const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  entry: {
    ui: path.join(__dirname, '../src/index.tsx'),
    main: path.join(__dirname, '../src/plugin/main.ts'),
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '../dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/index.html'),
      filename: 'ui.html',
      title: 'Auto Compress Export',
      description: '',
      chunks: ['ui'],
      inlineSource: '.(js)$',
      debug: true,
    }),
    new HtmlWebpackInlineSourcePlugin(),
    new webpack.DefinePlugin({
      CONFIGS: JSON.stringify({
        isDebug: true,
        isWeb: false,
      }),
    }),
  ],
  devtool: 'inline-source-map',
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
