var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        guineapig: './src/index.js'
    },
    output: {
        path: path.join('dist', 'js'),
        filename: '[name].js',
        library: ['GuineaPig'],
        libraryTarget: 'umd'
    }
};
