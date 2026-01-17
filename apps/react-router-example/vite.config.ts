import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
//import tsconfigPaths from "vite-tsconfig-paths"; // Users probably don't need to comment this out.

export default defineConfig({
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
    reactRouter(),
    //tsconfigPaths() // End-users probably don't need to comment this out.
  ],
  resolve: {
    alias: {
      '@not-govuk/sass-base': '@not-govuk/sass-base/vite' // Vite resolves url() differently from Turbo/webpack
    }
  }
});
