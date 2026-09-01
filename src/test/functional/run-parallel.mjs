import { spawn } from 'node:child_process';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const featuresDir = path.join(projectRoot, 'src/test/functional/features');
const codeceptBin = path.join(projectRoot, 'node_modules/.bin/codeceptjs');
const configFile = './src/test/functional/codecept.conf.ts';
const workerCount = Math.max(1, Number(process.env.FUNCTIONAL_WORKERS || 10));
const grep = process.argv[2];

const features = (await readdir(featuresDir))
  .filter(file => file.endsWith('.feature'))
  .sort()
  .map(file => path.join(featuresDir, file));

const featureNames = new Map(
  await Promise.all(
    features.map(async feature => {
      const source = await readFile(feature, 'utf8');
      const featureName = source.match(/^\s*Feature:\s*(.+)$/m)?.[1]?.trim() || path.basename(feature, '.feature');
      return [feature, featureName];
    })
  )
);

let nextFeature = 0;
let failed = false;

const reportsRoot = path.join(projectRoot, 'functional-output/functional/reports');

const xmlEscape = value =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

const ensureJunitReport = async (reportFile, featureName, exitCode) => {
  try {
    await readFile(reportFile);
    return;
  } catch {
    // CodeceptJS may exit before its reporter receives the result event,
    // particularly when a Before/After hook fails. Keep Jenkins' JUnit step
    // usable by writing a valid report for that feature.
    const failedTest = exitCode !== 0;
    const failure = failedTest
      ? `<failure message="Feature process exited with code ${exitCode}" type="FunctionalTestFailure"/>`
      : '';
    const report =
      '<?xml version="1.0" encoding="UTF-8"?>\n' +
      `<testsuites tests="1" failures="${failedTest ? 1 : 0}" errors="0" skipped="0">` +
      `<testsuite name="${xmlEscape(featureName)}" tests="1" failures="${failedTest ? 1 : 0}" errors="0" skipped="0">` +
      `<testcase name="${xmlEscape(featureName)}">${failure}</testcase>` +
      '</testsuite></testsuites>\n';
    await mkdir(path.dirname(reportFile), { recursive: true });
    await writeFile(reportFile, report);
  }
};

