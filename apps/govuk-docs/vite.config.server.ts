import { defineConfig } from 'vite';
// import { builtinModules } from 'node:module';
// import packageJson from './package.json';

// const builtin = [ ...builtinModules, ...(builtinModules.map((v) => 'node:' + v)) ];
// const dependencies = Object.keys({
//   ...packageJson.dependencies,
//   ...packageJson.devDependencies,
// });

export default defineConfig({
  build: {
    commonjsOptions: {
      defaultIsModuleExports: true // Mimics Node.js
    },
    copyPublicDir: false,
    // lib: {
    //   entry: 'src/server/index.ts',
    //   fileName: 'index',
    //   formats: ['es'],
    // },
    minify: false,
    modulePreload: false,
    rollupOptions: {
      // external: builtin,
      output: {
        manualChunks: null,
        inlineDynamicImports: true
      }
    },
    // sourcemap: true,
    ssr: 'src/server/index.ts',
    outDir: 'dist/server',
    target: 'node24'
  },
  // plugins: [
  // ],
  ssr: {
    noExternal: true
  }
});
