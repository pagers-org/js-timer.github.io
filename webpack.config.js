// const { URL } = require('./src/constants/index.js');
const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  devServer: {
    port: 5510,
    hot: true,
    open: true,
  },
  devtool: 'inline-source-map',
  target: ['es5', 'web'],
  entry: './target/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js',
    clean: true,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, './target/index.html'),
      favicon: './favicon.ico',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({ filename: 'app.css' }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(woff|woff2|eot)$/,
        use: { loader: 'url-loader' },
      },
      // 바벨 로더 적용
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  ie: '10',
                },
              },
            ],
          ],
        },
        exclude: ['/node_modules'],
      },
    ],
  },
};
