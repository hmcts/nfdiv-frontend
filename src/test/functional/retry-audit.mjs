import { randomUUID } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { threadId } from 'node:worker_threads';

import event from 'codeceptjs/lib/event';

const attempts = new Map();
const attemptStarts = new Map();
const outputDir = path.resolve(process.cwd(), 'functional-output/functional/retry-audit');

const getAttemptKey = test => `${threadId}:${test.uid}`;

const isCurrentHookTest = test => {
  const currentTest = test?.parent?.ctx?.currentTest;
  return currentTest === test || (currentTest?.uid && currentTest.uid === test.uid);
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
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

const writeAttempt = (test, status, error, hookName) => {
  if (!test?.uid) {
    return;
  }

  const attemptKey = getAttemptKey(test);
  const attempt = (attempts.get(attemptKey) || 0) + 1;
  attempts.set(attemptKey, attempt);
  const durationMs = getDurationMs(test, attemptStarts.get(attemptKey));
  attemptStarts.delete(attemptKey);

  const details = {
    ...getTestDetails(test),
    attemptKey,
    attempt,
    status,
    hookName: hookName || null,
    durationMs,
    error: serialiseError(error || test.err),
    recordedAt: new Date().toISOString(),
  };

  fs.mkdirSync(outputDir, { recursive: true });
  const fileName = `${threadId}-${test.uid}-${attempt}-${randomUUID()}.json`.replace(/[^a-zA-Z0-9._-]/g, '_');
  fs.writeFileSync(path.join(outputDir, fileName), `${JSON.stringify(details, null, 2)}\n`);
};

const deferWriteAttempt = (...args) => {
  queueMicrotask(() => writeAttempt(...args));
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function retryAudit() {
  const recordAttemptStart = test => {
    if (test?.uid) {
      attemptStarts.set(getAttemptKey(test), performance.now());
    }
  };

  // A Before hook can fail before CodeceptJS emits test.started.
  event.dispatcher.on(event.test.before, recordAttemptStart);
  event.dispatcher.on(event.test.started, recordAttemptStart);

  event.dispatcher.on(event.test.finished, test => {
    const status = test.err || test.state === 'failed' ? 'failed' : test.state === 'skipped' ? 'skipped' : 'passed';
    deferWriteAttempt(test, status, test.err);
  });

  // Hook failures may emit test.failed without a corresponding test.finished event.
  event.dispatcher.on(event.test.failed, (test, error, hookName) => {
    // CodeceptJS emits a hook failure for every test in the feature suite. Only
    // the test whose hook is running represents a real attempt.
    if (hookName && isCurrentHookTest(test)) {
      deferWriteAttempt(test, 'failed', error, hookName);
    }
  });
}
