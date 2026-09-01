import { PropertiesVolume } from '../main/modules/properties-volume';
import { Application } from 'express';
import sysConfig from 'config';
import { getTokenFromApi } from '../main/app/auth/service/get-service-auth-token';
import { APPLICANT_2, ENTER_YOUR_ACCESS_CODE, HOME_URL, YOUR_DETAILS_URL } from '../main/steps/urls';
import { IdamUserManager } from './steps/IdamUserManager';
import { createAzurePlaywrightConfig, ServiceAuth, ServiceOS } from "@azure/playwright";
import { randomUUID } from 'crypto';

// better handling of unhandled exceptions
process.on('unhandledRejection', reason => {
  throw reason;
});

let TestUser: string;
let TestPass: string;
let idamUserManager: IdamUserManager;
const LOGIN_TIMEOUT = 60;

const setupTestSecrets = async () => {
  const propertiesVolume = new PropertiesVolume();
  await propertiesVolume.enableFor({ locals: { developmentMode: true } } as unknown as Application);
};

const generateTestUsername = () => `nfdiv.frontend.test.${new Date().getTime()}.${Math.random()}@hmcts.net`;

const initializeTestEnvironment = async () => {
  if (!process.env.TEST_PASSWORD) {
    await setupTestSecrets();
  }

  getTokenFromApi();

  TestUser = process.env.TEST_USER || generateTestUsername();
  TestPass = process.env.TEST_PASSWORD || sysConfig.get('e2e.userTestPassword') || '';
  idamUserManager = new IdamUserManager(sysConfig.get('services.idam.tokenURL'));
};

const LOGIN_HEADING = 'Sign in or create an account';
const MODERN_INTRO_TEXT = 'You may already have an account if you have used an HMCTS service before';
const MODERN_EMAIL_HEADING = 'Enter your email address';
const MODERN_PASSWORD_HEADING = 'Enter your password';

const doClassicLogin = async (I: CodeceptJS.I, username: string, password: string): Promise<void> => {
  I.waitForText(LOGIN_HEADING, LOGIN_TIMEOUT);
  I.fillField('username', username);
  I.fillField('password', password);
  I.click('Sign in');
};

const doModernLogin = async (I: CodeceptJS.I, username: string, password: string): Promise<void> => {
  I.waitForText(LOGIN_HEADING, LOGIN_TIMEOUT);
  I.click('Sign in');
  I.waitForText(MODERN_EMAIL_HEADING, LOGIN_TIMEOUT);
  I.fillField('email', username);
  I.click('Continue');
  I.waitForText(MODERN_PASSWORD_HEADING, LOGIN_TIMEOUT);
  I.fillField('password', password);
  I.click('Continue');
};

const doIdamLogin = async (I: CodeceptJS.I, username: string, password: string): Promise<void> => {
  I.waitForElement('h1', LOGIN_TIMEOUT);
  const pageText = await I.grabTextFrom('body');

  if (pageText.includes(MODERN_INTRO_TEXT)) {
    await doModernLogin(I, username, password);
    return;
  }

  await doClassicLogin(I, username, password);
};

export const autoLogin = {
  login: async (I: CodeceptJS.I, username = TestUser, password = TestPass, createCase = true): Promise<void> => {
    I.amOnPage(HOME_URL);
    await doIdamLogin(I, username, password);

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
  login: async (I: CodeceptJS.I, username = TestUser, password = TestPass): Promise<void> => {
    I.amOnPage(APPLICANT_2);
    await doIdamLogin(I, username, password);

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

export enum TestUserType {
  CITIZEN = 'citizen',
  CITIZEN_SINGLETON = 'citizenSingleton',
  CITIZEN_APPLICANT_2 = 'citizenApplicant2',
}

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
  login: async (I: CodeceptJS.I, userType: TestUserType) => {
    let username: string;

    switch (userType) {
      case TestUserType.CITIZEN:
        await autoLogin.login(I);
        break;
      case TestUserType.CITIZEN_SINGLETON:
        if (process.env.TEST_USER) {
          await autoLogin.login(I, TestUser, TestPass);
        } else {
          username = generateTestUsername();
          await idamUserManager.createUser(username, TestPass);
          await autoLogin.login(I, username, TestPass);
        }
        break;
      case TestUserType.CITIZEN_APPLICANT_2:
        if (process.env.TEST_USER) {
          await autoLoginForApplicant2.login(I, TestUser, TestPass);
        } else {
          username = generateTestUsername();
          await idamUserManager.createUser(username, TestPass);
          await autoLoginForApplicant2.login(I, username, TestPass);
        }
        break;
    }
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
  bootstrap: async (): Promise<void> => {
    await initializeTestEnvironment();
    if (!process.env.TEST_USER) {
      await idamUserManager.createUser(TestUser, TestPass);
    }
  },
  teardown: async (): Promise<void> => idamUserManager.deleteAll(),
  helpers: {},
};

process.env.PLAYWRIGHT_SERVICE_RUN_ID = process.env.PLAYWRIGHT_SERVICE_RUN_ID || randomUUID();

const playwrightConfig = {
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
}

config.helpers = {
  Playwright: {
    ...playwrightConfig,
    chromium: process.env.PLAYWRIGHT_SERVICE_ACCESS_TOKEN && createAzurePlaywrightConfig(
      playwrightConfig, {
      connectTimeout: config.WaitForTimeout,
      os: ServiceOS.LINUX,
      serviceAuthType: ServiceAuth.ACCESS_TOKEN,
      exposeNetwork: process.env.TEST_URL ? '*.platform.hmcts.net' : '<loopback>',
      runId: process.env.PLAYWRIGHT_SERVICE_RUN_ID,
    }),
  },
};
