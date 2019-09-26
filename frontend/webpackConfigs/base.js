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
    // Generate index.html
    // @see 📝 / Webpack & Ant Design / HtmlWebpackPlugin, automatically generate an index.html
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: 'CarWash'
    })
  ],

  module: {
    rules: [
      // Compile JS files before import
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: [
            '@babel/plugin-proposal-class-properties',

            // Import 'antd' on demand
            // @see 📝 / Webpack & Ant Design / babel-plugin-import
            ['import', { libraryName: 'antd', style: true }]
          ]
        }
      },

      // Import CSS file in JS
      // @see 📝 / Webpack & Ant Design / style-loader Guide
      // @see 📝 / Webpack & Ant Design / css-loader Guide
      {
        test: /\.css$/,
        exclude: [/node_modules/],
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
      },

      // Import LESS file in JS
      // @see 📝 / Webpack & Ant Design / less-loader Guide
      {
        test: /\.less$/,
        include: [/node_modules/],
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
              javascriptEnabled: true, // Required if use less 4.0+
            }
          }
        ]
      },

      // Import image file in JS
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
