const path = require('path');
const globals = require('./plugins/globals')

const babelConfig = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          electron: '2.0.18'
        }
      }
    ],
    '@babel/preset-flow',
    '@babel/preset-react'
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
  target: 'electron-renderer',
  mode: process.env.NODE_ENV,
  entry: './src/renderer/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'renderer.bundle.js'
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
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
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