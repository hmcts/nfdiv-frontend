import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { mkdir, mkdtemp, readFile, readdir, rm, symlink, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { promisify } from 'node:util';

import typescript from 'typescript';

import Config from 'codeceptjs/lib/config';
import container from 'codeceptjs/lib/container';
import event from 'codeceptjs/lib/event';
import store from 'codeceptjs/lib/store';

import gherkinBackgroundRetry from '../../gherkin-background-retry.mjs';
import { captureHookScreenshot } from '../gherkin-background-screenshots.mjs';
import { createHtmlReport } from '../../run-parallel/html-report.mjs';
import { ensureJunitReport } from '../../run-parallel/junit-report.mjs';
import { getRetryAuditScenarios, loadRetryAudit, scenarioKey } from '../../run-parallel/report-utils.mjs';
import { createRetryAuditReport } from '../../run-parallel/retry-audit-report.mjs';
import { restoreListeners } from '../../run-parallel/tests/unit-test-support.mjs';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../../..');
const runCommand = promisify(execFile);
const moduleUrl = file => pathToFileURL(path.join(projectRoot, 'node_modules/codeceptjs/lib', file)).href;

// Real CodeceptJS children exercise recorder queues and Mocha retries. The
// helper/steps are local fixtures: no application, browser or network is needed.
const runFixture = async (context, options = {}) => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'nfdiv-hook-retry-test-'));
  context.after(() => rm(directory, { recursive: true, force: true }));
  const functionalDir = path.join(directory, 'src/test/functional');
  await mkdir(functionalDir, { recursive: true });
  if (!options.missingPlugin) {
    await symlink(
      path.join(projectRoot, 'src/test/functional/gherkin-background-retry.mjs'),
      path.join(functionalDir, 'gherkin-background-retry.mjs')
    );
  }
  await writeFile(path.join(directory, 'package.json'), '{"type":"module"}');
  await writeFile(
    path.join(directory, 'probe.feature'),
    `Feature: Hook retry probe
  Background:
    Given a controlled background
${
  options.arguments
    ? `    And a number 42
    And a table
      | name | value |
      | item | 123   |
    And a document
      """
      some text
      """
`
    : ''
}
  Scenario: body runs
    Then the body succeeds
${options.secondScenario ? '\n  Scenario: untouched scenario\n    Then the body succeeds\n' : ''}`
  );
  await writeFile(
    path.join(directory, 'helper.mjs'),
    `import Helper from ${JSON.stringify(moduleUrl('helper.js'))};
import store from ${JSON.stringify(moduleUrl('store.js'))};
import fs from 'node:fs/promises';
import path from 'node:path';
const settings = ${JSON.stringify(options)};
let calls = 0;
let beforeCalls = 0;
export default class Probe extends Helper {
  constructor(config) {
    super(config);
    this.page = {
      isClosed: () => settings.screenshots === 'closed' || (settings.closedOnRetry && beforeCalls > 1),
      screenshot: async ({ path: file }) => {
        console.log('SCREENSHOT', path.basename(file));
        if (settings.screenshots === 'fail') throw new Error('screenshot failure');
        await fs.writeFile(file, 'png');
      },
    };
    this.browser = { isConnected: () => true };
  }
  _before() { beforeCalls++; }
  probe() {
    console.log('HELPER_CALL', ++calls);
    if (calls <= (settings.helperFailures || 0)) throw new Error('controlled helper failure');
  }
  async saveScreenshot(fileName) {
    await this.page.screenshot({ path: path.join(store.outputDir, fileName) });
  }
}
`
  );
  await writeFile(
    path.join(directory, 'steps.mjs'),
    `import { Given, Then } from ${JSON.stringify(moduleUrl('mocha/bdd.js'))};
import container from ${JSON.stringify(moduleUrl('container.js'))};
import event from ${JSON.stringify(moduleUrl('event.js'))};
import assert from 'node:assert/strict';
import Config from ${JSON.stringify(moduleUrl('config.js'))};
const settings = ${JSON.stringify(options)};
const config = Config.get();
console.log('CUSTOM_ENABLED', config.plugins.hookRetry.enabled, 'BUILTIN_BEFORE', config.retry.Before || 0);
let backgrounds = 0;
let bodies = 0;
await Given('a controlled background', async () => {
  console.log('BACKGROUND_CALL', ++backgrounds);
  if (settings.exitDuringHook) process.exit(7);
  if (settings.failAfterBody && bodies) throw new Error('controlled failure after body retry');
  if (backgrounds <= (settings.plainFailures || 0)) throw new Error('controlled plain failure');
  if (settings.helperFailures) {
    const result = container.support('I').probe();
    if (!settings.fireAndForget) await result;
  }
});
await Given('a number {int}', value => assert.equal(value, 42));
await Given('a table', value => assert.deepEqual(value.parse().hashes(), [{ name: 'item', value: '123' }]));
await Given('a document', value => assert.equal(value, 'some text'));
await Then('the body succeeds', () => {
  console.log('BODY_RAN', ++bodies);
  if (settings.exitDuringBody) process.exit(7);
  if (bodies <= (settings.bodyFailures || 0)) throw new Error('controlled body failure');
});
for (const name of [event.hook.started, event.hook.passed, event.hook.failed, event.hook.finished]) {
  event.dispatcher.on(name, () => console.log('HOOK_EVENT', name));
}
for (const name of ['nfdiv.hookAttempt.started', 'nfdiv.hookAttempt.finished']) {
  event.dispatcher.on(name, details => console.log('HOOK_ATTEMPT_EVENT', name, JSON.stringify(Object.keys(details))));
}
event.dispatcher.on(event.bddStep.after, step => console.log('BDD_PASSED', step.text));
if (settings.duplicateFinish) {
  event.dispatcher.on(event.test.failed, test => event.emit(event.test.finished, test));
  const finished = new WeakSet();
  event.dispatcher.on('nfdiv.hookAttempt.finished', details => {
    if (finished.has(details)) return;
    finished.add(details);
    event.emit('nfdiv.hookAttempt.finished', details);
  });
}
`
  );
  const testConfig = {
    TestHeadlessBrowser: true,
    Gherkin: { features: path.join(directory, 'probe.feature'), steps: [path.join(directory, 'steps.mjs')] },
    helpers: { Playwright: { require: path.join(directory, 'helper.mjs') } },
    bootstrap: null,
    teardown: null,
  };
  // Exercise the real dependency configuration with local service/browser fixtures.
  const source = (await readFile(path.join(projectRoot, 'src/test/functional/codecept.conf.ts'), 'utf8'))
    .replace("import { setHeadlessWhen } from '@codeceptjs/configure';", 'const setHeadlessWhen = () => {};')
    .replace(
      "import Config from 'codeceptjs/lib/config';",
      `import Config from ${JSON.stringify(moduleUrl('config.js'))};`
    )
    .replace(
      "import { config as testConfig } from '../config.js';",
      `const testConfig = ${JSON.stringify(testConfig)};`
    );
  const compiled = typescript.transpileModule(source, {
    compilerOptions: { module: typescript.ModuleKind.ESNext, target: typescript.ScriptTarget.ES2022 },
  }).outputText;
  await writeFile(
    path.join(directory, 'config.js'),
    `${compiled}
config.plugins.allure.enabled = false;
if (${Boolean(options.disabledPlugin)}) {
  config.plugins.hookRetry.enabled = false;
}
config.plugins.hookRetry.minTimeout = 0;
config.plugins.retryFailedStep.enabled = ${Boolean(options.stepRetries)};
config.plugins.screenshot.enabled = ${Boolean(options.screenshots)};
if (!${Boolean(options.missingAudit)}) {
  config.plugins.retryAudit.require = ${JSON.stringify(path.join(projectRoot, 'src/test/functional/retry-audit.mjs'))};
}
if (${Boolean(options.disabledAudit)}) {
  config.plugins.retryAudit.enabled = false;
}
${options.auditOverride === true ? 'config.plugins.retryAudit.enabled = false;' : ''}
`
  );
  let code = 0;
  let stdout;
  try {
    ({ stdout } = await runCommand(
      process.execPath,
      [
        path.join(projectRoot, 'node_modules/codeceptjs/bin/codecept.js'),
        'run',
        '--config',
        path.join(directory, 'config.js'),
        '--steps',
        ...(typeof options.auditOverride === 'boolean'
          ? ['--override', JSON.stringify({ plugins: { retryAudit: { enabled: options.auditOverride } } })]
          : []),
      ],
      {
        cwd: directory,
        env: { ...process.env, FUNCTIONAL_HOOK_RETRY: options.disabledPlugin ? 'false' : 'true' },
        timeout: 20000,
        maxBuffer: 1024 * 1024,
      }
    ));
  } catch (error) {
    assert.equal(error.killed, false, error.stdout);
    code = error.code;
    stdout = `${error.stdout}\n${error.stderr}`;
  }
  const auditDir = path.join(directory, 'functional-output/functional/retry-audit');
  const auditFiles = await readdir(auditDir).catch(error => {
    if (error.code === 'ENOENT' && (options.missingAudit || options.disabledAudit || options.auditOverride === false)) {
      return [];
    }
    assert.fail(`${error.message}\n${stdout}`);
  });
  const records = await Promise.all(
    auditFiles.map(async file => JSON.parse(await readFile(path.join(auditDir, file), 'utf8')))
  );
  for (const record of records.filter(record => record.kind === 'hook')) {
    assert.equal(Object.hasOwn(record, 'hookId'), false);
  }
  for (const [, , keys] of stdout.matchAll(/HOOK_ATTEMPT_EVENT (\S+) (\[[^\n]+\])/g)) {
    assert.equal(JSON.parse(keys).includes('hookId'), false);
  }
  const audit = await loadRetryAudit(auditDir);
  const reportDir = path.join(directory, 'functional-output/functional/reports');
  const junit = path.join(reportDir, 'result.xml');
  await ensureJunitReport(junit, 'Hook retry probe', code, getRetryAuditScenarios(audit, 'Hook retry probe'));
  const htmlFile = path.join(reportDir, 'report.html');
  await createHtmlReport([junit], audit, htmlFile);
  const auditJunit = path.join(reportDir, 'retry-audit-result.xml');
  await createRetryAuditReport(audit, auditJunit);
  return {
    code,
    stdout,
    records,
    auditDir,
    audit: audit.get(scenarioKey('Hook retry probe', 'body runs')),
    html: await readFile(htmlFile, 'utf8'),
    junit: await readFile(junit, 'utf8'),
    auditJunit: audit.size ? await readFile(auditJunit, 'utf8') : null,
    reportDir,
  };
};

