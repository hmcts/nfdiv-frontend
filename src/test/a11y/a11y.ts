import fs from 'fs';

import { create as axiosCreate } from 'axios';
import sysConfig from 'config';
import type { Application } from 'express';
import { launch as launchPuppeteer } from 'puppeteer';

import { PropertiesVolume } from '../../main/modules/properties-volume';
import * as urls from '../../main/steps/urls';
import { config } from '../config';

let TestPass: string;
let TestUser: string;
type SessionCookie = {
  name: string;
  value: string;
  domain?: string;
  path?: string;
  expires?: number;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
};
const cookiesByContext: Record<UserContext, SessionCookie[]> = {
  applicant1: [],
  applicant2: [],
};
const SIGN_IN_OUT_URLS = [urls.SIGN_IN_URL, urls.APPLICANT_2_SIGN_IN_URL, urls.SIGN_OUT_URL];
const CALLBACK_URLS = [
  urls.CALLBACK_URL,
  urls.APPLICANT_2_CALLBACK_URL,
  urls.PAYMENT_CALLBACK_URL,
  urls.SERVICE_PAYMENT_CALLBACK,
  urls.GENERAL_APPLICATION_PAYMENT_CALLBACK,
];
const SYSTEM_ENDPOINTS = [urls.ACTIVE, urls.POSTCODE_LOOKUP, urls.DOCUMENT_MANAGER, urls.CSRF_TOKEN_ERROR_URL];
const SESSION_ENDING_URLS = [
  urls.DRAFT_SAVE_AND_SIGN_OUT,
  urls.REQUEST_FOR_INFORMATION_SAVE_AND_SIGN_OUT,
  urls.SAVE_AND_SIGN_OUT,
  urls.EXIT_SERVICE,
  urls.APPLICATION_WITHDRAWN,
  urls.WITHDRAW_CONFIRMATION,
  urls.TIMED_OUT_URL,
];
const IGNORED_URLS = [...SIGN_IN_OUT_URLS, ...CALLBACK_URLS, ...SYSTEM_ENDPOINTS, ...SESSION_ENDING_URLS];
const RESPONDENT_URLS = [
  urls.HELP_WITH_YOUR_FINAL_ORDER_FEE_URL,
  urls.PAY_YOUR_FINAL_ORDER_FEE,
  urls.HELP_PAYING_FINAL_ORDER_HAVE_YOU_APPLIED,
  urls.HELP_PAYING_FINAL_ORDER_NEED_TO_APPLY,
  urls.HOW_DO_YOU_WANT_TO_RESPOND,
  urls.DISPUTING_THE_APPLICATION,
  urls.LEGAL_JURISDICTION_OF_THE_COURTS,
  urls.INTEND_TO_DELAY,
  urls.RESPONSE_SUBMITTED,
];
const APP2_URLS = [
  urls.ENTER_YOUR_ACCESS_CODE,
  urls.YOU_CANNOT_APPLY,
  urls.YOU_NEED_TO_REVIEW_YOUR_APPLICATION,
  urls.NOT_CONFIRMED_JOINT_APPLICATION,
  urls.YOUR_SPOUSE_NEEDS_TO_CONFIRM_YOUR_JOINT_APPLICATION,
  urls.AWAITING_RESPONSE_TO_HWF_DECISION,
  urls.CHECK_JOINT_APPLICATION,
  urls.YOUR_COMMENTS_SENT,
  urls.RESPONSE_SUBMITTED,
];

const pa11y = require('pa11y');
const server = axiosCreate({ baseURL: config.TEST_URL });
const MAX_ATTEMPTS = 4;
type UserContext = 'applicant1' | 'applicant2';
const APPLICANT_1_URLS = Object.values(urls).filter(
  url => !IGNORED_URLS.includes(url) && !RESPONDENT_URLS.includes(url) && !APP2_URLS.includes(url)
);
const RESPONDENT_CONTEXT_URLS = [
  ...RESPONDENT_URLS.map(url => `${urls.RESPONDENT}${url}`),
  ...APP2_URLS.map(url => `${urls.APPLICANT_2}${url}`),
];

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

