import { setHeadlessWhen } from '@codeceptjs/configure';

import { config as testConfig } from '../config.js';

setHeadlessWhen(testConfig.TestHeadlessBrowser);

export const config: CodeceptJS.Config = {
  noGlobals: true,
  name: 'nfdiv-frontend-functional',
  gherkin: testConfig.Gherkin,
  output: '../../../functional-output/functional/reports',
  helpers: testConfig.helpers,
  bootstrap: testConfig.bootstrap,
  teardown: testConfig.teardown,
  retry: { Scenario: 3 },
  plugins: {
    pause: {
      enabled: !testConfig.TestHeadlessBrowser,
    },
    retryFailedStep: {
      enabled: true,
    },
    screenshot: {
      enabled: true,
      fullPageScreenshots: true,
    },
    junitReporter: {
      enabled: true,
      output: 'functional-output/functional/reports',
      outputName: 'result.xml',
    },
  },
};
