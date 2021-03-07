'use strict';

module.exports = {
  stories: [
    '../components/aside/spec/*.stories.@(js|mdx)',
    '../components/back-link/spec/*.stories.@(js|mdx)',
    '../components/breadcrumbs/spec/*.stories.@(js|mdx)',
    '../components/details/spec/*.stories.@(js|mdx)',
    '../components/footer/spec/*.stories.@(js|mdx)',
    '../components/form/spec/*.stories.@(js|mdx)',
    '../components/header/spec/*.stories.@(js|mdx)',
    '../components/inset-text/spec/*.stories.@(js|mdx)',
    '../components/link/spec/*.stories.@(js|mdx)',
    '../components/page/spec/*.stories.@(js|mdx)',
    '../components/panel/spec/*.stories.@(js|mdx)',
    '../components/phase-banner/spec/*.stories.@(js|mdx)',
    '../components/skip-link/spec/*.stories.@(js|mdx)',
    '../components/table/spec/*.stories.@(js|mdx)',
    '../components/tag/spec/*.stories.@(js|mdx)',
    '../components/warning-text/spec/*.stories.@(js|mdx)',
    '../components/width-container/spec/*.stories.@(js|mdx)',
    '../components-internal/anchor/spec/*.stories.@(js|mdx)',
    '../components-internal/anchor-list/spec/*.stories.@(js|mdx)',
    '../components-internal/simple-table/spec/*.stories.@(js|mdx)',
    '../components-internal/tabs/spec/*.stories.@(js|mdx)',
    '../styles/*.stories.mdx',
    '../packages/components/src/components/**/*.stories.mdx'
  ],
  addons: [
    {
      name: '@not-govuk/storybook-preset',
      options: {
        baseDir: __dirname,
        tsConfig: '../tsconfig.webpack.json'
      }
    },
    '@storybook/addon-a11y/register',
    '@storybook/addon-actions',
    '@storybook/addon-docs/register',
    '@storybook/addon-jest/register',
    '@storybook/addon-knobs/register',
    '@storybook/addon-links',
    '@storybook/addon-storysource',
    '@storybook/addon-viewport/register'
  ],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(stories|story)\.[tj]sx?$/,
      loader: require.resolve('@storybook/source-loader'),
      exclude: [/node_modules/],
      enforce: 'pre'
    });

    return config;
  }
};
