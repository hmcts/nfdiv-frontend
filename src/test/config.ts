import { PropertiesVolume } from '../main/modules/properties-volume';
import { Application } from 'express';

if (!process.env.TEST_PASSWORD) {
  new PropertiesVolume().enableFor({ locals: { developmentMode: true } } as unknown as Application);
}

import sysConfig from 'config';
import { getTokenFromApi } from '../main/app/auth/service/get-service-auth-token';
import { APPLICANT_2, ENTER_YOUR_ACCESS_CODE, HOME_URL, YOUR_DETAILS_URL } from '../main/steps/urls';

import { IdamUserManager } from './steps/IdamUserManager';

// better handling of unhandled exceptions
process.on('unhandledRejection', reason => {
  throw reason;
});

getTokenFromApi();

const generateTestUsername = () => `nfdiv.frontend.test.${new Date().getTime()}.${Math.random()}@hmcts.net`;
const TestUser = generateTestUsername();
const TestPass = process.env.TEST_PASSWORD || sysConfig.get('e2e.userTestPassword') || '';
const idamUserManager = new IdamUserManager(sysConfig.get('services.idam.tokenURL'));
const LOGIN_TIMEOUT = 60;

export const autoLogin = {
  login: (I: CodeceptJS.I, username = TestUser, password = TestPass, createCase = true): void => {
    I.amOnPage(HOME_URL);
    I.waitForText('Sign in or create an account');
    I.fillField('username', username);
    I.fillField('password', password);
    I.click('Sign in');
    I.waitForText('Apply for a divorce', LOGIN_TIMEOUT);
    if (createCase) {
      I.amOnPage(YOUR_DETAILS_URL);
      I.click('My husband');
      I.click('Continue');
      I.waitForText('Has your marriage broken down irretrievably (it cannot be saved)?', LOGIN_TIMEOUT);
      I.amOnPage(YOUR_DETAILS_URL);
      I.waitForText('Apply for a divorce', LOGIN_TIMEOUT);
    }
  },
  check: (I: CodeceptJS.I): void => {
    I.amOnPage(`${YOUR_DETAILS_URL}?lng=en`);
    I.waitForText('Apply for a divorce', LOGIN_TIMEOUT);
  },
  restore: (I: CodeceptJS.I, cookies: CodeceptJS.Cookie[]): void => {
    I.amOnPage('/info');
    I.setCookie(cookies);
  },
};

export const autoLoginForApplicant2 = {
  login: (I: CodeceptJS.I, username = TestUser, password = TestPass): void => {
    I.amOnPage(APPLICANT_2);
    I.waitForText('Sign in or create an account');
    I.fillField('username', username);
    I.fillField('password', password);
    I.click('Sign in');
    I.waitForText('Apply for a divorce', LOGIN_TIMEOUT);
  },
  check: (I: CodeceptJS.I): void => {
    I.amOnPage(`${APPLICANT_2 + ENTER_YOUR_ACCESS_CODE}?lng=en`);
    I.waitForText('Apply for a divorce', LOGIN_TIMEOUT);
  },
  restore: (I: CodeceptJS.I, cookies: CodeceptJS.Cookie[]): void => {
    I.amOnPage('/info');
    I.setCookie(cookies);
  },
};

export const config = {
  TEST_URL: process.env.TEST_URL || 'http://localhost:3001',
  TestHeadlessBrowser: process.env.TEST_HEADLESS ? process.env.TEST_HEADLESS === 'true' : true,
  WaitForTimeout: 30000,
  GetCurrentUser: (): { username: string; password: string } => ({
    username: idamUserManager.getCurrentUsername(),
    password: TestPass,
  }),
  GetUser: (index: number): { username: string; password: string } => ({
    username: idamUserManager.getUsername(index),
    password: TestPass,
  }),
  GetOrCreateCaseWorker: async (): Promise<{ username: string; password: string }> => {
    let caseWorker = idamUserManager.getCaseWorker();
    if (!caseWorker) {
      caseWorker = generateTestUsername();
      await idamUserManager.createCaseWorker(caseWorker, TestPass);
    }
    return {
      username: caseWorker,
      password: TestPass,
    };
  },
  clearNewUsers: async (): Promise<void> => {
    await idamUserManager.clearAndKeepOnlyOriginalUser();
  },
  Gherkin: {
    features: './features/**/*.feature',
    steps: [
      '../steps/common.ts',
      '../steps/date.ts',
      '../steps/check-your-answers.ts',
      '../steps/jurisdiction.ts',
      '../steps/happy-path.ts',
      '../steps/postcode.ts',
      '../steps/you-need-to-review-your-application.ts',
    ],
  },
  bootstrap: async (): Promise<void> => idamUserManager.createUser(TestUser, TestPass),
  teardown: async (): Promise<void> => idamUserManager.deleteAll(),
  helpers: {},
  AutoLogin: {
    enabled: true,
    saveToFile: false,
    users: {
      citizen: autoLogin,
      citizenSingleton: {
        login: async (I: CodeceptJS.I): Promise<void> => {
          const username = generateTestUsername();
          await idamUserManager.createUser(username, TestPass);
          autoLogin.login(I, username, TestPass);
        },
        check: autoLogin.check,
        fetch: (): void => {
          // don't fetch existing login
        },
        restore: (): void => {
          // don't restore existing login
        },
      },
      citizenApplicant2: {
        login: async (I: CodeceptJS.I): Promise<void> => {
          const username = generateTestUsername();
          await idamUserManager.createUser(username, TestPass);
          autoLoginForApplicant2.login(I, username, TestPass);
        },
        check: autoLoginForApplicant2.check,
        fetch: (): void => {
          // don't fetch existing login
        },
        restore: (): void => {
          // don't restore existing login
        },
      },
    },
  },
};

process.env.PLAYWRIGHT_SERVICE_RUN_ID = process.env.PLAYWRIGHT_SERVICE_RUN_ID || new Date().toISOString();

config.helpers = {
  Playwright: {
    url: config.TEST_URL,
    show: !config.TestHeadlessBrowser,
    browser: 'chromium',
    waitForTimeout: config.WaitForTimeout,
    waitForAction: 350,
    timeout: config.WaitForTimeout,
    retries: 3,
    waitForNavigation: 'load',
    ignoreHTTPSErrors: true,
    bypassCSP: true,
    chromium: process.env.PLAYWRIGHT_SERVICE_ACCESS_TOKEN && {
      timeout: 30000,
      headers: {
        'x-mpt-access-key': process.env.PLAYWRIGHT_SERVICE_ACCESS_TOKEN,
      },
      exposeNetwork: process.env.TEST_URL ? '*.platform.hmcts.net' : '<loopback>',
      browserWSEndpoint: {
        wsEndpoint: `${process.env.PLAYWRIGHT_SERVICE_URL}?cap=${JSON.stringify({
          os: 'linux',
          runId: process.env.PLAYWRIGHT_SERVICE_RUN_ID,
        })}`,
      },
    },
  },
};
