import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: [
    '../../../components/*/spec/*.mdx',
    '../../../components/*/spec/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  core: {
    disableTelemetry: true
  },
  framework: {
    name: "@storybook/react-vite",
    options: {},
  }
};

export default config;
