/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'cypress';
import codeCoverageTask from '@cypress/code-coverage/task.js';

export default defineConfig({
  e2e: {
    experimentalStudio: true,
    baseUrl: 'http://localhost:5173',
    viewportWidth: 1920,
    viewportHeight: 1080,
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config);
      return config;
    },
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config);
      return config;
    },
  },
});
