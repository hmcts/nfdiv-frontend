import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const hasFailure = report => /<(?:failure|error)\b/.test(report);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const buildFallbackJunitReport = (featureName, exitCode) => {
  const failedTest = exitCode !== 0;
  const failure = failedTest
    ? `<failure message="Feature process exited with code ${exitCode}" type="FunctionalTestFailure"/>`
    : '';

  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    `<testsuites tests="1" failures="${failedTest ? 1 : 0}" errors="0" skipped="0">` +
    `<testsuite name="${xmlEscape(featureName)}" tests="1" failures="${failedTest ? 1 : 0}" errors="0" skipped="0">` +
    `<testcase name="${xmlEscape(featureName)}">${failure}</testcase>` +
    '</testsuite></testsuites>\n'
  );
};

const xmlEscape = value =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const ensureJunitReport = async (reportFile, featureName, exitCode) => {
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
  if (report && (exitCode === 0 || hasFailure(report))) {
    return;
  }

  await mkdir(path.dirname(reportFile), { recursive: true });
  await writeFile(reportFile, buildFallbackJunitReport(featureName, exitCode));
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
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
