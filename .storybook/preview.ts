import type { StorybookConfig } from "@storybook/react-vite";
import { createElement as h } from 'react';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import globalDecorator from './decorators';

// FIXME: Temporary hack to get CSS
import '@not-govuk/components/assets/index.scss';

export const preview: Preview = {
  decorators: [
    globalDecorator,
  ],
  parameters: {
    a11y: {
      context: "#storybook-root",
      config: {},
      options: {},
      manual: true,
    },
    docs: {
      container: DocsContainer,
      page: DocsPage
    }
  },
  tags: [
    'autodocs'
  ]
};

export default preview;
