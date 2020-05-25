const generateConfig = require('@not-govuk/webpack-config');

const webpackConfig = generateConfig({
  baseDir: __dirname,
  entry: './src/server/index.ts',
  outDir: './dist/server',
  production: process.env.NODE_ENV !== 'development',
  server: true,
  tsConfig: 'tsconfig.build.json'
});

module.exports = webpackConfig;
