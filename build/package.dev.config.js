/**
 * Created by fight on 2019/3/4.
 */

const webpack = require('webpack')
const merge = require('webpack-merge')
const basewebpackConfig = require('./package.config')
const ExtractTestPlugin = require('extract-text-webpack-plugin')
const extractScss = new ExtractTestPlugin('/kting.min.css')

module.export = merge(basewebpackConfig, {
    output: {
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.scss$/i,
            loader: extractScss.extract(['css-loader', 'scss-loader'])
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        extractScss
    ]
})