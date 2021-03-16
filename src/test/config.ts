import { closeSync, openSync, readFileSync, writeFileSync } from 'fs';

import * as lockFile from 'lockfile';
import { fileExistsSync } from 'tsconfig-paths/lib/filesystem';

import { YOUR_DETAILS_URL } from '../main/steps/urls';

const lock = '/tmp/concepts.worker.lock';
lockFile.lockSync(lock);

const filename = '/tmp/concepts.worker.id';
if (!fileExistsSync(filename)) {
  closeSync(openSync(filename, 'w'));
}

const content = readFileSync(filename).toString();
const updatedContent = (content === '' || +content >= 8 ? 0 : +content) + 1;

writeFileSync(filename, updatedContent + '');
lockFile.unlockSync(lock);

const TestUser = `nfdiv.frontend.test${updatedContent}@hmcts.net`;
const TestPass = 'Pa55word11';

export const config = {
  TEST_URL: process.env.TEST_URL || 'http://localhost:3001',
  TestHeadlessBrowser: process.env.TEST_HEADLESS ? process.env.TEST_HEADLESS === 'true' : true,
  TestSlowMo: 250,
  WaitForTimeout: 5000,
  TestUser,
  TestPass,
  Gherkin: {
    features: './features/*.feature',
    steps: ['../steps/common.ts', '../steps/date.ts', '../steps/check-your-answers.ts'],
  },
  AutoLogin: {
    enabled: true,
    saveToFile: false,
    users: {
      user: {
        login: (I: CodeceptJS.I): void => {
          I.amOnPage(`${YOUR_DETAILS_URL}?lng=en`);
          I.waitForText('Sign in or create an account');
          I.fillField('username', TestUser);
          I.fillField('password', TestPass);
          I.click('Sign in');
          I.amOnPage(`${YOUR_DETAILS_URL}?lng=en`);
          I.waitForText('Apply for a divorce');
        },
        check: (I: CodeceptJS.I): void => {
          I.amOnPage(`${YOUR_DETAILS_URL}?lng=en`);
          I.waitForText('Apply for a divorce');
        },
      },
    },
  },
};