test('records a successful Background separately and preserves arguments and BDD events', async context => {
  const result = await runFixture(context, { arguments: true });
  assert.equal(result.code, 0, result.stdout);
  assert.deepEqual(
    result.audit.hookAttempts.map(attempt => attempt.status),
    ['passed']
  );
  assert.equal(result.audit.latest.attempt, 1);
  assert.equal(result.audit.latest.status, 'passed');
  assert.match(result.stdout, /BDD_PASSED a number 42/);
  assert.match(result.stdout, /BDD_PASSED a table/);
  assert.match(result.stdout, /BDD_PASSED a document/);
  assert.equal((result.stdout.match(/HOOK_EVENT hook.start/g) || []).length, 1);
  assert.equal((result.stdout.match(/HOOK_EVENT hook.finished/g) || []).length, 1);
  assert.doesNotMatch(result.html, /<table class="(?:attempts|hook-attempts)"/);
});

test('records recovered hook failures and screenshots without failing the scenario', async context => {
  const result = await runFixture(context, { plainFailures: 1, screenshots: 'enabled', duplicateFinish: true });
  assert.equal(result.code, 0, result.stdout);
  assert.deepEqual(
    result.audit.hookAttempts.map(attempt => attempt.status),
    ['failed', 'passed']
  );
  assert.equal(result.audit.latest.status, 'passed');
  assert.equal(result.audit.attempts.length, 1);
  assert.match(result.html, /<th class="attempt">Background Attempt<\/th>/);
  assert.match(result.html, /<tr><td class="attempt">1<\/td><td class="result failed">/);
  assert.match(result.html, /<tr><td class="attempt">2<\/td><td class="result passed">/);
  assert.match(result.html, /controlled plain failure/);
  const screenshot = result.audit.hookAttempts[0].screenshotFile;
  assert.match(screenshot, /\.attempt_1\.before_1\.failed\.png$/);
  assert.equal(await readFile(path.join(result.reportDir, screenshot), 'utf8'), 'png');
  assert.ok(result.html.includes(`href="${screenshot}"`));
  assert.doesNotMatch(result.junit, /<failure\b/);
  assert.doesNotMatch(result.auditJunit, /<failure\b/);
  assert.ok(
    result.audit.latest.durationMs >= result.audit.hookAttempts.reduce((sum, hook) => sum + hook.durationMs, 0)
  );
});

