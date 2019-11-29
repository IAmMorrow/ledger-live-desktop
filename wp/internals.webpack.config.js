const path = require('path');
const globals = require('./plugins/globals')

const babelConfig = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-flow',
  ],
  plugins: [
    "@babel/plugin-proposal-export-default-from",
    "@babel/plugin-proposal-export-namespace-from",
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-syntax-import-meta",
    ["@babel/plugin-proposal-class-properties", { "loose": true }]
  ]
}

module.exports = {
  target: 'node',
  mode: process.env.NODE_ENV,
  entry: './src/internals/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'internals.bundle.js'
  },
  plugins: [
    globals
  ],
  module: {
    rules: [
      {
        test: /\.js$/i,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: babelConfig
      },
    ],
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules'
    ]
  }
}