import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const exec = promisify(execFile);
const fixture = fileURLToPath(new URL('./run-parallel-unit-fixture.mjs', import.meta.url));
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../../..');
const reportsRoot = path.join(projectRoot, 'functional-output/functional/reports');
const run = async options => {
  const { stdout } = await exec(
    process.execPath,
    ['--experimental-vm-modules', '--no-warnings', fixture, JSON.stringify(options)],
    { timeout: 5000 }
  );
  return JSON.parse(stdout);
};
const features = count =>
  Array.from({ length: count }, (_, index) => ({ file: `feature-${index}.feature`, title: `Feature ${index}` }));

test('discovers features in sorted order and forwards grep, config, output overrides, and environment', async () => {
  const result = await run({
    workers: 1,
    grep: '@nightly',
    env: { TEST_HEADLESS: 'true' },
    ignoredFiles: ['README.md'],
    features: [
      { file: 'z.feature', source: 'No feature title' },
      { file: 'a.feature', source: '  Feature: A title  \n' },
    ],
  });
  assert.equal(result.exitCode, 0);
  assert.deepEqual(
    result.spawns.map(child => path.basename(child.args[1])),
    ['a.feature', 'z.feature']
  );
  for (const child of result.spawns) {
    assert.equal(child.command, path.join(projectRoot, 'node_modules/.bin/codeceptjs'));
    assert.equal(child.settings.cwd, projectRoot);
    assert.deepEqual(child.settings.stdio, ['ignore', 'pipe', 'pipe']);
    assert.equal(child.settings.env.DONT_FAIL_ON_EMPTY_RUN, 'true');
    assert.equal(child.settings.env.TEST_HEADLESS, 'true');
    assert.deepEqual(child.args.slice(2, 5), ['--config', './src/test/functional/codecept.conf.ts', '--override']);
    assert.deepEqual(child.args.slice(6), ['--grep', '@nightly']);
    const override = JSON.parse(child.args[5]);
    const directory = path.join(reportsRoot, path.basename(child.args[1], '.feature'));
    assert.equal(override.output, directory);
    assert.deepEqual(override.plugins.junitReporter, { output: directory, outputName: 'result.xml' });
  }
  assert.deepEqual(
    result.ensured.map(entry => entry.feature),
    ['A title', 'z']
  );
});

for (const [workers, expected] of [
  [2, 2],
  [0, 1],
  [10, 4],
]) {
  test(`limits concurrent feature children to ${expected} with FUNCTIONAL_WORKERS=${workers}`, async () => {
    const result = await run({ workers, features: features(4) });
    assert.equal(result.maxActive, expected);
    assert.equal(new Set(result.spawns.map(child => child.args[1])).size, 4);
    assert.equal(result.aggregate.closed, 4);
    assert.equal(result.exitCode, 0);
    assert.ok(result.spawns.every(child => !child.args.includes('--grep')));
  });
}

test('formats partial stdout and stderr lines and flushes the final line once', async () => {
  const result = await run({
    features: [{ file: 'a.feature', title: 'A title', stdout: ['hello ', 'world\n'], stderr: ['error\nlast line'] }],
  });
  assert.equal(
    result.logs,
    '[Feature worker 1][A title] hello world\n[Feature worker 1][A title] error\n[Feature worker 1][A title] last line\n'
  );
});

test('continues remaining features after a failed child and reports the failing exit code', async () => {
  const input = features(3);
  input[0].exitCode = 1;
  const result = await run({ workers: 1, features: input });
  assert.equal(result.spawns.length, 3);
  assert.equal(result.exitCode, 1);
  assert.deepEqual(
    result.ensured.map(entry => entry.code),
    [1, 0, 0]
  );
  assert.ok(result.ensured.every(entry => entry.scenarios.length === 0));
  assert.deepEqual(result.reportOrder, ['aggregate', 'html', 'audit']);
});

test('reports spawn errors without hanging the worker or skipping other features', async () => {
  const result = await run({
    workers: 1,
    features: [
      { file: 'a.feature', title: 'A', spawnError: 'cannot spawn' },
      { file: 'b.feature', title: 'B' },
    ],
  });
  assert.equal(result.exitCode, 1);
  assert.equal(result.spawns.length, 2);
  assert.match(result.logs, /\[Feature worker 1\]\[A\] Error: cannot spawn/);
  assert.equal(result.ensured[0].feature, 'B');
  assert.deepEqual(result.reportOrder, ['aggregate', 'html', 'audit']);
});

test('passes final retry-audit failures to fallback JUnit reporting', async () => {
  const record = { feature: 'Feature 0', scenario: 'Scenario', attempt: 3, status: 'failed', durationMs: 100 };
  const result = await run({ features: features(1), audit: [record] });
  assert.deepEqual(
    result.ensured.map(entry => [entry.code, entry.scenarios]),
    [
      [0, [record]],
      [1, [record]],
    ]
  );
  assert.deepEqual(result.html.scenarios, ['Feature 0\u0000Scenario']);
  assert.deepEqual(result.audit.scenarios, result.html.scenarios);
});

test('report-only mode skips children and includes nested JUnit reports without aggregating itself', async () => {
  const result = await run({
    reportOnly: true,
    features: features(1),
    reports: ['result.xml', 'feature-0/result.xml', 'nested/deep/result.xml', 'nested/notes.xml'],
  });
  assert.equal(result.exitCode, 0);
  assert.deepEqual(result.spawns, []);
  const expected = [path.join(reportsRoot, 'feature-0/result.xml'), path.join(reportsRoot, 'nested/deep/result.xml')];
  assert.deepEqual(result.aggregate.files, expected);
  assert.deepEqual(result.html.files, expected);
  assert.equal(result.aggregate.file, path.join(reportsRoot, 'result.xml'));
  assert.equal(result.html.file, path.join(reportsRoot, 'Functional test report.html'));
  assert.equal(result.audit.file, path.join(reportsRoot, 'retry-audit-result.xml'));
  assert.deepEqual(result.reportOrder, ['aggregate', 'html', 'audit']);
});

test('report-only mode repairs failed audit results before creating aggregate reports', async () => {
  const record = {
    feature: 'Feature 0',
    scenario: 'Failed setup',
    attempt: 1,
    status: 'failed',
    hookName: 'Before',
    durationMs: 20,
  };
  const result = await run({ reportOnly: true, features: features(1), audit: [record] });
  assert.equal(result.ensured.length, 1);
  assert.equal(result.ensured[0].file, path.join(reportsRoot, 'feature-0/result.xml'));
  assert.deepEqual(result.ensured[0].scenarios, [record]);
  assert.equal(result.ensured[0].code, 1);
});

test('handles no feature files and a missing reports directory', async () => {
  const result = await run({ features: [], missingReports: true });
  assert.equal(result.exitCode, 0);
  assert.deepEqual(result.spawns, []);
  assert.deepEqual(result.aggregate.files, []);
  assert.deepEqual(result.html.files, []);
  assert.deepEqual(result.reportOrder, ['aggregate', 'html', 'audit']);
});
