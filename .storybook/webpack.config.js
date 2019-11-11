const path = require('path');

module.exports = async ({ config }) => {
  config.module.rules.push({
    test: /\.rt$/,
    loader: require.resolve('react-templates-loader') + '?target-version=15.0.0&modules=commonjs'
  });

  return config;
};
