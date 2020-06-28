import CompressionPlugin from 'compression-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const outputPath = path.resolve(__dirname, `./build/public`);

const output = {
  path: outputPath,
  // TODO: Add back when we publish this
  // publicPath: '/',
  // filename: '[name].js',
  // chunkFilename: '[name].js'
};

const plugins = [
  new CompressionPlugin({
    algorithm: 'gzip',
    filename: '[path].gz[query]',
    test: /\.js$|\.html$/,
    threshold: 10240,
    minRatio: 0.8
  }),
  new MiniCssExtractPlugin({
    filename: "[name].css",
  }),
  new OptimizeCssAssetsPlugin(),
  new HtmlWebpackPlugin({
    template: './src/client/index.html'
  })
];

export default {
  entry: {
    main: [
      './src/client/client.tsx'
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "initial",
        },
        style: {
          name: 'style',
          test: /\.css$/,
          chunks: 'all',
        }
      }
    },
    runtimeChunk: {
      name: "manifest",
    }
  },
  output,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    unsafeCache: true
  },
  plugins,
  module: {
    rules: [{
      test: /\.js$/,
      use: 'jsx-compress-loader'
    }, {
      test: /\.(js|ts|tsx)?$/,
      exclude: /node_modules/,
      include: [
        path.resolve(__dirname, 'src')
      ],
      use: [{
        loader: 'ts-loader',
        options: {
          experimentalWatchApi: true,
          experimentalFileCaching: true,
          onlyCompileBundledFiles: true,
          transpileOnly: true
        }
      }]
    }, {
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader']
    }, {
      test: /\.less$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
    }, {
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|jpeg)(\?v=\d+.\d+.\d+)?$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '/[name]-[hash].[ext]',
        }
      }]
    }]
  }
};
