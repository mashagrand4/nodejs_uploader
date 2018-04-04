import path from 'path';
<<<<<<< Updated upstream
import HtmlWebpackPlugin from 'html-webpack-plugin';
=======

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
>>>>>>> Stashed changes

export default {
  entry: {
    main: path.resolve(__dirname, '../src/frontend/js/imagesPreview.js'),
    login: path.resolve(__dirname, '../src/frontend/js/validation.js'),
  },
  output: {
<<<<<<< Updated upstream
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].bundle.js',
    publicPath: 'dist',
=======
    path: path.resolve(__dirname, '/dist'),
    filename: '[name].bundle.js',
    publicPath: '/assets',
>>>>>>> Stashed changes
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(css)$/,
<<<<<<< Updated upstream
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'images',
          },
        },
=======
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: 'file-loader',
>>>>>>> Stashed changes
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-template-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
<<<<<<< Updated upstream
      filename: 'login.html',
      template: 'src/backend/views/login.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'registration.html',
      template: 'src/backend/views/reg.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/backend/views/index.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'profile.hbs',
      template: 'src/backend/views/profile.hbs',
    }),
=======
      filename: 'assets/login.html',
      template: 'src/backend/views/login.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'assets/registration.html',
      template: 'src/backend/views/reg.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'assets/index.html',
      template: 'src/backend/views/index.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'assets/profile.hbs',
      template: 'src/backend/views/profile.hbs',
    }),
    new ExtractTextPlugin('assets/css/styles.css'),
    new CleanWebpackPlugin(['dist']),
>>>>>>> Stashed changes
  ],
};
