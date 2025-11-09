import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    commonjsOptions: {
      defaultIsModuleExports: true // Mimics Node.js
    },
    copyPublicDir: false,
    minify: false,
    modulePreload: false,
    rollupOptions: {
      output: {
        manualChunks: null,
        inlineDynamicImports: true
      }
    },
    ssr: 'src/server/index.ts',
    outDir: 'dist/server',
    target: 'node24'
  },
  ssr: {
    noExternal: true
  }
});
