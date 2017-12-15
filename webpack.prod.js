const path = require('path');
const merge = require('webpack-merge');
//import the common settings of webpack
const common = require('./webpack.common');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const uglifyJSPlugin = new UglifyJSPlugin();
const babelOptions = {
    "presets": [
        ["env", {
            "targets": {
                "browsers": ["last 2 versions", "safari >= 7"]
            }
        }]
    ]
};
module.exports = merge(common, {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: babelOptions
                    }
                ]
            }
        ]
    },
    devtool: 'cheap-module-source-map',
    plugins: [
        uglifyJSPlugin
    ],
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.min.js'
    }
})