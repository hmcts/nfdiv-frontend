import { setTimeout as delay } from 'node:timers/promises';

import Config from 'codeceptjs/lib/config';
import container from 'codeceptjs/lib/container';
import event from 'codeceptjs/lib/event';
import { fireHook } from 'codeceptjs/lib/mocha/hooks';
import output from 'codeceptjs/lib/output';
import recorder from 'codeceptjs/lib/recorder';

import { captureHookScreenshot, getTerminalHookScreenshot } from './before-hook-retry/before-hook-screenshots.mjs';

const attemptStarted = 'nfdiv.hookAttempt.started';
const attemptFinished = 'nfdiv.hookAttempt.finished';
const suppressedHookEvents = new Set([event.hook.started, event.hook.passed, event.hook.failed, event.hook.finished]);

const resetFailedRecorder = async () => {
  // Drain the failed chain before starting another queue. Otherwise, a pending
  // catch from the previous queue can stop the newly started recorder.
  await recorder.catch(() => {});
  recorder.stop();
  recorder.start();
};

const createHookEventSuppressor = () => {
  const emit = event.emit;
  event.emit = function patchedEmit(eventName, ...args) {
    if (suppressedHookEvents.has(eventName)) {
      return;
    }
    if (eventName === event.test.failed && args[2] === 'Before') {
      return;
    }
    emit.call(this, eventName, ...args);
  };
  return () => {
    event.emit = emit;
  };
};

const runOriginalBeforeHook = (context, beforeFn) =>
  new Promise((resolve, reject) => {
    let completed = false;
    const restore = createHookEventSuppressor();
    const finish = error => {
      if (completed) {
        return;
      }
      completed = true;
      if (error) {
        reject({ error: error instanceof Error ? error : new Error(String(error)), restore });
      } else {
        resolve({ restore });
      }
    };
    try {
      const result = beforeFn.call(context, finish);
      if (result?.then) {
        result.then(() => finish(), finish);
      }
    } catch (error) {
      finish(error);
    }
  });

const clearSuiteHookFailures = suite => {
  suite.eachTest(testCase => {
    delete testCase.err;
  });
};

const getConfiguredBeforeRetries = suite => {
  const explicitSuiteRetries =
    Number.isInteger(suite.opts?.retryBefore) && suite.opts.retryBefore >= 0 ? suite.opts.retryBefore : 0;
  let retries = explicitSuiteRetries;
  let retryConfig = Config.get('retry');
  if (!retryConfig || Number.isInteger(+retryConfig)) {
    return retries;
  }
  if (!Array.isArray(retryConfig)) {
    retryConfig = [retryConfig];
  }
  for (const candidate of retryConfig) {
    if (!candidate || typeof candidate !== 'object') {
      continue;
    }
    if (candidate.grep && !suite.title.includes(candidate.grep)) {
      continue;
    }
    if (Number.isInteger(candidate.Before) && candidate.Before >= 0) {
      retries = Math.max(retries, candidate.Before);
    }
  }
  return retries;
};

export const createBeforeHookRetryHandler = (suite, beforeFn, { retries, minTimeout, factor }) =>
  function (done) {
    let completed = false;
    const finish = error => {
      if (!completed) {
        completed = true;
        done(error);
      }
    };
    const run = async () => {
      const test = this.currentTest;
      const scenarioAttempt = test.currentRetry() + 1;
      fireHook(event.hook.started, suite);
      for (let hookAttempt = 1; hookAttempt <= retries + 1; hookAttempt++) {
        recorder.startUnlessRunning();
        const details = { test, scenarioAttempt, hookName: 'Before', hookAttempt };
        const startedAt = performance.now();
        event.emit(attemptStarted, details);
        let error;
        let restoreHookEvents = () => {};
        try {
          ({ restore: restoreHookEvents } = await runOriginalBeforeHook(this, beforeFn));
        } catch (cause) {
          restoreHookEvents = cause?.restore || restoreHookEvents;
          const failed = cause?.error ?? cause;
          error = failed instanceof Error ? failed : new Error(String(failed));
        }
        const durationMs = Math.max(0, Math.round(performance.now() - startedAt));
        if (!error) {
          restoreHookEvents();
          recorder.startUnlessRunning();
          event.emit(attemptFinished, { ...details, status: 'passed', durationMs, screenshotFile: null });
          fireHook(event.hook.passed, suite);
          fireHook(event.hook.finished, suite);
          await recorder.promise();
          return;
        }

        await resetFailedRecorder();
        if (hookAttempt <= retries) {
          restoreHookEvents();
          clearSuiteHookFailures(suite);
          const screenshotFile = await captureHookScreenshot(test, scenarioAttempt, hookAttempt);
          event.emit(attemptFinished, { ...details, status: 'failed', durationMs, error, screenshotFile });
          await delay(minTimeout * factor ** (hookAttempt - 1));
          continue;
        }

        // Retried Mocha tests can inherit the previous attempt's artifacts.
        // An unavailable browser must not rename/reuse that older screenshot.
        test.artifacts = { ...test.artifacts };
        delete test.artifacts.screenshot;
        test.err = error;
        restoreHookEvents();
        event.emit(event.test.failed, test, error, 'Before');
        fireHook(event.hook.failed, suite, error);
        fireHook(event.hook.finished, suite);
        // Screenshot renaming is enqueued in a microtask after test.failed.
        await Promise.resolve();
        await recorder.promise().catch(cleanupError => output.plugin('hookRetry', cleanupError.message));
        event.emit(attemptFinished, {
          ...details,
          status: 'failed',
          durationMs,
          error,
          screenshotFile: getTerminalHookScreenshot(test),
        });
        throw error;
      }
    };
    run().then(() => finish(), finish);
  };

export default function beforeHookRetry(options = {}) {
  const config = { retries: 3, minTimeout: 1000, factor: 2, ...options };
  if (
    !Number.isInteger(config.retries) ||
    config.retries < 0 ||
    !Number.isFinite(config.minTimeout) ||
    config.minTimeout < 0 ||
    !Number.isFinite(config.factor) ||
    config.factor < 1
  ) {
    throw new Error('Invalid Before hook retry configuration');
  }
  event.dispatcher.on(event.all.before, () => {
    const root = container.mocha().suite;
    const auditAvailable = container.plugins('retryAudit')?.auditsBeforeHookRetries === true;
    if (!auditAvailable) {
      output.plugin('hookRetry', 'retry-audit is unavailable; using built-in Before retries');
    }
    const visit = suite => {
      const effectiveRetries = Math.max(config.retries, getConfiguredBeforeRetries(suite));
      if (suite.feature && !auditAvailable) {
        suite.opts = { ...suite.opts, retryBefore: effectiveRetries };
      } else if (suite.feature) {
        const hooks = suite._beforeEach.filter(hook => hook.title.endsWith(': Before'));
        if (hooks.length > 1) {
          throw new Error(`Before hook registration is incompatible with hookRetry: ${suite.title}`);
        }
        if (hooks.length) {
          // Disable CodeceptJS inner Before retries to avoid nested retry loops.
          suite.opts = { ...suite.opts, retryBefore: 0 };
          hooks[0].fn = createBeforeHookRetryHandler(suite, hooks[0].fn, { ...config, retries: effectiveRetries });
        }
      }
      suite.suites.forEach(visit);
    };
    try {
      visit(root);
    } catch (error) {
      // CodeceptJS swallows event-listener errors. A Mocha setup hook makes an
      // incompatible registration fail the run instead of silently losing retries.
      root.beforeAll('validate Before retry registration', () => {
        throw error;
      });
    }
  });
}
