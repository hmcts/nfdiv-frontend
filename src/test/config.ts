import { closeSync, openSync, readFileSync, writeFileSync } from 'fs';

import sysConfig from 'config';
import dayjs from 'dayjs';
import * as lockFile from 'lockfile';
import { fileExistsSync } from 'tsconfig-paths/lib/filesystem';

import { YOUR_DETAILS_URL } from '../main/steps/urls';

import { IdamUserManager } from './steps/IdamUserManager';

const lock = '/tmp/concepts.worker.lock';
lockFile.lockSync(lock);

const filename = '/tmp/concepts.worker.id';
if (!fileExistsSync(filename)) {
  closeSync(openSync(filename, 'w'));
}

const content = readFileSync(filename).toString();
const instanceNo = (content === '' || +content >= 8 ? 0 : +content) + 1;

writeFileSync(filename, instanceNo + '');
lockFile.unlockSync(lock);

const generateTestUsername = () => `nfdiv.frontend.test${instanceNo}.${dayjs().format('YYYYMMDD-HHmmssSSS')}@hmcts.net`;
const TestUser = generateTestUsername();
const TestPass = 'Pa55word11';
const idamUserManager = new IdamUserManager(sysConfig.get('services.idam.tokenURL'));

const autoLogin = {
  login: (I: CodeceptJS.I, username = TestUser, password = TestPass): void => {
    I.amOnPage(`${YOUR_DETAILS_URL}?lng=en`);
    I.waitForText('Sign in or create an account');
    I.fillField('username', username);
    I.fillField('password', password);
    I.click('Sign in');
    I.waitForText('Apply for a divorce', 15);
  },
  check: (I: CodeceptJS.I): void => {
    I.amOnPage(`${YOUR_DETAILS_URL}?lng=en`);
    I.waitForText('Apply for a divorce');
  },
  restore: (I: CodeceptJS.I, cookies: CodeceptJS.Cookie[]): void => {
    I.amOnPage('/info');
    I.setCookie(cookies);
  },
};

export const config = {
  TEST_URL: process.env.TEST_URL || 'http://localhost:3001',
  TestHeadlessBrowser: process.env.TEST_HEADLESS ? process.env.TEST_HEADLESS === 'true' : true,
  TestSlowMo: 250,
  WaitForTimeout: 5000,
  TestUser,
  TestPass,
  Gherkin: {
    features: './features/*.feature',
    steps: [
      '../steps/common.ts',
      '../steps/date.ts',
      '../steps/check-your-answers.ts',
      '../steps/jurisdiction.ts',
      '../steps/happy-path.ts',
    ],
  },
  bootstrap: async (): Promise<void> => idamUserManager.create(TestUser, TestPass),
  teardown: async (): Promise<void> => idamUserManager.deleteAll(),
  AutoLogin: {
    enabled: true,
    saveToFile: false,
    users: {
      citizen: autoLogin,
      citizenSingleton: {
        login: (I: CodeceptJS.I): void => {
          const username = generateTestUsername();
          idamUserManager.create(username, TestPass);
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
    },
  },
};
