import { setHeadlessWhen } from '@codeceptjs/configure';

// turn on headless mode when running with TEST_HEADLESS="true" environment variable
const isHeadless = process.env.TEST_HEADLESS === 'true';
setHeadlessWhen(isHeadless);

const url = process.env.URL_TO_TEST || 'http://localhost:3001';
let helpers = {};
let plugins = {};
if (process.env.IE === 'true') {
  helpers = {
    WebDriver: {
      url,
      browser: 'internet explorer',
      capabilities: {
        'sauce:options': {
          idleTimeout: 300,
          tunnelIdentifier: process.env.SAUCE_TUNNEL_IDENTIFIER || 'reformtunnel',
          name: 'No fault divorce - IE latest',
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
} else {
  helpers = {
    Playwright: {
      url,
      show: !isHeadless,
      browser: 'chromium',
    },
  };
}

export const config: CodeceptJS.Config = {
  tests: './*_test.ts',
  output: '../../../functional-output/crossbrowser/reports',
  helpers,
  multiple: {
    crossBrowser: {
      // chromium = Google Chrome, Microsoft Edge, Android, Opera, Brave, Vivaldi etc.
      // webkit = Safari, iOS, Smart TVs, Games consoles etc.
      // firefox = Firefox :P
      browsers: [{ browser: 'chromium' }, { browser: 'webkit' }, { browser: 'firefox' }],
    },
  },
  bootstrap: null,
  name: 'nfdiv-frontend',
  plugins: {
    pauseOnFail: {},
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
};
