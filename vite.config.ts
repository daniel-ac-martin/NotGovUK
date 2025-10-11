import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        quietDeps: true, // Works around issues with govuk-frontend
        silenceDeprecations: ['import'] // This is required until govuk-frontend moves to using modules
      }
    }
  },
  plugins: [react()],
  resolve: {
    alias: {
      '~govuk-frontend': 'govuk-frontend', // Vite doesn't seem to support tilde's but other frameworks require it
      '@not-govuk/head': '@not-govuk/head/dummy'
    }
  }
});
