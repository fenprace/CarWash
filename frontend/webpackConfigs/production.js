const merge = require('webpack-merge');
const baseConfig = require('./base');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(baseConfig, {
  mode: 'production',

  plugins: [
    new CleanWebpackPlugin(), // Automatically clean ./dist/* before each time building
  ],
});