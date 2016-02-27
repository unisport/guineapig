var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        sample: './src/samplemain.js'
    },
    output: {
        path: __dirname, filename: '/public/[name]/bundle.js'
    },
    module: {}
};
