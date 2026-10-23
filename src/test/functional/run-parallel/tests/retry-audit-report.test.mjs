import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { loadRetryAudit } from '../report-utils.mjs';
import { createRetryAuditReport } from '../retry-audit-report.mjs';

const withTempDirectory = async callback => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'nfdiv-retry-audit-report-'));
  try {
    await callback(directory);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
};

test('does not create a report without valid audit records', async () => {
  await withTempDirectory(async directory => {
    const outputFile = path.join(directory, 'reports', 'retry-audit-result.xml');

    await createRetryAuditReport(await loadRetryAudit(path.join(directory, 'missing-audit')), outputFile);

    await assert.rejects(readFile(outputFile, 'utf8'));
  });
});

test('aggregates the latest attempt for each scenario', async () => {
  await withTempDirectory(async directory => {
    const auditDirectory = path.join(directory, 'retry-audit');
    const outputFile = path.join(directory, 'reports', 'retry-audit-result.xml');
    await mkdir(auditDirectory, { recursive: true });
    await writeFile(
      path.join(auditDirectory, 'first-attempt.json'),
      JSON.stringify({
        feature: 'Feature & one',
        featureFile: '/features/feature-one.feature',
        scenario: 'Scenario one',
        attempt: 1,
        status: 'failed',
        durationMs: 100,
        error: { message: 'Initial failure' },
        recordedAt: '2026-01-01T00:00:00.000Z',
      })
    );
    await writeFile(
      path.join(auditDirectory, 'retry.json'),
      JSON.stringify({
        feature: 'Feature & one',
        featureFile: '/features/feature-one.feature',
        scenario: 'Scenario one',
        attempt: 2,
        status: 'passed',
        durationMs: 200,
        recordedAt: '2026-01-01T00:00:01.000Z',
      })
    );
    await writeFile(
      path.join(auditDirectory, 'skipped.json'),
      JSON.stringify({
        feature: 'Feature two',
        scenario: 'Scenario two',
        attempt: 1,
        status: 'skipped',
        durationMs: 0,
        recordedAt: '2026-01-01T00:00:02.000Z',
      })
    );

    await createRetryAuditReport(await loadRetryAudit(auditDirectory), outputFile);

    const report = await readFile(outputFile, 'utf8');
    assert.match(report, /tests="2" failures="0" errors="0" skipped="1"/);
    assert.match(report, /name="Scenario one" time="0\.200"/);
    assert.match(report, /<skipped\/>/);
    assert.match(report, /Feature &amp; one/);
    assert.doesNotMatch(report, /Initial failure/);
  });
});
