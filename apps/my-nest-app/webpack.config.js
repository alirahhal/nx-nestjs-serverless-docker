const webpack = require("webpack");
const path = require('path');
var nodeExternals = require('webpack-node-externals');
const CopyPlugin = require("copy-webpack-plugin");
const {
  merge
} = require('webpack-merge');

module.exports = (options) => {
  return merge(options, {
    target: 'node',
    output: {
      path: path.resolve(__dirname, '../../dist/apps/my-nest-app/'),
      filename: 'lambda.js',
      libraryTarget: 'commonjs2',
    },
    plugins: [
      new webpack.IgnorePlugin({
        checkResource(resource) {
          const lazyImports = ['@nestjs/microservices', '@nestjs/microservices/microservices-module', '@nestjs/websockets/socket-module', '@nestjs/platform-express', 'cache-manager', 'class-validator', 'class-transformer'];
          if (!lazyImports.includes(resource)) {
            return false;
          }
          try {
            require.resolve(resource);
          } catch (err) {
            return true;
          }
          return false;
        },
      }),
      new CopyPlugin({
        patterns: [{
            from: path.resolve(__dirname, '../../node_modules/@nestjs'),
            to: path.resolve(__dirname, '../../dist/apps/my-nest-app/node_modules/@nestjs')
          },
          {
            from: path.resolve(__dirname, '../../node_modules/cache-manager'),
            to: path.resolve(__dirname, '../../dist/apps/my-nest-app/node_modules/cache-manager')
          },
          {
            from: path.resolve(__dirname, '../../node_modules/class-transformer'),
            to: path.resolve(__dirname, '../../dist/apps/my-nest-app/node_modules/class-transformer')
          },
          {
            from: path.resolve(__dirname, '../../node_modules/iterare'),
            to: path.resolve(__dirname, '../../dist/apps/my-nest-app/node_modules/iterare')
          },
          {
            from: path.resolve(__dirname, '../../node_modules/reflect-metadata'),
            to: path.resolve(__dirname, '../../dist/apps/my-nest-app/node_modules/reflect-metadata')
          },
          {
            from: path.resolve(__dirname, '../../node_modules/tslib'),
            to: path.resolve(__dirname, '../../dist/apps/my-nest-app/node_modules/tslib')
          },
        ],
      }),
    ],
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    module: {
      rules: [{
          test: /\.tsx?$/,
          loader: "ts-loader"
        }, {
          test: /\.ts$/,
          loader: 'ts-loader'
        },
        {
          test: /\.node$/,
          use: 'node-loader',
        },
      ]
    }
  });
};
