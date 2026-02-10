import { setCommonPlugins, setHeadlessWhen } from '@codeceptjs/configure';

import { config as testConfig } from '../config';

setHeadlessWhen(testConfig.TestHeadlessBrowser);

let helpers = {};
let plugins = {};
console.log('Running cross browser tests');
if (process.env.SAUCE === 'true') {
  console.log('Using Sauce service');
  helpers = {
    WebDriver: {
      url: testConfig.TEST_URL,
      browser: 'MicrosoftEdge',
      waitForTimeout: testConfig.WaitForTimeout,
      keepCookies: true,
      capabilities: {
        browserName: 'MicrosoftEdge',
        browserVersion: '102',
        platformName: 'Windows 10',
        'sauce:options': {
          idleTimeout: 300,
          tunnelIdentifier: process.env.SAUCE_TUNNEL_IDENTIFIER || 'reformtunnel',
          name: 'No fault divorce - Windows 10 Edge latest',
          tags: ['NF_divorce'],
        },
      },
    },
  };
  plugins = {
    wdio: {
      enabled: true,
      services: ['sauce'],
      host: process.env.SAUCE_HOST || 'ondemand.eu-central-1.saucelabs.com',
      user: process.env.SAUCE_USERNAME,
      key: process.env.SAUCE_ACCESS_KEY,
      region: 'eu',
      acceptSslCerts: true,
    },
  };
} else if (process.env.PLAYWRIGHT_SERVICE_URL && process.env.PLAYWRIGHT_SERVICE_ACCESS_TOKEN) {
  console.log('Using Azure Playwright Service with Bearer token');

  helpers = {
    Playwright: {
      // This is where your app is hosted (your local or deployed app)
      url: testConfig.TEST_URL || 'http://localhost:3001',
      show: false, // Must be false for cloud execution
      chromium: {
        wsEndpoint: process.env.PLAYWRIGHT_SERVICE_URL,
      },
      browser: 'chromium',
      waitForTimeout: testConfig.WaitForTimeout || 30000,
      waitForAction: 350,
      timeout: testConfig.WaitForTimeout || 30000,
      retries: 3,
      waitForNavigation: 'load',
      ignoreHTTPSErrors: true,
      bypassCSP: true,
      // Also configure for cross-browser testing
      firefox: {
        wsEndpoint: process.env.PLAYWRIGHT_SERVICE_URL,
      },

      webkit: {
        wsEndpoint: process.env.PLAYWRIGHT_SERVICE_URL,
      },
    },
  };
} else {
  console.log('Using no Azure Playwright Service or sauce');
  console.log('Playwright service url: ' + process.env.PLAYWRIGHT_SERVICE_URL);
  helpers = testConfig.helpers;
}

export const config: CodeceptJS.Config = {
  name: 'nfdiv-frontend-cross-browser',
  gherkin: testConfig.Gherkin,
  output: '../../../functional-output/crossbrowser/reports',
  helpers,
  multiple: {
    crossBrowser: {
      browsers: [{ browser: 'chromium' }, { browser: 'webkit' }, { browser: 'firefox' }],
    },
  },
  bootstrap: testConfig.bootstrap,
  teardown: testConfig.teardown,
  plugins: {
    autoLogin: testConfig.AutoLogin,
    allure: {
      enabled: true,
      require: '@codeceptjs/allure-legacy',
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
    ...plugins,
  },
  mocha: {
    reporterOptions: {
      reportDir: './functional-output/crossbrowser/reports',
      reportFilename: 'Crossbrowser test report',
      inlineAssets: true,
      overwrite: true,
      html: true,
    },
  },
};

setCommonPlugins();
