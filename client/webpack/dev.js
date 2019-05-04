const merge = require('webpack-merge');
const path = require('path');

const common = require('./common');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    port: 9001,
    historyApiFallback: true,
    openPage: 'store',
  },
});
