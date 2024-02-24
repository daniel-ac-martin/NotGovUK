const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ReactDocgenTypescriptPlugin = require("@storybook/react-docgen-typescript-plugin").default;
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
const babelPluginPrivateMethods = require.resolve('@babel/plugin-proposal-private-methods');
const cssLoader = require.resolve('css-loader');
const htmlLoader = require.resolve('html-loader');
const ignoreLoader = require.resolve('ignore-loader');
const nodeLoader = require.resolve('node-loader');
const mdxLoader = require.resolve('@mdx-js/loader');
const resolveUrlLoader = require.resolve('resolve-url-loader');
const sassLoader = require.resolve('sass-loader');
const sourceMapLoader = require.resolve('source-map-loader');

const defaultOptions = {
  entry: './src/index.ts',
  docs: false,
  outDir: './dist',
  production: process.env.NODE_ENV !== 'development',
  server: false,
  storybook: false,
  tsConfig: 'tsconfig.json'
};

const browserSupport = '> 0.2%, not dead, not op_mini all';
const jsxPragma = 'h';

const id = e => e;

const regexpExternal = regexp => ({ context, request }, cb) => {
  if (regexp.test(request)){
    return cb(null, 'commonjs ' + request);
  }
  return cb();
};

const fseventsExternal = regexpExternal(/^fsevents$/i);
const webpackConfExternal = regexpExternal(/\.config(\.js)?$/i);
const entrypointsExternal = regexpExternal(/entrypoints(\.json)?$/i);

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
  const storybook = options.storybook;
  const clean = (
    options.clean === undefined
      ? !devMode
      : options.clean
  );

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
              loose: true,
              targets: (
                serverMode
                  ? { node: '14' }
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
          babelPluginExportNS,
          [ babelPluginPrivateMethods, { loose: true } ]
        ]
      }
    }
  ];

  const cssLoaders = [
    // Creates CSS asset files
    MiniCssExtractPlugin.loader,
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
    node: serverMode ? false : {
    },
    externals: (
      serverMode
        ? ([
          devMode && nodeExternals({
            allowlist: [ /\.(?!(?:[cm]?js|json|node)$).{1,5}$/i, /^@([^\\/]+)[\\/](?!(?:.+[\\/]node_modules[\\/]))/ ],
            modulesFromFile: true
          }),
          fseventsExternal,
          webpackConfExternal,
          entrypointsExternal
        ]).filter(id) : undefined
    ),
    output: {
      filename: (
        serverMode
          ? 'index.js'
          : jsDir + (hashInName ? '[name].[contenthash:8].bundle.js' : '[name].bundle.js')
      ),
      chunkFilename: jsDir + (hashInName ? '[name].[contenthash:8].chunk.js' : '[name].chunk.js'),
      assetModuleFilename: hashInName ? 'assets/[name].[contenthash:8][ext]' : 'assets/[name][ext]',
      path: path.resolve(options.baseDir, options.outDir),
      publicPath: '/public/',
      libraryTarget: serverMode ? 'commonjs2' : undefined
    },
    optimization: serverMode ? undefined : {
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
        {
          test: /\.[cm]?js$/,
          include: /node_modules/,
          enforce: 'pre',
          resolve: {
            fullySpecified: false // Remove after upgrade to React v18
          },
          use: sourceMapLoader
        },
        {
          test: /\.js$/,
          include: /node_modules/,
          type: 'javascript/auto'
        },
        {
          test: /\.([cm]js|[jt]sx?)$/,
          exclude: /node_modules/,
          use: scriptLoaders
        },
        {
          test: /\.node$/,
          use: nodeLoader
        },
        {
          test: /\.d\.ts$/,
          loader: ignoreLoader
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
          test: /\.html$/i,
          use: [
            {
              loader: htmlLoader,
              options: {
                minimize: false
              }
            }
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
                sassOptions: {
                  quietDeps: true
                },
                sourceMap: true
              }
            }
          ]
        },
        {
          test: /\.(ttf|woff2?)$/,
          type: 'asset/resource',
          generator: {
            filename: hashInName ? 'fonts/[name].[contenthash:8][ext]' : 'fonts/[name][ext]'
          }
        },
        {
          test: /\.(docx?|pdf)$/,
          type: 'asset/resource',
          generator: {
            filename: hashInName ? 'files/[name].[contenthash:8][ext]' : 'files/[name][ext]'
          }
        },
        {
          test: /\.(gif|ico|jpe?g|png|svg)$/,
          type: 'asset/resource',
          generator: {
            filename: hashInName ? 'images/[name].[contenthash:8][ext]' : 'images/[name][ext]'
          }
        }
      ].filter(id)
    },
    ignoreWarnings: [/Failed to parse source map/],
    resolve: {
      extensions: [ '.tsx', '.ts', '.js', '.jsx' ],
      fallback: {
        fs: false
      }
    },
    devtool: devMode ? 'eval-source-map' : 'nosources-source-map',
    devServer: {
      contentBase: options.outDir,
      hot: true,
      stats
    },
    stats,
    plugins: [
      clean && new CleanWebpackPlugin(),
      new WebpackManifestPlugin({
        fileName: 'entrypoints.json',
        generate: (seed, files, entrypoints) => entrypoints
      }),
      new webpack.DefinePlugin({
        'global.GENTLY': false,
        'process.env.PENULTIMATE': JSON.stringify(true),
        'process.env.WEBPACK': JSON.stringify(true)
      }),
      !storybook && new webpack.NormalModuleReplacementPlugin(/^@storybook\/addon-docs$/, '@not-govuk\/docs-components'),
      !serverMode && new MiniCssExtractPlugin({
        filename: hashInName ? 'css/[name].[contenthash:8].css': 'css/[name].css',
        chunkFilename: hashInName ? 'css/[name].[contenthash:8].chunk.css' : 'css/[name].chunk.css'
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      !serverMode && new ForkTsCheckerWebpackPlugin({ typescript: { configFile: tsConfig } }),
      docs && !storybook && new ReactDocgenTypescriptPlugin({ tsconfigPath: tsConfig }),
      new webpack.ProgressPlugin(),
      new BundleAnalyzerPlugin({ analyzerMode: 'json' })
    ].filter(id)
  };
};

const generateConfigs = (options) => [
  generateConfig({ ...options, entry: options.entry.server, outDir: options.outDir + '/server', server: true }),
  generateConfig({ ...options, entry: options.entry.client, outDir: options.outDir + '/public', server: false }),
];

module.exports = generateConfigs;
