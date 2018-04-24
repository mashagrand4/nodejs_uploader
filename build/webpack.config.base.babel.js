import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import NodemonPlugin from 'nodemon-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const CopyWebpackPlugin = require('copy-webpack-plugin');

export default {
  entry: {
    main: path.resolve(__dirname, '../src/frontend/js/imagesPreview.js'),
    login: path.resolve(__dirname, '../src/frontend/js/validation.js'),
  },
  resolve: {
    alias: {
      '@root': path.resolve(__dirname, '.'),
      '@frontend': path.resolve(__dirname, 'src/frontend'),
    },
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].bundle.js',
    publicPath: 'dist',
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
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'resolve-url-loader', 'sass-loader?sourceMap'],
        }),
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'images',
            publicPath: '../images/',
          },
        },
      },
      {
        test: /\.woff2?$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'fonts',
            publicPath: '../fonts/',
          },
        },
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-template-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
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
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, '../src/backend/views/profile.hbs'), to: path.resolve(__dirname, '../dist/templates/profile.hbs') },
    ]),
    new CleanWebpackPlugin('../dist'),
    new NodemonPlugin({
      watch: [
        path.resolve('./src'),
        path.resolve('./app.js'),
      ],
      script: './app.js',
      execMap: {
        js: 'babel-node',
      },
      legacyWatch: true,
    }),
    new ExtractTextPlugin('styles/styles.css'),
  ],
};
