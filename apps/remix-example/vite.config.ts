import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
//import tsconfigPaths from "vite-tsconfig-paths"; // Users probably don't need to comment this out.

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

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
    remix({
      buildDirectory: 'dist',
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
    //tsconfigPaths(), // End-users probably don't need to comment this out.
  ],
  resolve: {
    alias: {
      '~govuk-frontend': 'govuk-frontend', // Vite doesn't seem to support tilde's but other frameworks require it
      '@not-govuk/router': '@not-govuk/router/remix',
      '@not-govuk/sass-base': '@not-govuk/sass-base/vite',
    }
  }
});
