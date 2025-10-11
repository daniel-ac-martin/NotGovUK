import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: [
    '../components/*/spec/*.mdx',
    '../components/*/spec/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../components-internal/*/spec/*.mdx',
    '../components-internal/*/spec/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../styles/*.stories.tsx',
    '../styles/*.mdx'
  ],
  addons: [
    // {
    //   name: '@not-govuk/storybook-preset',
    //   options: {
    //     baseDir: __dirname,
    //     tsConfig: '../tsconfig.storybook.json'
    //   }
    // },
    '@chromatic-com/storybook',
    '@storybook/addon-a11y',
    // '@storybook/addon-actions', // DEFUNCT
    '@storybook/addon-docs',
    // '@storybook/addon-jest', // BROKEN?
    // '@storybook/addon-links', // No longer needed?
    // '@storybook/addon-storysource', // DEFUNCT
    // '@storybook/addon-viewport' // DEFUNCT
    //'@storybook/addon-vitest' // Needs Jest->Vitest, does it have value?
  ],
  core: {
    disableTelemetry: true
  },
  features: {
    previewMdx2: true
  },
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  // webpackFinal: async (config) => {
  //   config.module.rules.push({
  //     test: /\.(stories|story)\.[tj]sx?$/,
  //     loader: require.resolve('@storybook/source-loader'),
  //     exclude: [/node_modules/],
  //     enforce: 'pre'
  //   });

  //   return config;
  // }
};

export default config;
