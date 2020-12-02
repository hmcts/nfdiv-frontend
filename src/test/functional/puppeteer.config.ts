import { config } from '../config';

export const puppeteerConfig = {
  headless: config.TestHeadlessBrowser,
  slowMo: config.TestSlowMo,
  ignoreHTTPSErrors: true,
  'ignore-certificate-errors': true,
  defaultTimeout: 60 * 1000,
  args: [
    '--no-sandbox',
    '--proxy-server=proxyout.reform.hmcts.net:8080',
    '--proxy-bypass-list=*beta*LB.reform.hmcts.net',
    '--window-size=1440,1400',
  ],
};
