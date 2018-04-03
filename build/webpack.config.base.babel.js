import path from 'path';
const HtmlWebpackPlugin = require('html-webpack-plugin')

export default {
  entry: {
    main: path.resolve(__dirname, '../src/frontend/js/imagesPreview.js'),
    login: path.resolve(__dirname, '../src/frontend/js/validation.js'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].bundle.js',
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
        use: [
          'style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: 'file-loader',
      },
        {
            test: /\.hbs$/,
            loader: "handlebars-template-loader"
        },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
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
      })
  ],
};
