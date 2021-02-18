export const config = {
  TEST_URL: process.env.TEST_URL || 'http://localhost:3001',
  TestHeadlessBrowser: process.env.TEST_HEADLESS ? process.env.TEST_HEADLESS === 'true' : true,
  TestSlowMo: 250,
  TestUser: 'nfdiv.frontend.test@hmcts.net',
  TestPass: 'Pa55word11',
  Gherkin: {
    features: './features/*.feature',
    steps: ['../steps/common.ts', '../steps/homepage.ts'],
  },
};
