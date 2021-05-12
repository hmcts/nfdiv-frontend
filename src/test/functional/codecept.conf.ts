import { setHeadlessWhen } from '@codeceptjs/configure';

import { config as testConfig } from '../config';

setHeadlessWhen(testConfig.TestHeadlessBrowser);

export const config: CodeceptJS.Config = {
  name: 'nfdiv-frontend-functional',
  gherkin: testConfig.Gherkin,
  output: '../../../functional-output/functional/reports',
  helpers: {
    Playwright: {
      url: testConfig.TEST_URL || 'http://localhost:3001',
      show: !testConfig.TestHeadlessBrowser,
      browser: 'chromium',
      waitForTimeout: testConfig.WaitForTimeout,
      waitForAction: 1000,
      waitForNavigation: 'networkidle0',
      ignoreHTTPSErrors: true,
    },
  },
  bootstrap: testConfig.bootstrap,
  teardown: testConfig.teardown,
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
