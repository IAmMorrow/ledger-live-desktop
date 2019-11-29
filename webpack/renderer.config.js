const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const webpackRenderer = require('electron-webpack/webpack.renderer.config')

const plugins = require('./plugins')
const resolve = require('./resolve')
const rules = require('./rules')

webpackRenderer().then(c => console.log(JSON.stringify(c.plugins, undefined, 2)))

const config = {
  mode: __ENV__,
  plugins: [...plugins('renderer'), new HardSourceWebpackPlugin()],
  devtool: 'cheap-module-source-map',
  resolve,
  module: {
    rules,
  },
  devServer: {
    historyApiFallback: true,
  },
  optimization: {
    minimize: false,
  },
}

if (__DEV__) {
  Object.assign(config, {
    output: {
      publicPath: '/',
    },
  })
}

module.exports = config
