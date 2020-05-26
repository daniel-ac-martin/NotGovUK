const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require('webpack-node-externals');
const cssLoader = require.resolve('css-loader');
const fileLoader = require.resolve('file-loader');
const resolveUrlLoader = require.resolve('resolve-url-loader');
const sassLoader = require.resolve('sass-loader');
const styleLoader = require.resolve('style-loader');
const tsLoader = require.resolve('ts-loader');

const defaultOptions = {
  entry: './src/index.ts',
  outDir: './dist',
  production: true,
  server: false,
  tsConfig: 'tsconfig.json'
};

const webpackConfExternal = (context, request, callback) => {
  if (/\.config(\.js)?$/i.test(request)){
    return callback(null, 'commonjs ' + request);
  }
  return callback();
};

const entrypointsExternal = (context, request, callback) => {
  if (/entrypoints(\.json)?$/i.test(request)){
    return callback(null, 'commonjs ' + request);
  }
  return callback();
};

module.exports = function (options) {
  options = options || {};
  options = Object.assign({}, defaultOptions, options);

  if (options.baseDir === undefined) {
    throw new ReferenceError('No `baseDir` option provided; typically this should be set to `__dirname`');
  }

  const devMode = !options.production;
  const serverMode = options.server;
  const hashInName = !devMode;
  const emitFile = !serverMode;
  const jsDir = serverMode ? '' : 'js/';

  return {
    mode: devMode ? 'development' : 'production',
    context: path.resolve(options.baseDir),
    entry: (
      serverMode
        ? {
          server: options.entry
        } : {
          client: [
            options.entry,
            ...(
              devMode
                ? ['webpack-hot-middleware/client']
                : []
            )
          ]
        }
    ),
    target: serverMode ? 'node' : 'web',
    node: serverMode ? false : undefined,
    externals: (
      serverMode
        ? [
          nodeExternals({
            whitelist: [/\.(?!(?:js|json)$).{1,5}$/i]
          }),
          webpackConfExternal,
          entrypointsExternal
        ] : undefined
    ),
    output: {
      filename: (
        serverMode
          ? 'index.js'
          : jsDir + (hashInName ? '[name].[hash:8].bundle.js' : '[name].bundle.js')
      ),
      chunkFilename: jsDir + (hashInName ? '[name].[contenthash:8].chunk.js' : '[name].chunk.js'),
      path: path.resolve(options.baseDir, options.outDir),
      publicPath: '/public/'
    },
    optimization: serverMode ? undefined : {
      moduleIds: 'hashed',
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          monorepo: {
            test: /[\\/]node_modules[\\/]@NotGovUK[\\/]/,
            name: 'monorepo',
            chunks: 'all',
            priority: 1
          },
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 0
          }
        },
        chunks: 'all'
      }
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: tsLoader,
              options: {
                configFile: options.tsConfig,
                projectReferences: true,
                transpileOnly: devMode
              }
            }
          ]
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            styleLoader,
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: devMode
              }
            },
            // Translates CSS into CommonJS
            cssLoader,
            // Compiles Sass to CSS
            {
              loader: resolveUrlLoader,
              options: {
                sourceMap: false
              }
            },
            sassLoader
          ]
        },
        {
          test: /\.(woff2?)$/,
          use: [
            {
              loader: fileLoader,
              options: {
                emitFile: emitFile,
                name: hashInName ? 'fonts/[name].[contenthash:8].[ext]' : 'fonts/[name].[ext]'
              }
            }
          ]
        },
        {
          test: /\.(gif|jpe?g|png|svg)$/,
          use: [
            {
              loader: fileLoader,
              options: {
                emitFile: emitFile,
                name: hashInName ? 'images/[name].[contenthash:8].[ext]' : 'images/[name].[ext]'
              }
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ]
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: options.outDir,
      hot: true
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanStaleWebpackAssets: !devMode
      }),
      new ManifestPlugin({
        fileName: 'entrypoints.json',
        generate: (seed, files, entrypoints) => entrypoints
      }),
      new webpack.DefinePlugin({
        'process.env': {
          WEBPACK: JSON.stringify(true)
        }
      }),
      new MiniCssExtractPlugin({
        filename: hashInName ? 'css/[name].[contenthash:8].css': 'css/[name].css',
        chunkFilename: hashInName ? 'css/[name].[contenthash:8].chunk.css' : 'css/[name].chunk.css'
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ]
  };
};
