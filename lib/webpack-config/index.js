const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require('webpack-node-externals');
const babelLoader = require.resolve('babel-loader');
const babelPresetEnv = require.resolve('@babel/preset-env');
const babelPresetReact = require.resolve('@babel/preset-react');
const babelPluginExportNS = require.resolve('@babel/plugin-proposal-export-namespace-from');
const cssLoader = require.resolve('css-loader');
const fileLoader = require.resolve('file-loader');
const ignoreLoader = require.resolve('ignore-loader');
const mdxLoader = require.resolve('@mdx-js/loader');
const resolveUrlLoader = require.resolve('resolve-url-loader');
const sassLoader = require.resolve('sass-loader');
const styleLoader = require.resolve('style-loader');
const tsLoader = require.resolve('ts-loader');

const defaultOptions = {
  entry: './src/index.ts',
  docs: false,
  outDir: './dist',
  production: true,
  server: false,
  tsConfig: 'tsconfig.json'
};

const id = e => e;

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
  const docs = options.docs;

  const cssLoaders = [
    // Creates `style` nodes from JS strings
    devMode && styleLoader,
    // Creates CSS asset files
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: devMode
      }
    },
    // Translates CSS into CommonJS
    cssLoader,
    // Translates url()
    {
      loader: resolveUrlLoader,
      options: {
        sourceMap: false
      }
    }
  ].filter(id);

  const createDocsCompiler = docs && require('@storybook/addon-docs/mdx-compiler-plugin');
  const reactDocgenTypescriptLoader = docs && require.resolve("react-docgen-typescript-loader");

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
    node: serverMode ? false : {
      fs: 'empty'
    },
    externals: (
      serverMode
        ? ([
          devMode && nodeExternals({
            whitelist: [/\.(?!(?:[cm]?js|json)$).{1,5}$/i, /^@not-govuk[\\/](?!(?:.+[\\/]node_modules[\\/]))/]
          }),
          webpackConfExternal,
          entrypointsExternal
        ]).filter(id) : undefined
    ),
    output: {
      filename: (
        serverMode
          ? 'index.js'
          : jsDir + (hashInName ? '[name].[hash:8].bundle.js' : '[name].bundle.js')
      ),
      chunkFilename: jsDir + (hashInName ? '[name].[contenthash:8].chunk.js' : '[name].chunk.js'),
      path: path.resolve(options.baseDir, options.outDir),
      publicPath: '/public/',
      libraryTarget: serverMode ? 'commonjs2' : undefined
    },
    optimization: serverMode ? undefined : {
      moduleIds: 'hashed',
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
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
              loader: babelLoader,
              options: {
                presets: [
                  [
                    babelPresetEnv,
                    {
                      targets: (
                        serverMode
                          ? { node: true }
                          : (
                          devMode
                            ? { esmodules: true }
                            : "> 0.2%, not dead, not op_mini all"
                        )
                      )
                    }
                  ]
                ],
                plugins: [ babelPluginExportNS ]
              }
            },
            {
              loader: tsLoader,
              options: {
                configFile: options.tsConfig,
                transpileOnly: devMode
              }
            },
            docs && {
              loader: reactDocgenTypescriptLoader,
              options: {
                // Provide the path to your tsconfig.json so that your stories can
                // display types from outside each individual story.
                tsconfigPath: path.resolve(__dirname, '../../tsconfig.webpack.json')
              }
            }
          ]
        },
        docs && {
          test: /\.(stories|story)\.mdx$/,
          use: [
            {
              loader: babelLoader,
              options: {
                presets: [
                  babelPresetEnv,
                  babelPresetReact
                ]
              }
            },
            {
              loader: mdxLoader,
              options: {
                compilers: [createDocsCompiler({})]
              }
            }
          ]
        },
        {
          test: /\.mdx?$/,
          exclude: /\.(stories|story).mdx$/,
          use: [
            {
              loader: babelLoader,
              options: {
                presets: [
                  babelPresetEnv,
                  babelPresetReact
                ]
              }
            },
            mdxLoader
          ]
        },
        {
          test: /\.css$/i,
          use: serverMode ? [ ignoreLoader ] : cssLoaders
        },
        {
          test: /\.s[ac]ss$/i,
          use: serverMode ? [ ignoreLoader ] : [
            ...cssLoaders,
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
    devtool: devMode ? 'eval-source-map' : 'nosources-source-map',
    devServer: {
      contentBase: options.outDir,
      hot: true
    },
    plugins: [
      devMode && new CleanWebpackPlugin(),
      new ManifestPlugin({
        fileName: 'entrypoints.json',
        generate: (seed, files, entrypoints) => entrypoints
      }),
      new webpack.DefinePlugin({
        'global.GENTLY': false,
        'process.env.WEBPACK': JSON.stringify(true)
      }),
      !serverMode && new MiniCssExtractPlugin({
        filename: hashInName ? 'css/[name].[contenthash:8].css': 'css/[name].css',
        chunkFilename: hashInName ? 'css/[name].[contenthash:8].chunk.css' : 'css/[name].chunk.css'
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ].filter(id)
  };
};
