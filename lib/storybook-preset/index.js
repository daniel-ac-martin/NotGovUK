import { logger } from '@storybook/node-logger';
import { generateConfigs } from '@not-govuk/webpack-config';

// Don't use Storybook's default Babel config.
export const babelDefault = () => ({
  presets: [],
  plugins: []
});

const processAppConfig = (appConfig, options) => (
  appConfig.module.rules
    .filter(
      ({ test }) => !(
        test instanceof RegExp && (
          test.test('.css') || test.test('.woff2') || test.test('.png') || test.test('.pdf')
        )
      )
    )
);

const mergePlugins = (...args) =>
  args.reduce((plugins, plugin) => {
    if (
      plugins.some(
        (includedPlugin) =>
          includedPlugin.constructor.name === plugin.constructor.name
      )
    ) {
      return plugins;
    }
    return [...plugins, plugin];
  }, []);

// Update the core Webpack config.
export const webpack = (webpackConfig = {}, options) => {
  logger.info(`=> Loading Webpack configuration from @not-govuk/webpack-config`);

  // Remove existing rules related to JavaScript and TypeScript.
  logger.info(`=> Removing existing JavaScript and TypeScript rules.`);
  const filteredRules = webpackConfig.module && webpackConfig.module.rules.filter(
    ({ test }) => !(
      test instanceof RegExp && (
        test.test('.js') || test.test('.ts')
      )
    )
  );

  const appWebpackConfig = generateConfigs({
    ...options,
    baseDir: options.baseDir || __dirname,
    docs: true,
    entry: {
      client: options.entry,
      server: 'PLACEHOLDER'
    },
    storybook: true,
    clean: false
  }).filter(e => e.target !== 'node')[0];

  // Select the relevent CRA rules and add the Storybook config directory.
  logger.info(`=> Modifying rules.`);
  const appRules = processAppConfig(appWebpackConfig, options);

  // Return the new config.
  return {
    ...webpackConfig,
    output: {
      ...webpackConfig.output,
      publicPath: webpackConfig.output.publicPath || '/'
    },
    module: {
      ...webpackConfig.module,
      rules: [...(filteredRules || []), ...appRules]
    },
    plugins: mergePlugins(
      ...(webpackConfig.plugins || []),
      ...appWebpackConfig.plugins
    ),
    resolve: {
      ...webpackConfig.resolve,
      extensions: appWebpackConfig.resolve.extensions
    }
  };
};