test('executes all four helper attempts even when the last attempt is the first success', async context => {
  const result = await runFixture(context, { helperFailures: 3 });
  assert.equal(result.code, 0, result.stdout);
  assert.deepEqual(
    result.audit.hookAttempts.map(attempt => attempt.status),
    ['failed', 'failed', 'failed', 'passed']
  );
  assert.match(result.stdout, /HELPER_CALL 4/);
  assert.match(result.stdout, /BODY_RAN 1/);
});

test('preserves individual helper step retries within Background retries', async context => {
  const result = await runFixture(context, { helperFailures: 12, stepRetries: true });
  assert.equal(result.code, 0, result.stdout);
  assert.equal(result.audit.hookAttempts.length, 4);
  assert.match(result.stdout, /HELPER_CALL 13/);
});

test('awaits queued helpers even when the step definition does not return their promises', async context => {
  const result = await runFixture(context, { helperFailures: 1, fireAndForget: true });
  assert.equal(result.code, 0, result.stdout);
  assert.deepEqual(
    result.audit.hookAttempts.map(attempt => attempt.status),
    ['failed', 'passed']
  );
});

test('exhaustion records one failed scenario and reuses the terminal screenshot', async context => {
  const result = await runFixture(context, {
    helperFailures: 99,
    screenshots: 'enabled',
    duplicateFinish: true,
    secondScenario: true,
  });
  assert.equal(result.code, 1, result.stdout);
  assert.equal(result.audit.hookAttempts.length, 4);
  assert.equal(result.audit.attempts.length, 1);
  assert.equal(result.audit.latest.status, 'failed');
  assert.equal(result.audit.hookAttempts.at(-1).screenshotFile, result.audit.latest.screenshotFile);
  assert.equal((result.stdout.match(/SCREENSHOT /g) || []).length, 4);
  assert.equal(new Set(result.audit.hookAttempts.map(hook => hook.screenshotFile)).size, 4);
  for (const hook of result.audit.hookAttempts.slice(0, -1)) {
    assert.ok(hook.screenshotFile.endsWith(`.attempt_${hook.scenarioAttempt}.before_${hook.hookAttempt}.failed.png`));
  }
  assert.equal(result.records.filter(record => record.scenario === 'untouched scenario').length, 0);
  assert.doesNotMatch(result.stdout, /BODY_RAN/);
  assert.match(result.junit, /<failure\b/);
  assert.match(result.auditJunit, /<failure\b/);
});

