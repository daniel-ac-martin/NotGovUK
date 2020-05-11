const generateConfig = require('@not-govuk/webpack-config');

const webpackConfig = generateConfig({
  baseDir: __dirname,
  entry: './src/client/index.ts',
  outDir: './dist/public',
  tsConfig: 'tsconfig.webpack.json'
});

module.exports = webpackConfig;
