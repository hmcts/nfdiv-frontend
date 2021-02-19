import { closeSync, openSync, readFileSync, writeFileSync } from 'fs';

import * as lockFile from 'lockfile';
import { fileExistsSync } from 'tsconfig-paths/lib/filesystem';

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

export const config = {
  TEST_URL: process.env.TEST_URL || 'http://localhost:3001',
  TestHeadlessBrowser: process.env.TEST_HEADLESS ? process.env.TEST_HEADLESS === 'true' : true,
  TestSlowMo: 250,
  WaitForTimeout: 5000,
  TestUser: `nfdiv.frontend.test${updatedContent}@hmcts.net`,
  TestPass: 'Pa55word11',
  Gherkin: {
    features: './features/*.feature',
    steps: ['../steps/common.ts', '../steps/homepage.ts'],
  },
};
