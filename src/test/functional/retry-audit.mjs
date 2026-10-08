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
const activeHooks = new Map();
const completedHooks = new Set();
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
  const activeAttempt = activeAttempts.get(attemptKey);
  if (activeAttempt?.managed && activeAttempt.completed) {
    return;
  }
  if (activeAttempt?.managed) {
    activeAttempt.completed = true;
  } else {
    activeAttempts.delete(attemptKey);
  }
  const attempt = activeAttempt?.managed ? activeAttempt.scenarioAttempt : (attempts.get(attemptKey) || 0) + 1;
  attempts.set(attemptKey, attempt);
  const durationMs = getDurationMs(activeAttempt?.managed ? null : test, attemptStarts.get(attemptKey));
  attemptStarts.delete(attemptKey);

  const details = createAttemptDetails(test, attempt, status, error, hookName, durationMs, screenshotRenamingEnabled);

  fs.mkdirSync(outputDir, { recursive: true });
  const fileName = `${threadId}-${test.uid}-${attempt}-${randomUUID()}.json`.replace(/[^a-zA-Z0-9._-]/g, '_');
  fs.writeFileSync(path.join(outputDir, fileName), `${JSON.stringify(details, null, 2)}\n`);
};

const getHookKey = details => `${getAttemptKey(details.test)}:${details.scenarioAttempt}:${details.hookAttempt}`;

const isTrackableHook = details =>
  isTrackableTest(details?.test) &&
  [details.scenarioAttempt, details.hookAttempt].every(value => Number.isInteger(value) && value > 0);

const writeHookAttempt = details => {
  if (!isTrackableHook(details)) {
    return;
  }
  const key = getHookKey(details);
  if (completedHooks.has(key)) {
    return;
  }
  const activeHook = activeHooks.get(key);
  activeHooks.delete(key);
  completedHooks.add(key);
  const audit = {
    ...getTestDetails(details.test),
    kind: 'hook',
    scenarioAttempt: details.scenarioAttempt,
    hookAttempt: details.hookAttempt,
    hookName: details.hookName,
    status: details.status,
    durationMs: Number.isFinite(details.durationMs) ? details.durationMs : getDurationMs(null, activeHook?.startedAt),
    screenshotFile: details.screenshotFile || null,
    error: serialiseError(details.error),
    recordedAt: new Date().toISOString(),
  };
  fs.mkdirSync(outputDir, { recursive: true });
  const fileName = `${key}-${randomUUID()}.hook.json`.replace(/[^a-zA-Z0-9._-]/g, '_');
  fs.writeFileSync(path.join(outputDir, fileName), `${JSON.stringify(audit, null, 2)}\n`);
};

export const flushActiveAttempts = (exitCode, error) => {
  if (exitCode === 0) {
    return;
  }

  const exitError = error || new Error(`Feature process exited with code ${exitCode}`);
  for (const details of activeHooks.values()) {
    writeHookAttempt({ ...details, status: 'failed', error: exitError });
  }
  for (const { test, error: activeError, hookName, completed } of activeAttempts.values()) {
    if (completed) {
      continue;
    }
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
      // test.started follows the Background and must not discard setup time.
      const activeAttempt = activeAttempts.get(attemptKey);
      if (activeAttempt?.managed && !activeAttempt.completed) {
        return;
      }
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
  event.dispatcher.on(event.test.started, test => {
    const activeAttempt = activeAttempts.get(getAttemptKey(test));
    if (activeAttempt?.managed) {
      // Setup has completed: an abnormal body exit is a scenario failure.
      delete activeAttempt.hookName;
    }
  });

  // Optional event contract: deliberately do not import or require the Background retry plugin.
  // With no custom events, all existing scenario/hook listeners operate as before.
  event.dispatcher.on('nfdiv.hookAttempt.started', details => {
    if (!isTrackableHook(details)) {
      return;
    }
    const attemptKey = getAttemptKey(details.test);
    let activeAttempt = activeAttempts.get(attemptKey);
    if (!activeAttempt || activeAttempt.completed || activeAttempt.scenarioAttempt !== details.scenarioAttempt) {
      const setupElapsed = Number.isFinite(details.test.startedAt)
        ? Math.max(0, Date.now() - details.test.startedAt)
        : 0;
      const startedAt = activeAttempt && !activeAttempt.completed ? attemptStarts.get(attemptKey) : undefined;
      attemptStarts.set(attemptKey, startedAt ?? performance.now() - setupElapsed);
      activeAttempt = { test: details.test };
      activeAttempts.set(attemptKey, activeAttempt);
    }
    Object.assign(activeAttempt, {
      managed: true,
      scenarioAttempt: details.scenarioAttempt,
      hookName: details.hookName,
    });
    activeHooks.set(getHookKey(details), { ...details, startedAt: performance.now() });
  });
  event.dispatcher.on('nfdiv.hookAttempt.finished', writeHookAttempt);

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

  return { auditsBackgroundRetries: true };
}
