module.exports = function({ config }) {
  config.module.rules.push({
    test: /\.stories\.tsx?$/,
    loaders: [{
      loader: require.resolve('@storybook/source-loader'),
      options: { parser: 'typescript' }
    }],
    enforce: 'pre'
  });
  config.module.rules.push({
    test: /\.stories\.(mjs|jsx?)$/,
    loaders: [{
      loader: require.resolve('@storybook/source-loader')
    }],
    enforce: 'pre'
  });

  return config;
};