const createAggregateJunitReport = async reportFiles => {
  const suites = (
    await Promise.all(
      reportFiles.map(async reportFile => {
        try {
          const report = await readFile(reportFile, 'utf8');
          return report.match(/<testsuite(?:\s|>)[\s\S]*<\/testsuite>/)?.[0] || '';
        } catch {
          return '';
        }
      })
    )
  )
    .filter(Boolean)
    .join('');

  await writeFile(
    path.join(reportsRoot, 'result.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<testsuites>${suites}</testsuites>\n`
  );
};

const createHtmlReport = async reportFiles => {
  const tests = [];
  const attribute = (attributes, name) => attributes.match(new RegExp(`${name}="([^"]*)"`))?.[1] || '';

  for (const reportFile of reportFiles) {
    try {
      const report = await readFile(reportFile, 'utf8');
      const suiteName = attribute(report.match(/<testsuite\b([^>]*)>/)?.[1] || '', 'name');
      const testcasePattern = /<testcase\b([^>]*)(?:>([\s\S]*?)<\/testcase>|\/>)/g;
      for (const match of report.matchAll(testcasePattern)) {
        const attributes = match[1];
        const body = match[2] || '';
        tests.push({
          featureName: suiteName,
          name: attribute(attributes, 'name') || '(unnamed test)',
          failed: body.includes('<failure') || body.includes('<error'),
        });
      }
    } catch {
      // The per-feature fallback report is normally present. Ignore a report
      // that cannot be read so the summary can still be generated.
    }
  }

  const testsByFeature = Map.groupBy(tests, test => test.featureName);
  const featureTables = [...testsByFeature]
    .sort(([, firstTests], [, secondTests]) => {
      const firstFailed = firstTests.some(test => test.failed);
      const secondFailed = secondTests.some(test => test.failed);
      return Number(secondFailed) - Number(firstFailed);
    })
    .map(([featureName, featureTests]) => {
      const rows = featureTests
        .map(test => {
          const status = test.failed ? 'Failed' : 'Passed';
          const statusClass = test.failed ? 'failed' : 'passed';
          return (
            `<tr><td class="${statusClass}">${status}</td>` +
            `<td class="${statusClass}">${xmlEscape(test.name)}</td></tr>`
          );
        })
        .join('\n');
      const featureFailedCount = featureTests.filter(test => test.failed).length;
      const featureSummary =
        `(${featureTests.length} tests: <span${featureTests.length - featureFailedCount > 0 ? ' class="passed"' : ''}>${featureTests.length - featureFailedCount} passed</span>, ` +
        `<span${featureFailedCount > 0 ? ' class="failed"' : ''}>${featureFailedCount} failed</span>)`;
      return (
        `<h3 class="featureTitle">${xmlEscape(featureName)}</h3><div class="featureSummary">${featureSummary}</div>` +
        '<table><thead><tr><th>Result</th><th>Test</th></tr></thead>' +
        `<tbody>${rows}</tbody></table>`
      );
    })
    .join('\n');
  const failedCount = tests.filter(test => test.failed).length;
  const html = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>Functional test report</title>
<style>body{font:16px sans-serif;margin:2rem}table{border-collapse:collapse;width:100%}thead > tr:first-child{border-bottom: 1px solid #ddd}th,td{border:none;padding:.5rem;text-align:left}th:first-child,td:first-child{min-width:1%;padding-left: 0;border-right:1px solid #ddd}th:last-child,td:last-child{padding-right: 0}.passed{color:#087f23}.failed{color:#b00020}.featureTitle{display: inline-block;margin-top:2.75rem;margin-bottom:.75rem;margin-right:.25rem}.featureTitle:first-of-type{margin-top: 0}.featureSummary{font-size:1.1rem;display:inline-block}.totalSummary{font-size:1.1rem;}hr{margin-top:1.3575rem;margin-bottom:1.3575rem;border:0 transparent;border-top:1px solid #ddd}</style>
</head><body><h1>Functional test report</h1>
<div class="totalSummary">${tests.length} tests: <span${tests.length - failedCount > 0 ? ' class="passed"' : ''}>${tests.length - failedCount} passed</span>, <span${failedCount > 0 ? ' class="failed"' : ''}>${failedCount} failed.</span></div><hr>
${featureTables}</body></html>\n`;
  await writeFile(path.join(reportsRoot, 'Functional test report.html'), html);
};

const createLogFormatter = (workerIndex, featureName) => {
  let pending = '';

  const formatLine = line => {
    return `[Feature worker ${workerIndex}][${featureName}] ${line}`;
  };

  return {
    write(data) {
      pending += data.toString();
      const lines = pending.split('\n');
      pending = lines.pop();
      lines.forEach(line => {
        const formatted = formatLine(line);
        if (formatted) {
          process.stdout.write(`${formatted}\n`);
        }
      });
    },
    flush() {
      if (pending) {
        const formatted = formatLine(pending);
        if (formatted) {
          process.stdout.write(formatted + '\n');
        }
      }
    },
  };
};

const runFeature = (feature, workerIndex) =>
  new Promise(resolve => {
    const featureTitle = featureNames.get(feature);
    const featureName = path.basename(feature, '.feature').replace(/[^a-zA-Z0-9_-]/g, '_');
    const reportDir = path.join(reportsRoot, featureName);
    const junitReportFile = path.join(reportDir, 'result.xml');
    const override = JSON.stringify({
      output: reportDir,
      plugins: {
        junitReporter: {
          output: reportDir,
          outputName: 'result.xml',
        },
      },
    });

    const args = ['run', feature, '--config', configFile, '--override', override];
    if (grep) {
      args.push('--grep', grep);
    }

    const child = spawn(codeceptBin, args, {
      cwd: projectRoot,
      // Some feature files contain only @nightly scenarios. When the normal
      // e2e grep excludes them, CodeceptJS treats that child as an empty run
      // and exits 1. The parent runner treats it as a skipped file.
      env: {
        ...process.env,
        DONT_FAIL_ON_EMPTY_RUN: 'true',
      },
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    const formatter = createLogFormatter(workerIndex, featureTitle);
    child.stdout.on('data', data => formatter.write(data));
    child.stderr.on('data', data => formatter.write(data));
    child.on('error', error => {
      failed = true;
      formatter.write(error.stack || error);
      formatter.flush();
      resolve();
    });
    child.on('close', code => {
      if (code !== 0) {
        failed = true;
      }
      formatter.flush();
      ensureJunitReport(junitReportFile, featureName, code).finally(resolve);
    });
  });

const worker = async workerIndex => {
  while (nextFeature < features.length) {
    const feature = features[nextFeature++];
    await runFeature(feature, workerIndex);
  }
};

const reportFiles = features.flatMap(feature => {
  const featureName = path.basename(feature, '.feature').replace(/[^a-zA-Z0-9_-]/g, '_');
  return path.join(reportsRoot, featureName, 'result.xml');
});

if (process.env.FUNCTIONAL_REPORT_ONLY === 'true') {
  await createAggregateJunitReport(reportFiles);
  await createHtmlReport(reportFiles);
  process.exit(0);
}

await Promise.all(Array.from({ length: Math.min(workerCount, features.length) }, (_, index) => worker(index + 1)));
await createAggregateJunitReport(reportFiles);
await createHtmlReport(reportFiles);

process.exitCode = failed ? 1 : 0;
