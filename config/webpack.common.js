const path = require('path');

module.exports = {
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/',
  },
  resolve: {
    modules: ['node_modules', path.join(__dirname, 'src')],
    alias: {
      '@i18n': path.resolve(__dirname, '../src/i18n'),
      '@models': path.resolve(__dirname, '../src/models'),
      '@helper': path.resolve(__dirname, '../src/helper'),
      '@actions': path.resolve(__dirname, '../src/actions'),
      '@figma': path.resolve(__dirname, '../src/figma'),
      '@plugin': path.resolve(__dirname, '../src/plugin'),
      '@constants': path.resolve(__dirname, '../src/constants'),
      '@components': path.resolve(__dirname, '../src/components'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|dist)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|dist)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.css/,
        exclude: /(node_modules|dist)/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico|cur|woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
    ],
  },
};
