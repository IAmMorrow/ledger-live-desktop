const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
    globals,
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      filename: 'index.html',
      title: 'Ledger Live',
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
      chunkFilename: '[id].styles.css'
    })
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
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules'
    ]
  },
  devServer: {
    publicPath: '/wp/dist/',
    inline: true,
    port: 8080
  }
}