test('associates hook retries with the right scenario attempt after a body retry', async context => {
  const result = await runFixture(context, { plainFailures: 1, bodyFailures: 1 });
  assert.equal(result.code, 0, result.stdout);
  assert.deepEqual(
    result.audit.attempts.map(attempt => attempt.status),
    ['failed', 'passed']
  );
  assert.deepEqual(
    result.audit.hookAttempts.map(attempt => [attempt.scenarioAttempt, attempt.hookAttempt]),
    [
      [1, 1],
      [1, 2],
      [2, 1],
    ]
  );
  assert.equal(result.audit.latest.attempt, 2);
});

for (const screenshots of [undefined, 'closed', 'fail']) {
  test(`screenshot availability (${screenshots || 'disabled'}) does not prevent hook recovery`, async context => {
    const result = await runFixture(context, { plainFailures: 1, screenshots });
    assert.equal(result.code, 0, result.stdout);
    assert.deepEqual(
      result.audit.hookAttempts.map(attempt => attempt.status),
      ['failed', 'passed']
    );
    assert.equal(result.audit.hookAttempts[0].screenshotFile, null);
  });
}

for (const fallback of ['missingPlugin', 'disabledPlugin']) {
  test(`${fallback} uses built-in Before retries and legacy audit/report behaviour`, async context => {
    const result = await runFixture(context, { [fallback]: true, plainFailures: 1 });
    assert.equal(result.code, 0, result.stdout);
    assert.match(result.stdout, /CUSTOM_ENABLED false BUILTIN_BEFORE 3/);
    assert.equal(result.audit.hookAttempts, undefined);
    assert.equal(result.audit.attempts.length, 1);
    assert.equal(result.audit.latest.status, 'passed');
    assert.doesNotMatch(result.html, /class="hook-attempts"/);
  });
}