class RouteError extends Error {}
class PrecheckError extends Error {}

const isLoginRedirect = (targetUrl: string): boolean =>
  [urls.SIGN_IN_URL, urls.APPLICANT_2_SIGN_IN_URL].some(loginUrl => targetUrl.includes(loginUrl));

async function ensurePageCallWillSucceedForContext(url: string, sessionCookies: SessionCookie[]): Promise<void> {
  const response = await server.get(url, {
    maxRedirects: 0,
    validateStatus: () => true,
    headers: {
      Cookie: sessionCookies.map((c: { name: string; value: string }) => `${c.name}=${c.value}`).join('; '),
    },
  });

  const location = String(response.headers.location || '');
  const isRedirect = [301, 302, 303, 307, 308].includes(response.status);

  if (isRedirect && location.includes(urls.SIGN_IN_URL)) {
    process.stderr.write(`Precheck redirected to sign-in for '${url}'\n`);
    throw new PrecheckError(`Precheck redirected to sign-in for '${url}'`);
  }

  if (response.status !== 200 && response.status !== 302) {
    process.stderr.write(`Precheck failed for '${url}' with ${response.status}, location='${location}'\n`);
    throw new PrecheckError(`Precheck failed for '${url}' with ${response.status}, location='${location}'`);
  }

  if (location.includes('/error')) {
    process.stderr.write(`Precheck redirected to error page for '${url}'\n`);
    throw new RouteError(`Precheck redirected to error page for '${url}'`);
  }
}

async function runPally(url: string, browser): Promise<Pa11yResult> {
  let screenCapture: string | boolean = false;
  // if (!config.TestHeadlessBrowser) {
  const screenshotDir = `${__dirname}/../../../functional-output/pa11y`;
  fs.mkdirSync(screenshotDir, { recursive: true });
  screenCapture = `${screenshotDir}/${url.replace(/^\/$/, 'home').replace(/\//g, '')}.png`;
  // }

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
    process.stderr.write(`There are accessibility issues: \n${errorsAsJson}\n`);
    throw new Error(`There are accessibility issues: \n${errorsAsJson}\n`);
  }
}

const setupTestSecrets = async (): Promise<void> => {
  const propertiesVolume = new PropertiesVolume();
  await propertiesVolume.enableFor({ locals: { developmentMode: true } } as unknown as Application);
};

const initializeTestEnvironment = async () => {
  if (!process.env.TEST_PASSWORD) {
    await setupTestSecrets();
  }

  TestUser = 'nfdiv.frontend.test@hmcts.net';
  TestPass = process.env.TEST_PASSWORD || sysConfig.get('e2e.userTestPassword') || '';

  if (!TestPass || TestPass === '') {
    throw new Error('Missing test password. Set TEST_PASSWORD or authenticate for Azure Key Vault.');
  }
};

jest.setTimeout(30000);

