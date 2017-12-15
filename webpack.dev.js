const path = require('path');
const merge = require('webpack-merge');
//import the common settings of webpack
const common = require('./webpack.common');

module.exports = merge(common, {
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    },
    devtool: 'source-map',
    devServer: {
        contentBase: './src',
        port: 2333,
        open: true
    },
    plugins: [],
    output: {
        path: path.resolve(__dirname, 'src'),
        filename: 'bundle.js'
    }
})