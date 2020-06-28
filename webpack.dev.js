import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import merge from 'webpack-merge';
import common from './webpack.common.js';

const config = merge(common, {
  mode: 'development',
  devtool: process.env.WEBPACK_DEVTOOL || 'cheap-module-eval-source-map',
  plugins: [new CleanWebpackPlugin()]
});

export default [config];
