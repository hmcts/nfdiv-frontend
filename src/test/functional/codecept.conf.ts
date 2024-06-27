import { setHeadlessWhen } from '@codeceptjs/configure';

import { config as testConfig } from '../config';

setHeadlessWhen(testConfig.TestHeadlessBrowser);

export const config: CodeceptJS.Config = {
  name: 'nfdiv-frontend-functional',
  gherkin: testConfig.Gherkin,
  output: '../../../functional-output/functional/reports',
  helpers: testConfig.helpers,
  bootstrap: testConfig.bootstrap,
  teardown: testConfig.teardown,
  plugins: {
    autoLogin: testConfig.AutoLogin,
    allure: {
      enabled: true,
      require: '@codeceptjs/allure-legacy',
      outputDir: '../../../functional-output/functional/reports/Functional-test-results',
    },
    pauseOnFail: {
      enabled: !testConfig.TestHeadlessBrowser,
    },
    retryFailedStep: {
      enabled: true,
    },
    retryTo: {
      enabled: true,
    },
    screenshotOnFail: {
      enabled: true,
      fullPageScreenshots: true,
    },
  },
};
