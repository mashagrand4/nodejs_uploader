import base from './webpack.config.base.babel';
<<<<<<< Updated upstream
=======

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
>>>>>>> Stashed changes

export default {
  ...base,
  mode: 'production',
<<<<<<< Updated upstream
=======
  plugins: [
    new UglifyJSPlugin(),
  ],
>>>>>>> Stashed changes
};
