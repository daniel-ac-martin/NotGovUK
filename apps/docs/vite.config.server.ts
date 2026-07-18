import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    copyPublicDir: false,
    minify: false,
    modulePreload: false,
    rolldownOptions: {
      output: {
        codeSplitting: false
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
