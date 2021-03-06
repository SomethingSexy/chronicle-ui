import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import merge from 'webpack-merge';
import common from './webpack.common.js';
import path from 'path';

const config = merge(common, {
  devtool: 'none',
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.join(process.cwd(), 'build/public/**/*')],
    })
  ]
});

export default [config];