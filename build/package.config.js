/**
 * Created by fight on 2019/3/4.
 */
const path = require('path');
const webpack = require('webpack');
const vueLoaderConfig = require('./vue-loader.conf')


module.exports = {
    entry: {
        'kting': './src/comps/index.js'
    },
    output: {
        path: path.resolve(__dirname, '../package'),
        publicPath: '/package/',
        library: 'kting',
        libraryTarget: 'umd',
        // umdNamedDefine: true
    },
    externals: {
        vue: {
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue'
        }
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: vueLoaderConfig
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }, {
            test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
            loader: 'url-loader?limit=8000'
        }]
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin()

    ]
}
