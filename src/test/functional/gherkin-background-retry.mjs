import { setTimeout as delay } from 'node:timers/promises';

import container from 'codeceptjs/lib/container';
import event from 'codeceptjs/lib/event';
import { fireHook } from 'codeceptjs/lib/mocha/hooks';
import output from 'codeceptjs/lib/output';
import recorder from 'codeceptjs/lib/recorder';

import {
  captureHookScreenshot,
  getTerminalHookScreenshot,
} from './gherkin-background-retry/gherkin-background-screenshots.mjs';
import { runBackgroundSteps } from './gherkin-background-retry/gherkin-background-steps.mjs';

const attemptStarted = 'nfdiv.hookAttempt.started';
const attemptFinished = 'nfdiv.hookAttempt.finished';

const resetFailedRecorder = async () => {
  // Drain the failed chain before starting another queue. Otherwise a pending
  // catch from the previous queue can stop the newly started recorder.
  await recorder.catch(() => {});
  recorder.stop();
  recorder.start();
};

export const createBackgroundHandler = (suite, background, { retries, minTimeout, factor }) =>
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
        try {
          await runBackgroundSteps(background.steps);
        } catch (cause) {
          error = cause instanceof Error ? cause : new Error(String(cause));
        }
        const durationMs = Math.max(0, Math.round(performance.now() - startedAt));
        if (!error) {
          recorder.startUnlessRunning();
          event.emit(attemptFinished, { ...details, status: 'passed', durationMs, screenshotFile: null });
          fireHook(event.hook.passed, suite);
          fireHook(event.hook.finished, suite);
          await recorder.promise();
          return;
        }

        await resetFailedRecorder();
        if (hookAttempt <= retries) {
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

export default function gherkinBackgroundRetry(options = {}) {
  const config = { retries: 3, minTimeout: 1000, factor: 2, ...options };
  if (
    !Number.isInteger(config.retries) ||
    config.retries < 0 ||
    !Number.isFinite(config.minTimeout) ||
    config.minTimeout < 0 ||
    !Number.isFinite(config.factor) ||
    config.factor < 1
  ) {
    throw new Error('Invalid Background retry configuration');
  }
  event.dispatcher.on(event.all.before, () => {
    const root = container.mocha().suite;
    const auditAvailable = container.plugins('retryAudit')?.auditsBackgroundRetries === true;
    if (!auditAvailable) {
      output.plugin('hookRetry', 'retry-audit is unavailable; using built-in Before retries');
    }
    const visit = suite => {
      if (suite.feature && !auditAvailable) {
        suite.opts = { ...suite.opts, retryBefore: config.retries };
      } else if (suite.feature) {
        const backgrounds = suite.feature.children.filter(child => child.background).map(child => child.background);
        const hooks = suite._beforeEach.filter(hook => hook.title.endsWith(': Before'));
        if (backgrounds.length > 1 || backgrounds.length !== hooks.length) {
          throw new Error(`Background hook registration is incompatible with hookRetry: ${suite.title}`);
        }
        if (hooks.length) {
          hooks[0].fn = createBackgroundHandler(suite, backgrounds[0], config);
        }
      }
      suite.suites.forEach(visit);
    };
    try {
      visit(root);
    } catch (error) {
      // CodeceptJS swallows event-listener errors. A Mocha setup hook makes an
      // incompatible registration fail the run instead of silently losing retries.
      root.beforeAll('validate Background retry registration', () => {
        throw error;
      });
    }
  });
}