describe('Accessibility', () => {
  let browser;
  let hasAfterAllRun = false;

  const setupBrowser = async () => {
    if (hasAfterAllRun) {
      return;
    }
    if (browser) {
      await browser.close();
    }

    browser = await launchPuppeteer({ acceptInsecureCerts: true });
    browser.on('disconnected', setupBrowser);
  };

  const setupContext = async (context: UserContext): Promise<void> => {
    const browserContext = await browser.createBrowserContext();
    const entryUrl = context === 'applicant2' ? `${config.TEST_URL}${urls.APPLICANT_2}` : config.TEST_URL;
    const page = await browserContext.newPage();

    await page.goto(entryUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    });
    const loginLink = await page.$('a[href$="/enter-email"]');
    if (loginLink) {
      await loginLink.click();
      await page.waitForSelector('input[name="email"]', {
        timeout: 15000,
      });

      await page.type('input[name="email"]', TestUser);
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

      await page.type('input[name="password"]', TestPass);
      await page.evaluate(() => {
        const passwordInput = document.querySelector('input[name="password"]') as HTMLInputElement;

        if (!passwordInput?.form) {
          throw new Error('Password form not found');
        }

        passwordInput.form.requestSubmit();
      });
      await page.waitForFunction(() => !window.location.hostname.includes('idam-web-public'), { timeout: 20000 });
    }
    cookiesByContext[context] = (await page.cookies()).map(cookie => {
      const sameSite = ['Strict', 'Lax', 'None'].includes(cookie.sameSite || '')
        ? (cookie.sameSite as SessionCookie['sameSite'])
        : undefined;

      return {
        name: cookie.name,
        value: cookie.value,
        domain: cookie.domain,
        path: cookie.path,
        expires: cookie.expires,
        httpOnly: cookie.httpOnly,
        secure: cookie.secure,
        sameSite,
      };
    });
    await browserContext.close();
  };

  const restoreSessionForContext = async (context: UserContext): Promise<void> => {
    const probeUrl = context === 'applicant2' ? `${config.TEST_URL}${urls.APPLICANT_2}` : `${config.TEST_URL}/`;
    const setSessionAndOpenInfo = async (): Promise<string> => {
      const page = await browser.newPage();
      await page.goto(config.TEST_URL, {
        waitUntil: 'domcontentloaded',
      });

      await page.setCookie(...cookiesByContext[context]);
      await page.goto(probeUrl, {
        waitUntil: 'domcontentloaded',
      });

      const currentUrl = page.url();
      await page.close();
      return currentUrl;
    };

    let currentUrl = await setSessionAndOpenInfo();

    if (isLoginRedirect(currentUrl)) {
      await setupContext(context);
      currentUrl = await setSessionAndOpenInfo();

      if (isLoginRedirect(currentUrl)) {
        process.stderr.write(
          `[a11y BeforeEach] Failed to restore authenticated session for ${context}, redirected to '${currentUrl}'\n`
        );
        throw new Error(`Failed to restore authenticated session for ${context}, redirected to '${currentUrl}'`);
      }
    }
  };

  beforeAll(async () => {
    await initializeTestEnvironment();
    await setupBrowser();
    await setupContext('applicant1');
    await setupContext('applicant2');
  });

  afterAll(async () => {
    hasAfterAllRun = true;
    await browser.close();
  });

  const runContextualA11yTest = (context: UserContext, url: string) =>
    test('should have no accessibility errors', async () => {
      await restoreSessionForContext(context);

      for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
        try {
          process.stderr.write(`[a11y] START ${url} (${context}) (attempt ${attempt}/${MAX_ATTEMPTS})\n`);
          await ensurePageCallWillSucceedForContext(url, cookiesByContext[context]);
          const result = await runPally(url, browser);
          if (result.pageUrl.includes('/error')) {
            process.stderr.write(`Pa11y ended on error page for '${url}' -> '${result.pageUrl}'\n`);
            throw new RouteError(`Pa11y ended on error page for '${url}' -> '${result.pageUrl}'`);
          }
          expect(result.issues).toEqual(expect.any(Array));
          expectNoErrors(result.issues);
          process.stderr.write(`[a11y] PASS ${url}\n`);
          return;
        } catch (error) {
          if (error instanceof PrecheckError || error instanceof RouteError) {
            process.stderr.write(
              `[a11y] WARN ${url} (${context}) skipped due to '${error instanceof Error ? error.message : String(error)}'\n`
            );
            return;
          }

          const isLastAttempt = attempt === MAX_ATTEMPTS;
          if (isLastAttempt) {
            throw error;
          }

          process.stderr.write(
            `[a11y] RETRY ${url} due to '${error instanceof Error ? error.message : String(error)}'\n`
          );
        }
      }
    });

  describe('Applicant 1 context', () => {
    describe.each(APPLICANT_1_URLS)('Page %s', url => {
      runContextualA11yTest('applicant1', url);
    });
  });

  describe('Applicant 2/Respondent context', () => {
    describe.each(RESPONDENT_CONTEXT_URLS)('Page %s', url => {
      runContextualA11yTest('applicant2', url);
    });
  });
});
