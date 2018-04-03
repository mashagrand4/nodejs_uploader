import base from './webpack.config.base.babel';
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

export default {
  ...base,
  mode: 'production',
    plugins: [
        new UglifyJSPlugin()
    ]
};
