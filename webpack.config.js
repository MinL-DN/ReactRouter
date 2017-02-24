'use strict';
var webpack = require('webpack');
var path = require('path');

const num = 3;
var obj_entry = {};

for(let a = 1; a <= num; a++){
    let _key = './demo' + a + '/main';
    obj_entry[_key] = _key + '.js';
}

module.exports = {
    entry: obj_entry,
    output: {
        path: './',
        filename: '[name].entry.js',
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader',
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.less'],
        alias: {
            // 为了Demo3做的便捷处理
            D3less: path.join(__dirname, './demo3/public/less/spa'),
            D3jsx: path.join(__dirname, './demo3/public/components'),
        }
    },

    // react配合router插件 全局插件
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            React: 'react',
            ReactDOM: 'react-dom'
        })
    ],
    devtool: 'source-map'
};
