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
  mocha: {
    reporterOptions: {
      reportDir: './temp-reports',
      reportFilename: 'Functional test report',
      inlineAssets: true,
      overwrite: false,
      html: true,
      json: true,
    },
  },
};
