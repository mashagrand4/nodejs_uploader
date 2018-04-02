'use strict';

var path = require("path");

var base = {
    entry: {
        'main': path.resolve(__dirname, '../src/frontend/js/imagesPreview.js'),
        'login': path.resolve(__dirname, '../src/frontend/js/validation.js')
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js"
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }, {
            test: /\.(css)$/,
            use: {
                loader: 'style!css'
            }
        }, {
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'file-loader',
                options: {}
            }]
        }]
    }
};

module.exports = base;
//# sourceMappingURL=webpack.config.base.js.map