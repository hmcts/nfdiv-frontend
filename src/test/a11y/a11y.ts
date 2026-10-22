import fs from 'fs';

import axios from 'axios';
import puppeteer from 'puppeteer';

import * as urls from '../../main/steps/urls';
import { config } from '../config';

const IGNORED_URLS = [urls.SIGN_IN_URL, urls.SIGN_OUT_URL];

const pa11y = require('pa11y');
const server = axios.create({ baseURL: config.TEST_URL });

interface Pa11yResult {
  documentTitle: string;
  pageUrl: string;
  issues: PallyIssue[];
}

interface PallyIssue {
  code: string;
  context: string;
  message: string;
  selector: string;
  type: string;
  typeCode: number;
}

async function ensurePageCallWillSucceed(url: string): Promise<void> {
  const response = await server.get(url, {
    maxRedirects: 0,
    validateStatus: () => true,
  });

  const allowedStatuses = [200, 301, 302, 303, 307, 308];
  if (allowedStatuses.includes(response.status)) {
    return;
  }
  throw new Error(
    `Precheck failed for '${url}' with status ${response.status}, location='${String(response.headers.location || '')}'`
  );
}

function runPally(url: string, browser): Promise<Pa11yResult> {
  let screenCapture: string | boolean = false;
  if (!config.TestHeadlessBrowser) {
    const screenshotDir = `${__dirname}/../../../functional-output/pa11y`;
    fs.mkdirSync(screenshotDir, { recursive: true });
    screenCapture = `${screenshotDir}/${url.replace(/^\/$/, 'home').replace('/', '')}.png`;
  }

  const fullUrl = `${config.TEST_URL}${url}`;
  return pa11y(fullUrl, {
    browser,
    screenCapture,
    hideElements: '.govuk-footer__licence-logo, .govuk-header__logotype-crown, .govuk-footer__crown',
  });
}

function expectNoErrors(messages: PallyIssue[]): void {
  const errors = messages.filter(m => m.type === 'error');

  if (errors.length > 0) {
    const errorsAsJson = `${JSON.stringify(errors, null, 2)}`;
    throw new Error(`There are accessibility issues: \n${errorsAsJson}\n`);
  }
}

jest.retryTimes(3);
jest.setTimeout(30000);

describe('Accessibility', () => {
  let browser;
  let cookies;
  let hasAfterAllRun = false;

  const setup = async () => {
    if (hasAfterAllRun) {
      return;
    }
    if (browser) {
      await browser.close();
    }

    browser = await puppeteer.launch({ acceptInsecureCerts: true });
    browser.on('disconnected', setup);

    // Login once only for other pages to reuse session
    const page = await browser.newPage();

    await page.goto(config.TEST_URL, {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    });
    await page.waitForSelector('a[href="/enter-email"]', {
      timeout: 15000,
    });

    await page.click('a[href="/enter-email"]');
    await page.waitForSelector('input[name="email"]', {
      timeout: 15000,
    });

    await page.type('input[name="email"]', 'nfdiv.frontend.test@hmcts.net');
    await page.evaluate(() => {
      const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement;

      if (!emailInput?.form) {
        throw new Error('Email form not found');
      }

      emailInput.form.requestSubmit();
    });
    await page.waitForSelector('input[name="password"]', {
      timeout: 15000,
    });

    await page.type('input[name="password"]', process.env.TEST_PASSWORD);
    await page.evaluate(() => {
      const passwordInput = document.querySelector('input[name="password"]') as HTMLInputElement;

      if (!passwordInput?.form) {
        throw new Error('Password form not found');
      }

      passwordInput.form.requestSubmit();
    });
    await page.waitForFunction(() => !window.location.hostname.includes('idam-web-public'), { timeout: 20000 });
    cookies = await page.cookies(config.TEST_URL);
    await page.close();
  };

  beforeAll(setup);

  beforeEach(async () => {
    const page = await browser.newPage();
    await page.goto(config.TEST_URL, {
      waitUntil: 'domcontentloaded',
    });

    await page.setCookie(...cookies);

    await page.goto(`${config.TEST_URL}/info`, {
      waitUntil: 'domcontentloaded',
    });
    await page.close();
  });

  afterAll(async () => {
    hasAfterAllRun = true;
    await browser.close();
  });

  const urlsNoSignOut = Object.values(urls).filter(url => !IGNORED_URLS.includes(url));
  describe.each(urlsNoSignOut)('Page %s', url => {
    test('should have no accessibility errors', async () => {
      await ensurePageCallWillSucceed(url);
      const result = await runPally(url, browser);
      expect(result.issues).toEqual(expect.any(Array));
      expectNoErrors(result.issues);
    });
  });
});
