/**
 * Created by fight on 2019/3/4.
 */
const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    'kting': './src/comps/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../package'),
    publicPath: '/package',
    library: 'kting',
  },
  module: {
    loaders: [{
      test: '/\.vue$/',
      loader: 'vue-loader',
      options: {
        loaders: {
          css: 'vue-style-loder!css-loader',
          sass: 'vue-style-loder!css-loader!sass-loader'
        },
        postLoaders: {
          html: 'babel-loader'
        }
      }
    }, {
      test: /\.js$/,
      use: [
        'style-loader',
        'css-loader',
        'autoprefixer-loader'
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
