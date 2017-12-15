const path = require('path');
module.exports = {
    entry: ['babel-polyfill', './src/js/main.js'],
    resolve: {
        extensions: ['.js', '.json']
    }
}