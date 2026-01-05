import { defineConfig } from 'vite';
import mdx from '@mdx-js/rollup'
import html from '@not-govuk/vite-html-react';
import { reactRouter } from '@react-router/dev/vite';

export default defineConfig({
  build: {
    commonjsOptions: {
      defaultIsModuleExports: true // Mimics Node.js, aligns dev and prod
    }
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
    html(),
    mdx(),
    reactRouter(),
  ],
  resolve: {
    alias: {
      '~govuk-frontend': 'govuk-frontend', // Vite doesn't seem to support tilde's but other frameworks require it
      '@not-govuk/sass-base': '@not-govuk/sass-base/vite',
    }
  },
  ssr: {
    noExternal: /\.mdx$/
  }
});
