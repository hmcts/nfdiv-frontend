import { rename } from 'node:fs/promises';
import path from 'node:path';

import event from 'codeceptjs/lib/event';
import output from 'codeceptjs/lib/output';
import recorder from 'codeceptjs/lib/recorder';

import { getRetryAuditScreenshotFileName } from './retry-audit-screenshot-file-name.mjs';

export const isScreenshotRenameEnabled = (screenshotConfig = {}) =>
  screenshotConfig.enabled !== false && (!Object.hasOwn(screenshotConfig, 'on') || screenshotConfig.on === 'fail');

export const renameScreenshotArtifact = async (test, attempt) => {
  const originalPath = test.artifacts?.screenshot;
  if (!originalPath) {
    return;
  }

  const renamedPath = path.join(path.dirname(originalPath), getRetryAuditScreenshotFileName(test, attempt));
  if (path.resolve(originalPath) === path.resolve(renamedPath)) {
    return;
  }

  try {
    await rename(originalPath, renamedPath);
    test.artifacts.screenshot = renamedPath;
    if (Array.isArray(test.attachments)) {
      test.attachments = test.attachments.map(attachment => (attachment === originalPath ? renamedPath : attachment));
    }
  } catch (error) {
    output.plugin('screenshot', `Failed to rename screenshot: ${error.message}`);
  }
};

export default function retryAuditScreenshot(screenshotConfig = {}) {
  if (!isScreenshotRenameEnabled(screenshotConfig)) {
    return;
  }

  let currentTest = null;
  event.dispatcher.on(event.test.before, test => {
    currentTest = test;
  });
  event.dispatcher.on(event.test.failed, (test, _error, hookName) => {
    if (hookName === 'BeforeSuite' || hookName === 'AfterSuite') {
      return;
    }

    const failedTest = test || currentTest;
    if (!failedTest) {
      return;
    }

    const attempt = typeof failedTest.currentRetry === 'function' ? failedTest.currentRetry() + 1 : 1;
    queueMicrotask(() => {
      recorder.add('rename screenshot', () => renameScreenshotArtifact(failedTest, attempt), true);
    });
  });
}
