const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const cssLoader = require.resolve('css-loader');
const fileLoader = require.resolve('file-loader');
const resolveUrlLoader = require.resolve('resolve-url-loader');
const sassLoader = require.resolve('sass-loader');
const styleLoader = require.resolve('style-loader');
const tsLoader = require.resolve('ts-loader');

const defaultOptions = {
  entry: './src/client/index.ts',
  outDir: './dist/public',
  tsConfig: 'tsconfig.json'
};

module.exports = function (options) {
  options = options || {};
  options = Object.assign({}, defaultOptions, options);

  if (options.baseDir === undefined) {
    throw new ReferenceError('No `baseDir` option provided; typically this should be set to `__dirname`');
  }

  return {
    mode: 'development',
    entry: [
      options.entry,
      'webpack-hot-middleware/client'
    ],
    output: {
      filename: 'bundle.js',
      path: path.resolve(options.baseDir, options.outDir),
      publicPath: '/public/'
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
                transpileOnly: false
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
              options: {}
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
          test: /\.(gif|jpg|png|svg|woff2?)$/,
          use: [
            fileLoader
          ]
        }
      ]
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ]
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: options.outDir
    },
    plugins: [
      new CleanWebpackPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          WEBPACK: JSON.stringify(true)
        }
      }),
      new MiniCssExtractPlugin({
        filename: 'style.css'
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ]
  };
};
