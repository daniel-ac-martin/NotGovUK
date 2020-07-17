const generateConfig = require('@not-govuk/webpack-config');

const webpackConfig = generateConfig({
  baseDir: __dirname,
  docs: true,
  entry: './src/client/index.ts',
  outDir: './dist/public',
  production: process.env.NODE_ENV !== 'development',
  tsConfig: 'tsconfig.json'
});

module.exports = webpackConfig;
