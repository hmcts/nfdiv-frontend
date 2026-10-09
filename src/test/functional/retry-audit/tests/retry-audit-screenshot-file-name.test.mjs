import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { createAttemptDetails } from '../../retry-audit.mjs';

import { getRetryAuditScreenshotFileName } from '../retry-audit-screenshot-file-name.mjs';
import { isScreenshotRenameEnabled, renameScreenshotArtifact } from '../retry-audit-screenshot.mjs';

test('includes the retry attempt in failed screenshot filenames', () => {
  const scenario = { title: 'A scenario with spaces', uid: 'scenario-id' };

  assert.equal(getRetryAuditScreenshotFileName(scenario, 1), 'A_scenario_with_spaces.attempt_1.failed.png');
  assert.equal(getRetryAuditScreenshotFileName(scenario, 3), 'A_scenario_with_spaces.attempt_3.failed.png');
});

test('records screenshot filenames only for failed attempts', () => {
  const testCase = {
    uid: 'scenario-id',
    title: 'A scenario with spaces',
    parent: { title: 'A feature' },
  };

  const failed = createAttemptDetails(testCase, 2, 'failed', new Error('failure'), null, 100);
  const passed = createAttemptDetails(testCase, 3, 'passed', null, null, 100);

  assert.equal(failed.screenshotFile, 'A_scenario_with_spaces.attempt_2.failed.png');
  assert.equal(passed.screenshotFile, null);
});

test('enables renaming by default and for fail mode only', () => {
  assert.equal(isScreenshotRenameEnabled({}), true);
  assert.equal(isScreenshotRenameEnabled({ on: 'fail' }), true);
  assert.equal(isScreenshotRenameEnabled({ on: 'test' }), false);
  assert.equal(isScreenshotRenameEnabled({ on: 'step' }), false);
  assert.equal(isScreenshotRenameEnabled({ on: 'file' }), false);
  assert.equal(isScreenshotRenameEnabled({ on: 'url' }), false);
  assert.equal(isScreenshotRenameEnabled({ enabled: false }), false);
  assert.equal(isScreenshotRenameEnabled({ enabled: false, on: 'fail' }), false);
});

test('omits the screenshot filename when renaming is disabled', () => {
  const testCase = {
    uid: 'scenario-id',
    title: 'A scenario with spaces',
    parent: { title: 'A feature' },
  };

  const details = createAttemptDetails(testCase, 2, 'failed', new Error('failure'), null, 100, false);

  assert.equal(details.screenshotFile, null);
});

test('renames the captured screenshot and updates artifact metadata', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'nfdiv-screenshot-'));
  try {
    const originalPath = path.join(directory, 'A_scenario_with_spaces.failed.png');
    await writeFile(originalPath, 'png');
    const testCase = {
      title: 'A scenario with spaces',
      artifacts: { screenshot: originalPath },
      attachments: [originalPath],
    };

    await renameScreenshotArtifact(testCase, 2);

    const renamedPath = path.join(directory, 'A_scenario_with_spaces.attempt_2.failed.png');
    assert.equal(await readFile(renamedPath, 'utf8'), 'png');
    assert.equal(testCase.artifacts.screenshot, renamedPath);
    assert.deepEqual(testCase.attachments, [renamedPath]);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
