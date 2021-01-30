require('ts-node/register');

const { setHeadlessWhen } = require('@codeceptjs/configure');

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

const config = {
  tests: './src/test/cross-browser/*_test.ts',
  output: './src/test/cross-browser/output',
  multiple: {
    crossBrowser: {
      browsers: [{ browser: 'chromium' }, { browser: 'firefox' }, { browser: 'webkit' }],
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
  },
};

const url = process.env.APP_URL || 'http://localhost:3001';
if (process.env.SAUCE === 'true') {
  config.helpers = {
    WebDriver: {
      url,
      browser: 'chrome',
      capabilities: {
        acceptInsecureCerts: true,
        'sauce:options': {
          idleTimeout: 300,
        },
      },
    },
  };
  config.plugins = {
    ...config.plugins,
    wdio: {
      enabled: true,
      services: ['sauce'],
      user: process.env.SAUCE_USERNAME,
      key: process.env.SAUCE_ACCESS_KEY,
      tunnelIdentifier: process.env.TUNNEL_IDENTIFIER || 'reformtunnel',
      region: 'eu',
      acceptSslCerts: true,
      tags: ['nfdiv'],
    },
  };
} else {
  config.helpers = {
    Playwright: {
      url,
      show: !process.env.HEADLESS,
      browser: 'chromium',
    },
  };
}

exports.config = config;
