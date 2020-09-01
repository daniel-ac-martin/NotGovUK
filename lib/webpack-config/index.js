const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require('webpack-node-externals');
const version = require('./package.json').version;
const babelVersion = require('@babel/core/package.json').version;
const babelLoaderVersion = require('babel-loader/package.json').version;
const babelLoader = require.resolve('babel-loader');
const babelPresetEnv = require.resolve('@babel/preset-env');
const babelPresetReact = require.resolve('@babel/preset-react');
const babelPresetTypeScript = require.resolve('@babel/preset-typescript');
const babelPluginExportNS = require.resolve('@babel/plugin-proposal-export-namespace-from');
const babelPluginClassProperties = require.resolve('@babel/plugin-proposal-class-properties');
const cssLoader = require.resolve('css-loader');
const fileLoader = require.resolve('file-loader');
const ignoreLoader = require.resolve('ignore-loader');
const mdxLoader = require.resolve('@mdx-js/loader');
const resolveUrlLoader = require.resolve('resolve-url-loader');
const sassLoader = require.resolve('sass-loader');

const defaultOptions = {
  entry: './src/index.ts',
  docs: false,
  outDir: './dist',
  production: process.env.NODE_ENV !== 'development',
  server: false,
  tsConfig: 'tsconfig.json'
};

const browserSupport = '> 0.2%, not dead, not op_mini all';
const jsxPragma = 'h';

const id = e => e;

const webpackConfExternal = ({ context, request }, cb) => {
  if (/\.config(\.js)?$/i.test(request)){
    return cb(null, 'commonjs ' + request);
  }
  return cb();
};

const entrypointsExternal = ({ context, request }, cb) => {
  if (/entrypoints(\.json)?$/i.test(request)){
    return cb(null, 'commonjs ' + request);
  }
  return cb();
};

const generateConfig = (options) => {
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

  const tsConfig = path.resolve(options.baseDir, options.tsConfig);

  const scriptLoaders = [
    {
      loader: babelLoader,
      options: {
        cacheDirectory: true,
        cacheIdentifier: `${babelVersion}-${babelLoaderVersion}-${serverMode ? 'server' : 'client'}-${devMode ? 'dev' : 'prod'}`,
        presets: [
          [
            babelPresetEnv,
            {
              targets: (
                serverMode
                  ? { node: '12' }
                  : (
                    devMode
                      ? { esmodules: true }
                      : browserSupport
                  )
              )
            }
          ],
          [
            babelPresetReact,
            {
              development: devMode,
              pragma: jsxPragma,
              pragmaFrag: 'Fragment',
              runtime: 'classic',
              useBuiltIns: true
            }
          ],
          [
            babelPresetTypeScript,
            {
              allowDeclareFields: true,
              jsxPragma
            }
          ]
        ],
        plugins: [
          [ babelPluginClassProperties, { loose: true } ],
          babelPluginExportNS
        ]
      }
    }
  ];

  const cssLoaders = [
    // Creates CSS asset files
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        esModule: true,
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

  const stats = (devMode && 'errors-warnings') || undefined;

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
    // node: serverMode ? false : {
    //   fs: 'empty'
    // },
    externals: (
      serverMode
        ? ([
          devMode && nodeExternals({
            allowlist: [ /\.(?!(?:[cm]?js|json)$).{1,5}$/i, /^@([^\\/]+)[\\/](?!(?:.+[\\/]node_modules[\\/]))/ ],
            modulesFromFile: true
          }),
          webpackConfExternal,
          entrypointsExternal
        ]).filter(id) : undefined
    ),
    output: {
      filename: (
        serverMode
          ? 'index.js'
          : jsDir + (hashInName ? '[name].[fullHash:8].bundle.js' : '[name].bundle.js')
      ),
      chunkFilename: jsDir + (hashInName ? '[name].[contenthash:8].chunk.js' : '[name].chunk.js'),
      path: path.resolve(options.baseDir, options.outDir),
      publicPath: '/public/',
      libraryTarget: serverMode ? 'commonjs2' : undefined
    },
    optimization: serverMode ? undefined : {
      //moduleIds: devMode ? 'named' : 'hashed',
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          styles: {
            test: /\.s?css$/,
            name: 'styles',
            chunks: 'all',
            enforce: true
          },
          defaultVendors: {
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
        docs && {
          test: /[\\/]components(-[^\\/]+)?[\\/].+\.tsx?$/,
          exclude: /node_modules/,
          use: [
            ...scriptLoaders,
            {
              loader: reactDocgenTypescriptLoader,
              options: {
                // Provide the path to your tsconfig.json so that your stories can
                // display types from outside each individual story.
                tsconfigPath: tsConfig
              }
            }
          ]
        },
        {
          test: /\.([cm]js|[jt]sx?)$/,
          exclude: /node_modules/,
          use: scriptLoaders
        },
        docs && {
          test: /\.(stories|story)\.mdx$/,
          use: [
            ...scriptLoaders,
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
            ...scriptLoaders,
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
            {
              loader: sassLoader,
              options: {
                sourceMap: true
              }
            }
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
      ].filter(id)
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js', '.jsx' ]
    },
    devtool: devMode ? 'eval-source-map' : 'nosources-source-map',
    devServer: {
      contentBase: options.outDir,
      hot: true,
      stats
    },
    stats,
    plugins: [
      !devMode && new CleanWebpackPlugin(),
      new ManifestPlugin({
        fileName: 'entrypoints.json',
        generate: (seed, files, entrypoints) => entrypoints
      }),
      new webpack.DefinePlugin({
        'global.GENTLY': false,
        'process.env.PENULTIMATE': JSON.stringify(true),
        'process.env.WEBPACK': JSON.stringify(true)
      }),
      !serverMode && new MiniCssExtractPlugin({
        filename: hashInName ? 'css/[name].[contenthash:8].css': 'css/[name].css',
        chunkFilename: hashInName ? 'css/[name].[contenthash:8].chunk.css' : 'css/[name].chunk.css'
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      !serverMode && new ForkTsCheckerWebpackPlugin({ typescript: { configFile: tsConfig } }),
      new webpack.ProgressPlugin()
    ].filter(id)
  };
};

const generateConfigs = (options) => [
  generateConfig({ ...options, entry: options.entry.server, outDir: options.outDir + '/server', server: true }),
  generateConfig({ ...options, entry: options.entry.client, outDir: options.outDir + '/public', server: false }),
];

module.exports = generateConfigs;