for (const fallback of ['missingAudit', 'disabledAudit']) {
  test(`${fallback} disables custom Background retries and preserves built-in retries`, async context => {
    const result = await runFixture(context, { [fallback]: true, plainFailures: 1 });
    assert.equal(result.code, 0, result.stdout);
    assert.match(result.stdout, /CUSTOM_ENABLED false BUILTIN_BEFORE 3/);
    assert.match(result.stdout, /BACKGROUND_CALL 2/);
    assert.match(result.stdout, /BODY_RAN 1/);
    assert.doesNotMatch(result.stdout, /HOOK_ATTEMPT_EVENT/);
    assert.deepEqual(result.records, []);
    assert.doesNotMatch(result.html, /<table class="(?:attempts|hook-attempts)"/);
  });
}

for (const enabled of [true, false]) {
  test(`honors a command-line override setting retry-audit enabled=${enabled}`, async context => {
    const result = await runFixture(context, { auditOverride: enabled, plainFailures: 1 });
    assert.equal(result.code, 0, result.stdout);
    assert.match(
      result.stdout,
      enabled ? /CUSTOM_ENABLED true BUILTIN_BEFORE 0/ : /CUSTOM_ENABLED false BUILTIN_BEFORE 3/
    );
    assert.match(result.stdout, /BACKGROUND_CALL 2/);
    if (enabled) {
      assert.deepEqual(
        result.audit.hookAttempts.map(attempt => attempt.status),
        ['failed', 'passed']
      );
    } else {
      assert.deepEqual(result.records, []);
      assert.doesNotMatch(result.stdout, /HOOK_ATTEMPT_EVENT/);
    }
  });
}

for (const loadedAudit of [undefined, {}, { auditsBackgroundRetries: true }]) {
  test(`requires an initialized retry-audit plugin before replacing Background hooks (${JSON.stringify(loadedAudit)})`, context => {
    restoreListeners(context, event.dispatcher);
    const original = () => {};
    const feature = {
      title: 'Feature',
      feature: { children: [{ background: { steps: [] } }] },
      _beforeEach: [{ title: 'Feature: Before', fn: original }],
      opts: { retryBefore: 0 },
      suites: [],
    };
    const root = { suites: [feature], beforeAll: context.mock.fn() };
    context.mock.method(container, 'mocha', () => ({ suite: root }));
    context.mock.method(container, 'plugins', () => loadedAudit);
    gherkinBackgroundRetry({ retries: 3, minTimeout: 0 });
    event.dispatcher.emit(event.all.before);
    if (loadedAudit?.auditsBackgroundRetries) {
      assert.notEqual(feature._beforeEach[0].fn, original);
      assert.equal(feature.opts.retryBefore, 0);
    } else {
      assert.equal(feature._beforeEach[0].fn, original);
      assert.equal(feature.opts.retryBefore, 3);
    }
    assert.equal(root.beforeAll.mock.callCount(), 0);
  });
}

test('disabled custom retries still report a genuine exhausted hook failure', async context => {
  const result = await runFixture(context, { disabledPlugin: true, plainFailures: 99 });
  assert.equal(result.code, 1, result.stdout);
  assert.equal(result.audit.hookAttempts, undefined);
  assert.equal(result.audit.latest.hookName, 'Before');
  assert.equal(result.audit.latest.status, 'failed');
  assert.match(result.junit, /<failure\b/);
});

test('flushes the unfinished hook and scenario on abnormal process exit', async context => {
  const result = await runFixture(context, { exitDuringHook: true });
  assert.equal(result.code, 7, result.stdout);
  assert.equal(result.audit.latest.status, 'failed');
  assert.equal(result.audit.hookAttempts.length, 1);
  assert.equal(result.audit.hookAttempts[0].status, 'failed');
  assert.match(result.audit.hookAttempts[0].error.message, /exited with code 7/);
});

test('a process exit in the scenario body is not labelled as a Before failure', async context => {
  const result = await runFixture(context, { exitDuringBody: true });
  assert.equal(result.code, 7, result.stdout);
  assert.equal(result.audit.latest.status, 'failed');
  assert.equal(result.audit.latest.hookName, null);
  assert.deepEqual(
    result.audit.hookAttempts.map(attempt => attempt.status),
    ['passed']
  );
});

