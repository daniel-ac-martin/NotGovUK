const generateConfig = require('@not-govuk/webpack-config');

const webpackConfig = generateConfig({
  baseDir: __dirname,
  entry: {
    client: './src/client/index.ts',
    server: './src/server/index.ts'
  },
  outDir: './dist'
});

module.exports = webpackConfig;
