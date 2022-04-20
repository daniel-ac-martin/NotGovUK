const generateConfig = require('@not-govuk/webpack-config');

const entry = (
  process.env.NODE_ENV === 'development'
    ? 'dev'
    : 'index'
);

const webpackConfig = generateConfig({
  baseDir: __dirname,
  entry: {
    client: './src/client/index.ts',
    server: `./src/server/${entry}.ts`
  },
  outDir: './dist'
});

module.exports = webpackConfig;
