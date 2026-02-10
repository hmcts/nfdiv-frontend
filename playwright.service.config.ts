import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export default defineConfig({
  testDir: './src/test',

  use: {
    ...(process.env.PLAYWRIGHT_SERVICE_URL && {
      connectOptions: {
        wsEndpoint: process.env.PLAYWRIGHT_SERVICE_URL,
      },
    }),

    baseURL: process.env.TEST_URL || 'http://localhost:3001',
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  // Fix the reporter configuration
  reporter: [['html'], ['json', { outputFile: 'test-results/results.json' }]],

  projects: [
    {
      name: 'chromium',
      use: {
        ...require('@playwright/test').devices['Desktop Chrome'],
      },
    },
  ],
});
