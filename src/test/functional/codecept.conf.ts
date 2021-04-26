import { setHeadlessWhen } from '@codeceptjs/configure';

import { config as testConfig } from '../config';

setHeadlessWhen(testConfig.TestHeadlessBrowser);

export const config: CodeceptJS.Config = {
  gherkin: testConfig.Gherkin,
  output: '../../../functional-output/functional/reports',
  helpers: {
    Playwright: {
      url: testConfig.TEST_URL || 'http://localhost:3001',
      show: !testConfig.TestHeadlessBrowser,
      browser: 'firefox',
      waitForTimeout: testConfig.WaitForTimeout,
      waitForAction: 1000,
      ignoreHTTPSErrors: true,
    },
  },
  bootstrap: null,
  name: 'nfdiv-frontend',
  plugins: {
    autoLogin: testConfig.AutoLogin,
    allure: {
      enabled: true,
    },
    pauseOnFail: {
      enabled: !testConfig.TestHeadlessBrowser,
    },
    retryFailedStep: {
      enabled: true,
    },
    tryTo: {
      enabled: true,
    },
    screenshotOnFail: {
      enabled: true,
    },
  },
};
