import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { createAggregateJunitReport, ensureJunitReport } from '../junit-report.mjs';

const successfulReport =
  '<?xml version="1.0" encoding="UTF-8"?><testsuites tests="1" failures="0"><testsuite name="Feature" tests="1" failures="0"><testcase name="Scenario"/></testsuite></testsuites>';
const failedReport =
  '<?xml version="1.0" encoding="UTF-8"?><testsuites tests="1" failures="1"><testsuite name="Feature" tests="1" failures="1"><testcase name="Scenario"><failure message="original"/></testcase></testsuite></testsuites>';

const withTempDirectory = async callback => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'nfdiv-junit-report-'));
  try {
    await callback(directory);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
};

test('replaces an existing zero-failure report after a failed feature process', async () => {
  await withTempDirectory(async directory => {
    const reportFile = path.join(directory, 'result.xml');
    await writeFile(reportFile, successfulReport);

    await ensureJunitReport(reportFile, 'Applicant & feature', 1);

    const report = await readFile(reportFile, 'utf8');
    assert.match(report, /failures="1"/);
    assert.match(report, /Feature process exited with code 1/);
    assert.match(report, /Applicant &amp; feature/);
  });
});

test('uses latest retry-audit scenarios to replace an incomplete failed report', async () => {
  await withTempDirectory(async directory => {
    const reportFile = path.join(directory, 'result.xml');
    await writeFile(reportFile, failedReport);

    await ensureJunitReport(reportFile, 'Feature', 1, [
      { scenario: 'Failed scenario one', status: 'failed', error: { message: 'First failure', name: 'FirstError' } },
      { scenario: 'Passed scenario', status: 'passed' },
      { scenario: 'Failed scenario two', status: 'failed', error: { message: 'Second failure' } },
      { scenario: 'Skipped scenario', status: 'skipped' },
    ]);

    const report = await readFile(reportFile, 'utf8');
    assert.match(report, /tests="4" failures="2" errors="0" skipped="1"/);
    assert.match(report, /<testcase name="Failed scenario one"><failure message="First failure" type="FirstError"\/>/);
    assert.match(
      report,
      /<testcase name="Failed scenario two"><failure message="Second failure" type="FunctionalTestFailure"\/>/
    );
    assert.match(report, /<testcase name="Passed scenario"><\/testcase>/);
    assert.match(report, /<testcase name="Skipped scenario"><skipped\/><\/testcase>/);
  });
});

test('keeps passed retry-audit scenarios before a synthetic process failure', async () => {
  await withTempDirectory(async directory => {
    const reportFile = path.join(directory, 'result.xml');
    await writeFile(reportFile, successfulReport);

    await ensureJunitReport(reportFile, 'Feature', 255, [
      { scenario: 'First scenario', status: 'passed' },
      { scenario: 'Second scenario', status: 'passed' },
    ]);

    const report = await readFile(reportFile, 'utf8');
    assert.match(report, /tests="3" failures="1" errors="0" skipped="0"/);
    assert.match(report, /<testcase name="Feature \[feature process\]" processFailure="true"><failure/);
    assert.ok(report.indexOf('Feature [feature process]') < report.indexOf('First scenario'));
    assert.match(report, /<testcase name="First scenario"><\/testcase>/);
    assert.match(report, /<testcase name="Second scenario"><\/testcase>/);
  });
});

test('preserves an existing failed report', async () => {
  await withTempDirectory(async directory => {
    const reportFile = path.join(directory, 'result.xml');
    await writeFile(reportFile, failedReport);

    await ensureJunitReport(reportFile, 'Feature', 1);

    assert.equal(await readFile(reportFile, 'utf8'), failedReport);
  });
});

test('creates a failed report when the reporter did not write one', async () => {
  await withTempDirectory(async directory => {
    const reportFile = path.join(directory, 'result.xml');

    await ensureJunitReport(reportFile, 'Feature', 1);

    const report = await readFile(reportFile, 'utf8');
    assert.match(report, /failures="1"/);
    assert.match(report, /<failure/);
  });
});

test('does not replace an existing successful report after a successful feature process', async () => {
  await withTempDirectory(async directory => {
    const reportFile = path.join(directory, 'result.xml');
    await writeFile(reportFile, successfulReport);

    await ensureJunitReport(reportFile, 'Feature', 0);

    assert.equal(await readFile(reportFile, 'utf8'), successfulReport);
  });
});

test('includes failed feature suites in the aggregate report', async () => {
  await withTempDirectory(async directory => {
    const firstReport = path.join(directory, 'first.xml');
    const secondReport = path.join(directory, 'second.xml');
    const aggregateReport = path.join(directory, 'aggregate.xml');
    await writeFile(firstReport, successfulReport);
    await writeFile(secondReport, failedReport);

    await createAggregateJunitReport([firstReport, secondReport], aggregateReport);

    const report = await readFile(aggregateReport, 'utf8');
    assert.equal((report.match(/<testsuite\b/g) || []).length, 2);
    assert.match(report, /<failure message="original"\/>/);
  });
});
