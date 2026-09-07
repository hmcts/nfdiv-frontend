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

function ensurePageCallWillSucceed(url: string): Promise<void> {
  return server.get(url);
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
jest.setTimeout(15000);

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
    await page.goto(config.TEST_URL);
    await page.waitForSelector('h1', { timeout: 15000 });
    const bodyText = await page.evaluate(() => document.body.innerText);
    const isModern = bodyText.includes('You may already have an account if you have used an HMCTS service before');
    if (isModern) {
      if (bodyText.includes('Sign in or create an account')) {
        await page.click('text/Sign in');
      }
      await page.waitForSelector('input[name="email"]', { timeout: 15000 });
      await page.type('input[name="email"]', 'nfdiv.frontend.test@hmcts.net');
      await page.click('button[type="submit"], input[type="submit"]');
      await page.waitForSelector('input[name="password"]', { timeout: 15000 });
      await page.type('input[name="password"]', process.env.TEST_PASSWORD);
      await page.click('button[type="submit"], input[type="submit"]');
    } else {
      await page.waitForSelector('#username', { timeout: 15000 });
      await page.type('#username', 'nfdiv.frontend.test@hmcts.net');
      await page.type('#password', process.env.TEST_PASSWORD);
      await page.click('input[type="submit"], button[type="submit"]');
    }
    cookies = await page.cookies(config.TEST_URL);
    await page.close();
  };

  beforeAll(setup);

  beforeEach(async () => {
    const page = await browser.newPage();
    await page.goto(config.TEST_URL);
    await page.setCookie(...cookies);
    await page.goto(`${config.TEST_URL}/info`);
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
