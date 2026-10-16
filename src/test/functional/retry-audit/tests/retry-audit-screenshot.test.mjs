import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

import event from 'codeceptjs/lib/event';
import output from 'codeceptjs/lib/output';
import recorder from 'codeceptjs/lib/recorder';

import { restoreListeners, temporaryDirectory } from '../../run-parallel/tests/unit-test-support.mjs';

import retryAuditScreenshot, {
  isScreenshotRenameEnabled,
  renameScreenshotArtifact,
} from '../retry-audit-screenshot.mjs';

const setup = context => {
  restoreListeners(context, event.dispatcher);
  const queued = context.mock.method(recorder, 'add', () => {});
  const warnings = context.mock.method(output, 'plugin', () => {});
  return { queued, warnings };
};

test('requires fail mode when the screenshot configuration explicitly supplies an on property', () => {
  assert.equal(isScreenshotRenameEnabled(), true);
  assert.equal(isScreenshotRenameEnabled({ on: undefined }), false);
  assert.equal(isScreenshotRenameEnabled({ on: null }), false);
  assert.equal(isScreenshotRenameEnabled({ enabled: false }), false);
  assert.equal(isScreenshotRenameEnabled({ enabled: true, on: 'fail' }), true);
});

test('renames the screenshot and only replaces matching attachment entries', async context => {
  setup(context);
  const directory = await temporaryDirectory(context, 'nfdiv-screenshot-unit-');
  const original = path.join(directory, 'original.png');
  await writeFile(original, 'image');
  const attachment = { name: 'other attachment' };
  const scenario = {
    title: 'A scenario',
    artifacts: { screenshot: original, trace: 'trace.zip' },
    attachments: ['other.png', original, attachment, original],
  };
  await renameScreenshotArtifact(scenario, 3);
  const target = path.join(directory, 'A_scenario.attempt_3.failed.png');
  assert.equal(await readFile(target, 'utf8'), 'image');
  await assert.rejects(readFile(original), { code: 'ENOENT' });
  assert.deepEqual(scenario.artifacts, { screenshot: target, trace: 'trace.zip' });
  assert.deepEqual(scenario.attachments, ['other.png', target, attachment, target]);
});

test('ignores absent and already-renamed artifacts without reporting an error', async context => {
  const { warnings } = setup(context);
  await renameScreenshotArtifact({ title: 'A scenario' }, 1);
  const directory = await temporaryDirectory(context, 'nfdiv-screenshot-unit-');
  const screenshot = path.join(directory, 'A_scenario.attempt_1.failed.png');
  const scenario = { title: 'A scenario', artifacts: { screenshot } };
  await renameScreenshotArtifact(scenario, 1);
  assert.equal(scenario.artifacts.screenshot, screenshot);
  assert.equal(warnings.mock.callCount(), 0);
});

test('logs a rename failure while preserving artifact metadata', async context => {
  const { warnings } = setup(context);
  const directory = await temporaryDirectory(context, 'nfdiv-screenshot-unit-');
  const original = path.join(directory, 'missing.png');
  const scenario = { title: 'A scenario', artifacts: { screenshot: original }, attachments: [original] };
  await renameScreenshotArtifact(scenario, 2);
  assert.equal(scenario.artifacts.screenshot, original);
  assert.deepEqual(scenario.attachments, [original]);
  assert.equal(warnings.mock.calls[0].arguments[0], 'screenshot');
  assert.match(warnings.mock.calls[0].arguments[1], /Failed to rename screenshot:.*ENOENT/);
});

test('defers renaming until the failure screenshot artifact has been attached', async context => {
  const { queued } = setup(context);
  const directory = await temporaryDirectory(context, 'nfdiv-screenshot-unit-');
  const scenario = { title: 'A scenario', currentRetry: () => 2 };
  retryAuditScreenshot();
  event.dispatcher.emit(event.test.failed, scenario, new Error('failed'));
  assert.equal(queued.mock.callCount(), 0);
  const original = path.join(directory, 'original.png');
  await writeFile(original, 'image');
  scenario.artifacts = { screenshot: original };
  assert.equal(queued.mock.callCount(), 1);
  const [label, rename, force] = queued.mock.calls[0].arguments;
  assert.equal(label, 'rename screenshot');
  assert.equal(force, true);
  await rename();
  assert.equal(scenario.artifacts.screenshot, path.join(directory, 'A_scenario.attempt_3.failed.png'));
});

test('uses the current test when a failure event omits its test argument', async context => {
  const { queued } = setup(context);
  const directory = await temporaryDirectory(context, 'nfdiv-screenshot-unit-');
  const original = path.join(directory, 'original.png');
  await writeFile(original, 'image');
  const scenario = { title: 'A scenario', artifacts: { screenshot: original } };
  retryAuditScreenshot();
  event.dispatcher.emit(event.test.before, scenario);
  event.dispatcher.emit(event.test.failed, undefined, new Error('failed'), 'Before');
  await Promise.resolve();
  assert.equal(queued.mock.callCount(), 1);
  await queued.mock.calls[0].arguments[1]();
  assert.equal(scenario.artifacts.screenshot, path.join(directory, 'A_scenario.attempt_1.failed.png'));
});

test('ignores suite hook failures and events without any current test', async context => {
  const { queued } = setup(context);
  retryAuditScreenshot();
  event.dispatcher.emit(event.test.failed, undefined, new Error('no current test'));
  for (const hook of ['BeforeSuite', 'AfterSuite']) {
    event.dispatcher.emit(event.test.failed, { title: 'A scenario' }, new Error('suite failed'), hook);
  }
  await Promise.resolve();
  assert.equal(queued.mock.callCount(), 0);
});

test('does not subscribe to events when screenshot renaming is disabled', context => {
  setup(context);
  const before = event.dispatcher.listenerCount(event.test.before);
  const failed = event.dispatcher.listenerCount(event.test.failed);
  retryAuditScreenshot({ enabled: false });
  retryAuditScreenshot({ on: 'step' });
  assert.equal(event.dispatcher.listenerCount(event.test.before), before);
  assert.equal(event.dispatcher.listenerCount(event.test.failed), failed);
});
