const path = require('path');
const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    // Tambahkan InjectManifest untuk development juga
    new InjectManifest({
      swSrc: path.resolve(__dirname, 'src/scripts/sw.js'),
      swDest: 'sw.bundle.js',
      mode: 'development',
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    open: false,
    port: 9000,
    client: {
      overlay: {
        errors: true,
        warnings: true,
      },
    },
  },
});