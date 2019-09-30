const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',

  entry: './src/index.js',

  output: {
    path: path.resolve('.', 'dist'),
    filename: 'index.bundle.js'
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: 'CarWash'
    })
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        }
      },

      {
        test: /\.css$/,
        exclude: [/node_modules/],
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
      },

      {
        test: /\.less$/,
        exclude: [/node_modules/],
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            ident: '[name]--[local]--[hash:base64:5]',
            options: {
              modules: true
            }
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            }
          }
        ]
      },

      {
        test: /\.less$/,
        exclude: [/src/],
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            }
          }
        ]
      },

      {
        test: /\.(png|jpe?g|gif)$/i,
        exclude: [/node_modules/],
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      }
    ]
  },

  externals: {}
};
