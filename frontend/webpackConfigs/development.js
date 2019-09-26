const merge = require('webpack-merge');
const baseConfig = require('./base');

module.exports = merge(baseConfig, {
  mode: 'development',

  devtool: 'cheap-module-eval-source-map',

  devServer: {
    historyApiFallback:{
      index: '/'
    },
    contentBase: './dist',
    port: 3000,
  },
});