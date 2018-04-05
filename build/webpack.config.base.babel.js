import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import NodemonPlugin from 'nodemon-webpack-plugin';

export default {
  entry: {
    main: path.resolve(__dirname, '../src/frontend/js/imagesPreview.js'),
    login: path.resolve(__dirname, '../src/frontend/js/validation.js'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].bundle.js',
    publicPath: 'dist',
  },
  watch: true,
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
    new HtmlWebpackPlugin({
      filename: 'profile.hbs',
      template: 'src/backend/views/profile.hbs',
    }),
    new CleanWebpackPlugin('dist'),
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
  ],
};
