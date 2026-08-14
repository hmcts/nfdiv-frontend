import path from 'node:path';

import { setHeadlessWhen } from '@codeceptjs/configure';

import { config as testConfig } from '../config.js';

setHeadlessWhen(testConfig.TestHeadlessBrowser);

const reportDir = path.resolve(process.cwd(), 'functional-output/functional/reports');

export const config: CodeceptJS.Config = {
  noGlobals: true,
  name: 'nfdiv-frontend-functional',
  gherkin: testConfig.Gherkin,
  output: reportDir,
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
    allure: {
      enabled: true,
      require: 'allure-codeceptjs',
    },
    screenshot: {
      enabled: true,
      fullPageScreenshots: true,
    },
    junitReporter: {
      enabled: true,
      output: reportDir,
      outputName: 'result.xml',
    },
  },
};
