const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const SriPlugin = require('webpack-subresource-integrity');

const BUILD_DIR = path.resolve('./build');
const isProd = process.ENV === 'production';

module.exports = {
  mode: isProd ? 'production' : 'development',
  devtool: 'source-map',
  entry: {
    app: ['./src/index.js'],
  },
  output: {
    filename: '[name].[contenthash].js',
    path: BUILD_DIR,
    publicPath: '/',
    crossOriginLoading: 'anonymous',
  },
  target: 'web',
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /node_modules/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    minimizer: [
      new UglifyJSPlugin({
        sourceMap: true,
        parallel: true,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      inject: true,
      minify: isProd,
    }),
    new SriPlugin({
      hashFuncNames: ['sha256'],
      enabled: true,
    }),
  ],
  devServer: {
    port: process.env.PORT || 3000,
    contentBase: BUILD_DIR,
    inline: true,
    hot: false,
    clientLogLevel: 'info',
    historyApiFallback: false,
    publicPath: '/',
    disableHostCheck: true,
  },
};
