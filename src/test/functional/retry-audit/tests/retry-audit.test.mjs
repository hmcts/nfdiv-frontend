import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { threadId } from 'node:worker_threads';

import Config from 'codeceptjs/lib/config';
import event from 'codeceptjs/lib/event';

import { createAttemptDetails, getDurationMs } from '../../retry-audit.mjs';
import { restoreListeners, temporaryDirectory } from '../../run-parallel/tests/unit-test-support.mjs';

let moduleNumber = 0;
const setup = async context => {
  const directory = await temporaryDirectory(context, 'nfdiv-retry-audit-unit-');
  const previousCwd = process.cwd();
  process.chdir(directory);
  context.after(() => process.chdir(previousCwd));
  restoreListeners(context, event.dispatcher);
  restoreListeners(context, process);
  context.mock.method(Config, 'get', () => ({ screenshot: { enabled: false } }));
  const url = new URL('../../retry-audit.mjs', import.meta.url);
  url.searchParams.set('unit', String(++moduleNumber));
  const audit = await import(url.href);
  assert.deepEqual(audit.default(), { auditsBeforeHookRetries: true });
  const records = async () => {
    await Promise.resolve();
    const root = path.join(directory, 'functional-output/functional/retry-audit');
    let files;
    try {
      files = await readdir(root);
    } catch (error) {
      if (error.code === 'ENOENT') {
        return [];
      }
      throw error;
    }
    return Promise.all(files.map(async file => JSON.parse(await readFile(path.join(root, file), 'utf8'))));
  };
  return { audit, records };
};

const scenario = (uid = 'scenario-id') => ({
  uid,
  title: 'A scenario',
  parent: { title: 'A feature', file: 'feature.feature', ctx: {} },
});
const hookDetails = (testCase, overrides = {}) => ({
  test: testCase,
  scenarioAttempt: 1,
  hookAttempt: 1,
  hookName: 'Before',
  ...overrides,
});

test('uses valid scenario durations and otherwise rounds and clamps elapsed time', () => {
  assert.equal(getDurationMs({ duration: 25 }, 10, 100), 25);
  for (const duration of [undefined, 0, -1, NaN, Infinity]) {
    assert.equal(getDurationMs({ duration }, 10, 12.6), 3);
  }
  assert.equal(getDurationMs(null, 20, 10), 0);
  assert.equal(getDurationMs(null, undefined, 100), 0);
});

test('serializes scenario identity, errors, hook names, and screenshot policy', () => {
  const testCase = scenario();
  const error = new TypeError('failure');
  testCase.err = error;
  const attempt = createAttemptDetails(testCase, 2, 'failed', null, 'Before', 25);
  assert.equal(attempt.attemptKey, `${threadId}:scenario-id`);
  assert.equal(attempt.feature, 'A feature');
  assert.equal(attempt.featureFile, 'feature.feature');
  assert.equal(attempt.scenario, 'A scenario');
  assert.deepEqual(attempt.error, { name: 'TypeError', message: 'failure', stack: error.stack });
  assert.equal(attempt.hookName, 'Before');
  assert.equal(attempt.durationMs, 25);
  assert.equal(attempt.screenshotFile, 'A_scenario.attempt_2.failed.png');
  assert.ok(Number.isFinite(Date.parse(attempt.recordedAt)));
  assert.equal(createAttemptDetails(testCase, 2, 'failed', error, null, 25, false).screenshotFile, null);
});

test('tracks independent legacy scenario retries without the Before hook plugin', async context => {
  const { records } = await setup(context);
  const first = scenario('first');
  const second = scenario('second');
  event.dispatcher.emit(event.test.before, first);
  first.err = new Error('body failed');
  event.dispatcher.emit(event.test.finished, first);
  await Promise.resolve();
  delete first.err;
  first.state = 'passed';
  event.dispatcher.emit(event.test.before, first);
  event.dispatcher.emit(event.test.started, first);
  event.dispatcher.emit(event.test.finished, first);
  second.state = 'skipped';
  event.dispatcher.emit(event.test.before, second);
  event.dispatcher.emit(event.test.finished, second);
  const results = await records();
  assert.deepEqual(
    results
      .filter(r => r.uid === 'first')
      .sort((a, b) => a.attempt - b.attempt)
      .map(r => [r.attempt, r.status]),
    [
      [1, 'failed'],
      [2, 'passed'],
    ]
  );
  assert.deepEqual(
    results.filter(r => r.uid === 'second').map(r => [r.attempt, r.status]),
    [[1, 'skipped']]
  );
  assert.ok(results.every(r => r.hookName === null && r.screenshotFile === null));
});

