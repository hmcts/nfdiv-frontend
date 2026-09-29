import { randomUUID } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { threadId } from 'node:worker_threads';

import Config from 'codeceptjs/lib/config';
import event from 'codeceptjs/lib/event';

import { getRetryAuditScreenshotFileName } from './retry-audit/retry-audit-screenshot-file-name.mjs';
import retryAuditScreenshot, { isScreenshotRenameEnabled } from './retry-audit/retry-audit-screenshot.mjs';

const attempts = new Map();
const attemptStarts = new Map();
const activeAttempts = new Map();
const outputDir = path.resolve(process.cwd(), 'functional-output/functional/retry-audit');
let screenshotRenamingEnabled = true;
let processExitError = null;

const getAttemptKey = test => `${threadId}:${test.uid}`;

const isCurrentHookTest = test => {
  const currentTest = test?.parent?.ctx?.currentTest;
  return currentTest === test || (currentTest?.uid && currentTest.uid === test.uid);
};

const isTrackableTest = test => Boolean(test?.uid);

export const getDurationMs = (test, startedAt, endedAt = performance.now()) => {
  if (Number.isFinite(test?.duration) && test.duration > 0) {
    return test.duration;
  }

  if (Number.isFinite(startedAt) && Number.isFinite(endedAt)) {
    return Math.max(0, Math.round(endedAt - startedAt));
  }

  return 0;
};

const serialiseError = error => {
  if (!error) {
    return null;
  }

  return {
    message: error.message,
    name: error.name,
    stack: error.stack,
  };
};

const getTestDetails = test => ({
  uid: test.uid,
  feature: test.parent?.title,
  featureFile: test.parent?.file,
  scenario: test.title,
  workerThreadId: threadId,
});

export const createAttemptDetails = (
  test,
  attempt,
  status,
  error,
  hookName,
  durationMs,
  shouldRenameScreenshot = true
) => ({
  ...getTestDetails(test),
  attemptKey: getAttemptKey(test),
  attempt,
  status,
  hookName: hookName || null,
  screenshotFile: status === 'failed' && shouldRenameScreenshot ? getRetryAuditScreenshotFileName(test, attempt) : null,
  durationMs,
  error: serialiseError(error || test.err),
  recordedAt: new Date().toISOString(),
});

const writeAttempt = (test, status, error, hookName) => {
  if (!isTrackableTest(test)) {
    return;
  }

  const attemptKey = getAttemptKey(test);
  activeAttempts.delete(attemptKey);
  const attempt = (attempts.get(attemptKey) || 0) + 1;
  attempts.set(attemptKey, attempt);
  const durationMs = getDurationMs(test, attemptStarts.get(attemptKey));
  attemptStarts.delete(attemptKey);

  const details = createAttemptDetails(test, attempt, status, error, hookName, durationMs, screenshotRenamingEnabled);

  fs.mkdirSync(outputDir, { recursive: true });
  const fileName = `${threadId}-${test.uid}-${attempt}-${randomUUID()}.json`.replace(/[^a-zA-Z0-9._-]/g, '_');
  fs.writeFileSync(path.join(outputDir, fileName), `${JSON.stringify(details, null, 2)}\n`);
};

export const flushActiveAttempts = (exitCode, error) => {
  if (exitCode === 0) {
    return;
  }

  for (const { test, error: activeError, hookName } of activeAttempts.values()) {
    writeAttempt(
      test,
      'failed',
      error || activeError || new Error(`Feature process exited with code ${exitCode}`),
      hookName
    );
  }
};

const deferWriteAttempt = (...args) => {
  queueMicrotask(() => writeAttempt(...args));
};

export default function retryAudit() {
  const screenshotConfig = Config.get('plugins')?.screenshot ?? {};
  screenshotRenamingEnabled = isScreenshotRenameEnabled(screenshotConfig);
  retryAuditScreenshot(screenshotConfig);

  const recordAttemptStart = test => {
    if (isTrackableTest(test)) {
      const attemptKey = getAttemptKey(test);
      attemptStarts.set(attemptKey, performance.now());
      activeAttempts.set(attemptKey, { test });
    }
  };

  process.on('uncaughtExceptionMonitor', error => {
    processExitError = error;
  });
  process.on('exit', code => flushActiveAttempts(code, processExitError));

  // A Before hook can fail before CodeceptJS emits test.started.
  for (const eventName of [event.test.before, event.test.started]) {
    event.dispatcher.on(eventName, recordAttemptStart);
  }

  event.dispatcher.on(event.test.finished, test => {
    const status = test.err || test.state === 'failed' ? 'failed' : test.state === 'skipped' ? 'skipped' : 'passed';
    if (status === 'failed') {
      const activeAttempt = activeAttempts.get(getAttemptKey(test));
      if (activeAttempt) {
        activeAttempt.error = test.err;
      }
    }
    deferWriteAttempt(test, status, test.err);
  });

  // Hook failures may emit test.failed without a corresponding test.finished event.
  event.dispatcher.on(event.test.failed, (test, error, hookName) => {
    // CodeceptJS emits a hook failure for every test in the feature suite. Only
    // the test whose hook is running represents a real attempt.
    if (hookName && isCurrentHookTest(test)) {
      const activeAttempt = activeAttempts.get(getAttemptKey(test));
      if (activeAttempt) {
        activeAttempt.error = error;
        activeAttempt.hookName = hookName;
      }
      deferWriteAttempt(test, 'failed', error, hookName);
    }
  });
}
