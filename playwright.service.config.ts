import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export default defineConfig({
  // Use all configured projects
  testDir: './src/test',

  // Configure for cloud execution
  workers: process.env.CI ? 10 : undefined,

  use: {
    // Connect to Playwright Workspaces only if URL is available
    ...(process.env.PLAYWRIGHT_SERVICE_URL && {
      connectOptions: {
        wsEndpoint: process.env.PLAYWRIGHT_SERVICE_URL,
      },
    }),

    // Base URL
    baseURL: process.env.TEST_URL || 'http://localhost:3001',

    // Other configuration options
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  // Environment-specific settings
  projects: [
    {
      name: 'chromium',
      use: {
        ...require('@playwright/test').devices['Desktop Chrome'],
      },
    },
  ],

  // Reporter configuration for MPW
  reporter: [['html'], ['json', { outputFile: 'test-results/results.json' }]],
});
