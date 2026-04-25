import { defineConfig } from 'cypress';
import projectConfig from '../../cypress.config.js';

export default defineConfig({
  ...projectConfig,
  e2e: {
    ...projectConfig.e2e,
    baseUrl: 'http://localhost:3000'
  }
});
