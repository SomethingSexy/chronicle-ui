import webpack from 'webpack';
import webpackConfig from '../webpack.dev';
import webpackConfigProd from '../webpack.prod';

/**
 * Creates application bundles from the source files.
 */
const bundle = (env) => {
  const config = env === 'dev' ? webpackConfig : webpackConfigProd
  return new Promise((resolve, reject) => {
    webpack(config).run((err, stats) => {
      if (err) {
        return reject(err);
      }

      console.info(stats.toString(config[0].stats));
      if (stats.hasErrors()) {
        return reject(new Error('Webpack compilation errors'));
      }

      return resolve();
    });
  });
}

export default bundle;
