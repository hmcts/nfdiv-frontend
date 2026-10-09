import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

import Config from 'codeceptjs/lib/config';
import output from 'codeceptjs/lib/output';
import store from 'codeceptjs/lib/store';

import { temporaryDirectory } from '../../run-parallel/tests/unit-test-support.mjs';

import { captureHookScreenshot, getTerminalHookScreenshot } from '../before-hook-screenshots.mjs';

const setup = async (context, config = {}) => {
  const directory = await temporaryDirectory(context, 'nfdiv-background-screenshot-unit-');
  const previousOutput = store.outputDir;
  store.outputDir = directory;
  context.after(() => {
    store.outputDir = previousOutput;
  });
  context.mock.method(Config, 'get', () => ({ screenshot: config }));
  const warnings = context.mock.method(output, 'plugin', () => {});
  return { directory, warnings };
};

test('captures directly from the page with retry-specific names and full-page options', async context => {
  const { directory } = await setup(context, { fullPageScreenshots: true });
  const screenshot = context.mock.fn(async options => writeFile(options.path, 'page screenshot'));
  const saveScreenshot = context.mock.fn();
  const helper = { page: { screenshot, isClosed: () => false }, browser: { isConnected: () => true }, saveScreenshot };

  const name = await captureHookScreenshot({ title: 'A background' }, 2, 3, { helper, timeoutMs: 100 });

  assert.equal(name, 'A_background.attempt_2.before_3.failed.png');
  assert.deepEqual(screenshot.mock.calls[0].arguments, [
    { path: path.join(directory, name), fullPage: true, timeout: 100 },
  ]);
  assert.equal(await readFile(path.join(directory, name), 'utf8'), 'page screenshot');
  assert.equal(saveScreenshot.mock.callCount(), 0);
});

test('falls back to the helper when there is no page screenshot method', async context => {
  const { directory } = await setup(context, { fullPageScreenshots: true });
  const saveScreenshot = context.mock.fn(async name => writeFile(path.join(directory, name), 'helper screenshot'));
  const name = await captureHookScreenshot({ title: 'A background' }, 1, 2, { helper: { saveScreenshot } });
  assert.deepEqual(saveScreenshot.mock.calls[0].arguments, [name, true]);
  assert.equal(await readFile(path.join(directory, name), 'utf8'), 'helper screenshot');
});

for (const config of [{ enabled: false }, { on: 'step' }, { disableScreenshots: true }]) {
  test(`does not capture when screenshots are unavailable (${JSON.stringify(config)})`, async context => {
    await setup(context, config);
    const screenshot = context.mock.fn();
    assert.equal(
      await captureHookScreenshot({ title: 'A background' }, 1, 1, { helper: { page: { screenshot } } }),
      null
    );
    assert.equal(screenshot.mock.callCount(), 0);
  });
}

test('skips capture without a helper or output directory', async context => {
  await setup(context);
  assert.equal(await captureHookScreenshot({ title: 'A background' }, 1, 1, { helper: null }), null);
  store.outputDir = undefined;
  const screenshot = context.mock.fn();
  assert.equal(
    await captureHookScreenshot({ title: 'A background' }, 1, 1, { helper: { page: { screenshot } } }),
    null
  );
  assert.equal(screenshot.mock.callCount(), 0);
});

for (const closed of [true, false]) {
  test(`skips a ${closed ? 'closed page' : 'disconnected browser'}`, async context => {
    await setup(context);
    const screenshot = context.mock.fn();
    const helper = { page: { screenshot, isClosed: () => closed }, browser: { isConnected: () => closed } };
    assert.equal(await captureHookScreenshot({ title: 'A background' }, 1, 1, { helper }), null);
    assert.equal(screenshot.mock.callCount(), 0);
  });
}

test('does not report a screenshot that the helper did not write', async context => {
  await setup(context);
  const helper = { page: { screenshot: async () => {} } };
  assert.equal(await captureHookScreenshot({ title: 'A background' }, 1, 1, { helper }), null);
});

test('logs capture failures and lets the Before hook retry continue', async context => {
  const { warnings } = await setup(context);
  const helper = {
    page: {
      screenshot: async () => {
        throw new Error('page unavailable');
      },
    },
  };
  assert.equal(await captureHookScreenshot({ title: 'A background' }, 1, 1, { helper }), null);
  assert.deepEqual(warnings.mock.calls[0].arguments, [
    'hookRetry',
    'Could not capture Before hook screenshot: page unavailable',
  ]);
});

test('bounds a stalled screenshot with a timeout', async context => {
  const { warnings } = await setup(context);
  context.mock.timers.enable({ apis: ['setTimeout'] });
  const pending = captureHookScreenshot({ title: 'A background' }, 1, 1, {
    helper: { page: { screenshot: () => new Promise(() => {}) } },
    timeoutMs: 100,
  });
  context.mock.timers.tick(100);
  assert.equal(await pending, null);
  assert.match(warnings.mock.calls[0].arguments[1], /Hook screenshot timed out/);
});

test('reuses only an existing terminal screenshot when screenshots are enabled', async context => {
  const { directory } = await setup(context);
  const file = path.join(directory, 'terminal.png');
  await writeFile(file, 'png');
  assert.equal(getTerminalHookScreenshot({ artifacts: { screenshot: file } }), 'terminal.png');
  assert.equal(getTerminalHookScreenshot({ artifacts: { screenshot: path.join(directory, 'missing.png') } }), null);
  assert.equal(getTerminalHookScreenshot({}), null);
  for (const config of [{ disableScreenshots: true }, { enabled: false }, { on: 'step' }]) {
    context.mock.method(Config, 'get', () => ({ screenshot: config }));
    assert.equal(getTerminalHookScreenshot({ artifacts: { screenshot: file } }), null);
  }
});
