import { defineConfig } from "vite";
import mdx from '@mdx-js/rollup'
import { reactRouter } from "@react-router/dev/vite";
import { vite as csf } from "@storybook/csf-plugin";
// import tsconfigPaths from "vite-tsconfig-paths";
import reactDocgenTypescript from '@joshwooding/vite-plugin-react-docgen-typescript';

export default defineConfig({
  build: {
    commonjsOptions: {
      defaultIsModuleExports: true // Mimics Node.js, aligns dev and prod
    },
    // cssCodeSplit: false,
    minify: false, // Needed to get proper JSX snippets (only useful for docs)
    // rollupOptions : {
    //   output: {
    //     // manualChunks: null,
    //     manualChunks: (id) => { // FIXME: Is this actually useful? - It tries to mimic what we do in webpack
    //       if (!(id.startsWith('/') || id.startsWith('\0/'))) {
    //         return null
    //       } else if (id.includes('/node_modules/')) {
    //         return 'vendor';
    //       } else if (id.match(/\.s?css$/)) {
    //         return 'styles';
    //       } else {
    //         return 'client';
    //       }

    //       return null;
    //     }
    //   }
    // }
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
    //tsconfigPaths()
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
