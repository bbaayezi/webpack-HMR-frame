const path = require('path');
const merge = require('webpack-merge');
//import the common settings of webpack
const common = require('./webpack.common');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const uglifyJSPlugin = new UglifyJSPlugin();
// Extra text plugin
var ExtraTextPlugin = require('extract-text-webpack-plugin');
// Extra html
var HTMLWebpackPlugin = require('html-webpack-plugin');

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
            },
            {
                test: /\.scss$/,
                use: ExtraTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!sass-loader'
                })
            },
            {
                test: /\.css$/,
                use: ExtraTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            }
        ]
    },
    devtool: 'cheap-module-source-map',
    plugins: [
        uglifyJSPlugin,
        new ExtraTextPlugin('style.css'),
        new HTMLWebpackPlugin({
            filename: 'index.html',
            inject: 'body',
            template: './src/index.html'
        })
    ],
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.min.js'
    }
})