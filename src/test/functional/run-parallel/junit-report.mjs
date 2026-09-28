import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { xmlEscape } from './report-utils.mjs';

const hasFailure = report => /<(?:failure|error)\b/.test(report);

export const buildFallbackJunitReport = (featureName, exitCode, scenarioAttempts = []) => {
  const failedTest = exitCode !== 0;
  const scenarios = scenarioAttempts.length
    ? scenarioAttempts
    : [{ scenario: featureName, status: failedTest ? 'failed' : 'passed' }];
  const failedCount = scenarios.filter(attempt => attempt.status === 'failed').length;
  const skippedCount = scenarios.filter(attempt => attempt.status === 'skipped').length;
  const testCases = scenarios
    .map(attempt => {
      const failure =
        attempt.status === 'failed'
          ? `<failure message="${xmlEscape(attempt.error?.message || `Feature process exited with code ${exitCode}`)}" type="${xmlEscape(attempt.error?.name || 'FunctionalTestFailure')}"/>`
          : attempt.status === 'skipped'
            ? '<skipped/>'
            : '';
      return `<testcase name="${xmlEscape(attempt.scenario)}">${failure}</testcase>`;
    })
    .join('');

  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    `<testsuites tests="${scenarios.length}" failures="${failedCount}" errors="0" skipped="${skippedCount}">` +
    `<testsuite name="${xmlEscape(featureName)}" tests="${scenarios.length}" failures="${failedCount}" errors="0" skipped="${skippedCount}">` +
    testCases +
    '</testsuite></testsuites>\n'
  );
};

export const ensureJunitReport = async (reportFile, featureName, exitCode, scenarioAttempts = []) => {
  let report;

  try {
    report = await readFile(reportFile, 'utf8');
  } catch {
    report = null;
  }

  // CodeceptJS may exit before its reporter receives the result event,
  // particularly when a Before/After hook fails. It can also write a
  // zero-failure report before the child process exits. In either case,
  // keep Jenkins' JUnit step aligned with the feature process exit code.
  const hasAuditFailures = scenarioAttempts.some(attempt => attempt.status === 'failed');
  if (report && exitCode === 0) {
    return;
  }
  if (report && hasFailure(report) && !hasAuditFailures) {
    return;
  }

  await mkdir(path.dirname(reportFile), { recursive: true });
  await writeFile(
    reportFile,
    buildFallbackJunitReport(featureName, exitCode, hasAuditFailures ? scenarioAttempts : [])
  );
};

export const createAggregateJunitReport = async (reportFiles, outputFile) => {
  const formatTagAttributes = (xml, tagName, indent) =>
    xml.replace(new RegExp(`<${tagName}\b([^>]*?)(/?)>`, 'g'), (_, attributes, closing) => {
      const formattedAttributes = [...attributes.matchAll(/\s+[\w:-]+="[^"]*"/g)]
        .map(([attribute]) => `${indent}  ${attribute.trim()}`)
        .join('\n');
      return `<${tagName}\n${formattedAttributes}\n${indent}${closing}>`;
    });

  const suites = (
    await Promise.all(
      reportFiles.map(async reportFile => {
        try {
          const report = await readFile(reportFile, 'utf8');
          const suite = report.match(/<testsuite(?:\s|>)[\s\S]*<\/testsuite>/)?.[0] || '';
          return formatTagAttributes(formatTagAttributes(suite, 'testsuite', ''), 'testcase', '')
            .replaceAll('<testsuite', '\n<testsuite')
            .replaceAll('<testcase', '\n<testcase')
            .replaceAll('><properties>', '>\n<properties>\n')
            .replaceAll('\n<property', '\n  <property')
            .replaceAll('/><property', '/>\n  <property')
            .replaceAll('</properties><system-out>', '</properties>\n<system-out>')
            .replaceAll('</properties>', '\n</properties>')
            .replaceAll('<system-out>', '<system-out>\n')
            .replaceAll('</system-out>', '\n</system-out>');
        } catch {
          return '';
        }
      })
    )
  )
    .filter(Boolean)
    .join('');

  await writeFile(outputFile, `<?xml version="1.0" encoding="UTF-8"?>\n<testsuites>${suites}\n</testsuites>\n`);
};
