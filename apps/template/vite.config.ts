import { defineConfig } from 'vite';
import mdx from '@mdx-js/rollup'
import html from '@react-foundry/vite-html-react';
import { reactRouter } from '@react-router/dev/vite';

export default defineConfig({
  css: {
    lightningcss: {
      errorRecovery: true // Required until govuk-frontend removes the '@media zero' hack
    },
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        quietDeps: true, // Works around issues with govuk-frontend
        silenceDeprecations: [
          'import'       // Required until govuk-frontend moves to using modules
        ]
      }
    }
  },
  plugins: [
    html(),
    mdx(),
    reactRouter()
  ],
  resolve: {
    alias: {
      '@not-govuk/sass-base': '@not-govuk/sass-base/vite' // Vite resolves url() differently from Turbo/webpack
    }
  },
  ssr: {
    noExternal: [
      /\.mdx$/,
      'react-is'
    ]
  }
});
