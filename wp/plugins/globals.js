const webpack = require('webpack')
const pkg = require('../../package.json')
require('../../src/globals')

const { SENTRY_URL, STORYBOOK_ENV, GIT_REVISION } = process.env


module.exports = new webpack.DefinePlugin({
  __APP_VERSION__: JSON.stringify(pkg.version),
  __GLOBAL_STYLES__: JSON.stringify(__GLOBAL_STYLES__),
  __DEV__,
  __PROD__,
  __GIT_REVISION__: JSON.stringify(GIT_REVISION),
  __SENTRY_URL__: JSON.stringify(SENTRY_URL || null),
  __STORYBOOK_ENV__: JSON.stringify(STORYBOOK_ENV),
  'process.env.NODE_ENV': JSON.stringify(__ENV__),
})