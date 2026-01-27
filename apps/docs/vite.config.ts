import { defineConfig } from 'vite';
import mdx from '@mdx-js/rollup'
import html from '@react-foundry/vite-html-react';
import { reactRouter } from '@react-router/dev/vite';
import { vite as csf } from '@storybook/csf-plugin';
import reactDocgenTypescript from '@joshwooding/vite-plugin-react-docgen-typescript';

export default defineConfig({
  build: {
    commonjsOptions: {
      defaultIsModuleExports: true // Mimics Node.js, aligns dev and prod
    },
    minify: false, // Needed to get proper JSX snippets (only useful for docs)
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        quietDeps: true, // Works around issues with govuk-frontend
        silenceDeprecations: [
          'if-function', // Required until if functionality is more common in browsers and SASS v1.95 gets a bit older
          'import'       // Required until govuk-frontend moves to using modules
        ]
      }
    }
  },
  plugins: [
    reactDocgenTypescript(),
    csf(),
    html(),
    mdx(),
    reactRouter(),
  ],
  resolve: {
    alias: {
      '@not-govuk/sass-base': '@not-govuk/sass-base/vite', // Vite resolves url() differently from Turbo/webpack
      '@storybook/addon-docs/blocks': '@react-foundry/docs-components'
    }
  },
  ssr: {
    noExternal: /\.mdx$/
  }
});
