const path = require("path");

module.exports = {
    entry: {
        'login' : path.resolve(__dirname, 'src/login.js'),
        'main' : path.resolve(__dirname, 'src/main.js'),
        'profile' : path.resolve(__dirname, 'src/profile.js'),
        'reg' : path.resolve(__dirname, 'src/reg.js'),
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js"
    }
};