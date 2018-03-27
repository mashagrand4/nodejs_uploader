module.exports = {
    context: __dirname,
    entry: './app.js',
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    },
    node: {
        dns: 'mock',
        net: 'mock',
        fs: 'empty',
        tls: "empty",
        module: "empty"
    }
    // module: {
    //     loaders: {
    //
    //     }
    // }
};