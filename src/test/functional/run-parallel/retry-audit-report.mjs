import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { xmlEscape } from './report-utils.mjs';

const formatFailure = attempt => {
  if (attempt.status !== 'failed') {
    return attempt.status === 'skipped' ? '<skipped/>' : '';
  }

  const message = attempt.error?.message || `Feature scenario failed${attempt.hookName ? ` in ${attempt.hookName}` : ''}`;
  const details = attempt.error?.stack || attempt.error?.message || '';
  const type = attempt.error?.name || 'FunctionalTestFailure';
  return `<failure message="${xmlEscape(message)}" type="${xmlEscape(type)}">${xmlEscape(details)}</failure>`;
};

const formatSeconds = durationMs => (Number.isFinite(durationMs) ? (durationMs / 1000).toFixed(3) : '0.000');

export const createRetryAuditReport = async (retryAudit, outputFile) => {
  if (retryAudit.size === 0) {
    return;
  }

  const suites = new Map();
  for (const { latest: attempt } of retryAudit.values()) {
    const featureTests = suites.get(attempt.feature) || [];
    featureTests.push(attempt);
    suites.set(attempt.feature, featureTests);
  }

  let total = 0;
  let failures = 0;
  let skipped = 0;
  let totalDurationMs = 0;
  const suiteXml = [...suites]
    .sort(([first], [second]) => first.localeCompare(second))
    .map(([feature, featureTests], index) => {
      featureTests.sort((first, second) => first.scenario.localeCompare(second.scenario));
      const featureFailures = featureTests.filter(attempt => attempt.status === 'failed').length;
      const featureSkipped = featureTests.filter(attempt => attempt.status === 'skipped').length;
      const featureDurationMs = featureTests.reduce(
        (duration, attempt) => duration + (Number.isFinite(attempt.durationMs) ? attempt.durationMs : 0),
        0
      );
      const testcases = featureTests
        .map(attempt => {
          total += 1;
          failures += Number(attempt.status === 'failed');
          skipped += Number(attempt.status === 'skipped');
          totalDurationMs += Number.isFinite(attempt.durationMs) ? attempt.durationMs : 0;
          const file = attempt.featureFile ? ` file="${xmlEscape(attempt.featureFile)}"` : '';
          return (
            `<testcase classname="${xmlEscape(feature)}" name="${xmlEscape(attempt.scenario)}" time="${formatSeconds(attempt.durationMs)}"${file}>` +
            `${formatFailure(attempt)}</testcase>`
          );
        })
        .join('\n');

      return (
        `<testsuite name="${xmlEscape(feature)}" id="${index}" tests="${featureTests.length}" failures="${featureFailures}" errors="0" skipped="${featureSkipped}" time="${formatSeconds(featureDurationMs)}">` +
        `\n${testcases}\n</testsuite>`
      );
    })
    .join('\n');

  await mkdir(path.dirname(outputFile), { recursive: true });
  await writeFile(
    outputFile,
    `<?xml version="1.0" encoding="UTF-8"?>\n<testsuites tests="${total}" failures="${failures}" errors="0" skipped="${skipped}" time="${formatSeconds(totalDurationMs)}">\n${suiteXml}\n</testsuites>\n`
  );
};