test('only records the active scenario for a suite-wide hook failure notification', async context => {
  const { records } = await setup(context);
  const current = scenario('current');
  const untouched = scenario('untouched');
  current.parent.ctx.currentTest = current;
  untouched.parent = current.parent;
  const error = new Error('Before failed');
  event.dispatcher.emit(event.test.before, current);
  event.dispatcher.emit(event.test.failed, untouched, error, 'Before');
  event.dispatcher.emit(event.test.failed, current, error, 'Before');
  const results = await records();
  assert.equal(results.length, 1);
  assert.equal(results[0].uid, 'current');
  assert.equal(results[0].hookName, 'Before');
  assert.equal(results[0].error.message, error.message);
});

test('uses managed attempt numbers and deduplicates hook and scenario completion events', async context => {
  const { records } = await setup(context);
  const current = scenario();
  current.parent.ctx.currentTest = current;
  const error = new Error('hook failed');
  const hook = hookDetails(current, {
    scenarioAttempt: 3,
    status: 'failed',
    durationMs: 17,
    screenshotFile: 'hook.png',
    error,
  });
  event.dispatcher.emit(event.test.before, current);
  event.dispatcher.emit('nfdiv.hookAttempt.started', hook);
  event.dispatcher.emit('nfdiv.hookAttempt.finished', hook);
  event.dispatcher.emit('nfdiv.hookAttempt.finished', hook);
  event.dispatcher.emit(event.test.failed, current, error, 'Before');
  current.err = error;
  event.dispatcher.emit(event.test.finished, current);
  const results = await records();
  assert.equal(results.length, 2);
  const background = results.find(r => r.kind === 'hook');
  assert.equal(background.scenarioAttempt, 3);
  assert.equal(background.hookAttempt, 1);
  assert.equal(background.durationMs, 17);
  assert.equal(background.screenshotFile, 'hook.png');
  assert.equal(Object.hasOwn(background, 'hookId'), false);
  assert.equal(results.find(r => r.kind !== 'hook').attempt, 3);
});

test('preserves setup runtime when test.started follows a managed Before hook', async context => {
  const { records } = await setup(context);
  let now = 100;
  context.mock.method(performance, 'now', () => now);
  const current = scenario();
  current.duration = 5;
  event.dispatcher.emit(event.test.before, current);
  const hook = hookDetails(current);
  event.dispatcher.emit('nfdiv.hookAttempt.started', hook);
  now = 150;
  event.dispatcher.emit('nfdiv.hookAttempt.finished', { ...hook, status: 'passed', durationMs: 50 });
  event.dispatcher.emit(event.test.started, current);
  now = 200;
  event.dispatcher.emit(event.test.finished, current);
  const result = (await records()).find(r => r.kind !== 'hook');
  assert.equal(result.durationMs, 100);
  assert.equal(result.status, 'passed');
});

test('ignores malformed hook events and scenarios without a uid', async context => {
  const { records } = await setup(context);
  for (const overrides of [
    { scenarioAttempt: 0 },
    { hookAttempt: 1.5 },
    { scenarioAttempt: undefined },
    { test: {} },
  ]) {
    const hook = hookDetails(scenario(), overrides);
    event.dispatcher.emit('nfdiv.hookAttempt.started', hook);
    event.dispatcher.emit('nfdiv.hookAttempt.finished', { ...hook, status: 'failed' });
  }
  event.dispatcher.emit(event.test.before, {});
  event.dispatcher.emit(event.test.finished, {});
  assert.deepEqual(await records(), []);
});

test('flushes unfinished hooks and scenarios once after an abnormal exit', async context => {
  const { audit, records } = await setup(context);
  const current = scenario();
  event.dispatcher.emit(event.test.before, current);
  event.dispatcher.emit('nfdiv.hookAttempt.started', hookDetails(current));
  audit.flushActiveAttempts(0);
  assert.deepEqual(await records(), []);
  audit.flushActiveAttempts(7);
  audit.flushActiveAttempts(7);
  const results = await records();
  assert.equal(results.length, 2);
  assert.ok(results.every(r => r.status === 'failed' && r.error.message === 'Feature process exited with code 7'));
  assert.equal(results.find(r => r.kind !== 'hook').hookName, 'Before');
});

test('an abnormal body exit uses the monitored error and does not label it as a hook failure', async context => {
  const { records } = await setup(context);
  const current = scenario();
  event.dispatcher.emit(event.test.before, current);
  const hook = hookDetails(current);
  event.dispatcher.emit('nfdiv.hookAttempt.started', hook);
  event.dispatcher.emit('nfdiv.hookAttempt.finished', { ...hook, status: 'passed', durationMs: 1 });
  event.dispatcher.emit(event.test.started, current);
  const failure = new Error('uncaught body error');
  process.listeners('uncaughtExceptionMonitor').at(-1)(failure);
  process.listeners('exit').at(-1)(7);
  const result = (await records()).find(r => r.kind !== 'hook');
  assert.equal(result.error.message, failure.message);
  assert.equal(result.hookName, null);
});
