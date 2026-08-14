import { randomUUID } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { threadId } from 'node:worker_threads';

import event from 'codeceptjs/lib/event';

const attempts = new Map();
const outputDir = path.resolve(process.cwd(), 'functional-output/functional/retry-audit');

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

  const attempt = (attempts.get(test.uid) || 0) + 1;
  attempts.set(test.uid, attempt);

  const details = {
    ...getTestDetails(test),
    attempt,
    status,
    hookName: hookName || null,
    durationMs: test.duration || 0,
    error: serialiseError(error || test.err),
    recordedAt: new Date().toISOString(),
  };

  fs.mkdirSync(outputDir, { recursive: true });
  const fileName = `${threadId}-${test.uid}-${attempt}-${randomUUID()}.json`.replace(/[^a-zA-Z0-9._-]/g, '_');
  fs.writeFileSync(path.join(outputDir, fileName), `${JSON.stringify(details, null, 2)}\n`);
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function retryAudit() {
  event.dispatcher.on(event.test.finished, test => {
    const status = test.err || test.state === 'failed' ? 'failed' : test.state === 'skipped' ? 'skipped' : 'passed';
    writeAttempt(test, status, test.err);
  });

  // Hook failures may emit test.failed without a corresponding test.finished event.
  event.dispatcher.on(event.test.failed, (test, error, hookName) => {
    if (hookName) {
      writeAttempt(test, 'failed', error, hookName);
    }
  });
}
