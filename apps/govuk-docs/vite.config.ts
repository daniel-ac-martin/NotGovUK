import { defineConfig } from "vite";
import mdx from '@mdx-js/rollup'
import { reactRouter } from "@react-router/dev/vite";
import { vite as csf } from "@storybook/csf-plugin";
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
        silenceDeprecations: ['import'] // This is required until govuk-frontend moves to using modules
      }
    }
  },
  plugins: [
    reactDocgenTypescript(),
    csf(),
    mdx(),
    reactRouter(),
  ],
  resolve: {
    alias: {
      '~govuk-frontend': 'govuk-frontend', // Vite doesn't seem to support tilde's but other frameworks require it
      '@not-govuk/head': '@not-govuk/head/dummy',
      '@storybook/addon-docs/blocks': '@not-govuk/docs-components'
    }
  },
  ssr: {
    noExternal: /\.mdx$/
  }
});