test('malformed optional hook records cannot override a legacy scenario result', async context => {
  const result = await runFixture(context, { missingPlugin: true });
  await writeFile(
    path.join(result.auditDir, 'malformed-hook.json'),
    JSON.stringify({
      kind: 'hook',
      feature: 'Hook retry probe',
      scenario: 'body runs',
      status: 'failed',
      durationMs: 0,
    })
  );
  const loaded = await loadRetryAudit(result.auditDir);
  const audit = loaded.get(scenarioKey('Hook retry probe', 'body runs'));
  assert.equal(audit.latest.status, 'passed');
  assert.equal(audit.hookAttempts, undefined);
});

test('an unavailable browser on a later retry does not move the earlier screenshot', async context => {
  const result = await runFixture(context, {
    bodyFailures: 1,
    failAfterBody: true,
    closedOnRetry: true,
    screenshots: 'enabled',
  });
  assert.equal(result.code, 1, result.stdout);
  assert.deepEqual(
    result.audit.attempts.map(attempt => attempt.status),
    ['failed', 'failed']
  );
  assert.ok(
    result.audit.hookAttempts
      .filter(attempt => attempt.scenarioAttempt === 2)
      .every(attempt => attempt.screenshotFile === null)
  );
  assert.equal(await readFile(path.join(result.reportDir, result.audit.attempts[0].screenshotFile), 'utf8'), 'png');
});

for (const legacy of [false, true]) {
  test(`${legacy ? 'older' : 'current'} hook records add history without changing final results`, async context => {
    const result = await runFixture(context, { missingPlugin: true });
    const screenshot = `body_runs.attempt_1.before_${legacy ? '1_' : ''}1.failed.png`;
    await writeFile(path.join(result.reportDir, screenshot), 'png');
    for (const [hookAttempt, status] of [
      [2, 'passed'],
      [1, 'failed'],
    ]) {
      await writeFile(
        path.join(result.auditDir, `hook-${hookAttempt}.json`),
        JSON.stringify({
          kind: 'hook',
          feature: 'Hook retry probe',
          scenario: 'body runs',
          scenarioAttempt: 1,
          ...(legacy ? { hookId: 1 } : {}),
          hookAttempt,
          hookName: 'Before',
          status,
          durationMs: 5,
          screenshotFile: status === 'failed' ? screenshot : null,
          error: status === 'failed' ? { message: 'recovered hook failure' } : null,
        })
      );
    }
    const loaded = await loadRetryAudit(result.auditDir);
    assert.equal(getRetryAuditScenarios(loaded, 'Hook retry probe')[0].status, 'passed');
    assert.deepEqual(
      loaded.get(scenarioKey('Hook retry probe', 'body runs')).hookAttempts.map(hook => hook.hookAttempt),
      [1, 2]
    );
    const file = path.join(result.reportDir, 'mixed.html');
    await createHtmlReport([path.join(result.reportDir, 'result.xml')], loaded, file);
    const html = await readFile(file, 'utf8');
    assert.match(html, /<th class="attempt">Background Attempt<\/th>/);
    assert.match(html, /<tr><td class="attempt">1<\/td><td class="result failed">/);
    assert.match(html, /<tr><td class="attempt">2<\/td><td class="result passed">/);
    assert.match(html, /recovered hook failure/);
    assert.match(html, /1 passed/);
    assert.ok(html.includes(`href="${screenshot}"`));
    await createRetryAuditReport(loaded, path.join(result.reportDir, 'mixed.xml'));
    assert.doesNotMatch(await readFile(path.join(result.reportDir, 'mixed.xml'), 'utf8'), /<failure\b/);
  });
}

test('a timed-out screenshot does not hang the Background retry', async context => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'nfdiv-hook-screenshot-'));
  const previousOutput = store.outputDir;
  const previousConfig = Config.get();
  context.after(async () => {
    store.outputDir = previousOutput;
    Config.create(previousConfig);
    await rm(directory, { recursive: true, force: true });
  });
  store.outputDir = directory;
  Config.create({ plugins: { screenshot: { enabled: true } } });
  const screenshot = await captureHookScreenshot({ title: 'scenario' }, 1, 1, {
    helper: { page: { screenshot: () => new Promise(() => {}) } },
    timeoutMs: 10,
  });
  assert.equal(screenshot, null);
  const unavailable = await captureHookScreenshot({ title: 'scenario' }, 1, 1, {
    helper: {
      page: {
        screenshot: async () => {
          throw null;
        },
      },
    },
    timeoutMs: 10,
  });
  assert.equal(unavailable, null);
});
