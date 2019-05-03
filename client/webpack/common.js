const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, '..'),
  entry: {
    'app.bundle': path.resolve(__dirname, '../src/js/index.js'),
    'style.bundle': path.resolve(__dirname, '../src/sass/index.scss'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[local]_[hash:base64:5]_[hash]',
            },
          },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              data: '@import "variables";',
              includePaths: [
                path.resolve(__dirname, '../src/sass/'),
              ],
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]?[hash]',
          },
        },
      },
      {
        test: /\.(ttf|woff(2)?)(\?[a-z0-9]+)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin ({
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/public/index.html'),
    }),
  ],
};
