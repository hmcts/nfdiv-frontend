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
const retryAuditRoot = path.join(projectRoot, 'functional-output/functional/retry-audit');

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
  const formatTagAttributes = (xml, tagName, indent) =>
    xml.replace(new RegExp(`<${tagName}\\b([^>]*?)(/?)>`, 'g'), (_, attributes, closing) => {
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

  await writeFile(
    path.join(reportsRoot, 'result.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<testsuites>${suites}\n</testsuites>\n`
  );
};

const readRetryAudit = async () => {
  try {
    const auditFiles = (await readdir(retryAuditRoot)).filter(file => file.endsWith('.json'));
    const attempts = new Map();

    await Promise.all(
      auditFiles.map(async auditFile => {
        try {
          const audit = JSON.parse(await readFile(path.join(retryAuditRoot, auditFile), 'utf8'));
          if (!audit.feature || !audit.scenario || typeof audit.durationMs !== 'number') {
            return;
          }

          const key = `${audit.feature}\u0000${audit.scenario}`;
          attempts.set(key, [...(attempts.get(key) || []), audit]);
        } catch {
          // Ignore an audit file that is incomplete or no longer valid JSON.
        }
      })
    );

    return new Map(
      [...attempts].map(([key, scenarioAttempts]) => {
        const orderedAttempts = scenarioAttempts.sort(
          (first, second) => first.attempt - second.attempt || first.recordedAt.localeCompare(second.recordedAt)
        );
        const firstAttempt = orderedAttempts[0];
        const successfulAttempt = orderedAttempts.find(
          audit => audit.attempt > firstAttempt.attempt && firstAttempt.status !== 'passed' && audit.status === 'passed'
        );
        return [key, { attempts: orderedAttempts, latest: orderedAttempts.at(-1), successfulAttempt }];
      })
    );
  } catch {
    // Retry audit output is optional, so report generation still works when it is absent.
    return new Map();
  }
};

const createHtmlReport = async reportFiles => {
  const tests = [];
  const retryAudit = await readRetryAudit();
  const hasRetryAudit = retryAudit.size > 0;
  const attribute = (attributes, name) => attributes.match(new RegExp(`${name}="([^"]*)"`))?.[1] || '';
  const xmlUnescape = value =>
    value
      .replaceAll('&quot;', '"')
      .replaceAll('&apos;', "'")
      .replaceAll('&lt;', '<')
      .replaceAll('&gt;', '>')
      .replaceAll('&amp;', '&');
  const formatRuntime = durationMs => {
    if (durationMs < 1000) {
      return `${durationMs}ms`;
    }
    if (durationMs < 60 * 1000) {
      return `${(durationMs / 1000).toFixed(3)}s`;
    }
    if (durationMs < 60 * 60 * 1000) {
      return `${(durationMs / (60 * 1000)).toFixed(3)}m`;
    }
    return `${(durationMs / (60 * 60 * 1000)).toFixed(3)}h`;
  };

  for (const reportFile of reportFiles) {
    try {
      const report = await readFile(reportFile, 'utf8');
      const suiteName = attribute(report.match(/<testsuite\b([^>]*)>/)?.[1] || '', 'name');
      const testcasePattern = /<testcase\b([^>]*)(?:>([\s\S]*?)<\/testcase>|\/>)/g;
      for (const match of report.matchAll(testcasePattern)) {
        const attributes = match[1];
        const body = match[2] || '';
        tests.push({
          featureName: xmlUnescape(suiteName),
          name: xmlUnescape(attribute(attributes, 'name')) || '(unnamed test)',
          failed: body.includes('<failure') || body.includes('<error'),
        });
      }
    } catch {
      // The per-feature fallback report is normally present. Ignore a report
      // that cannot be read so the summary can still be generated.
    }
  }

  const logicalTests = [...Map.groupBy(tests, test => `${test.featureName}\u0000${test.name}`)].map(
    ([, scenarioAttempts]) => {
      const test = scenarioAttempts[0];
      const audit = retryAudit.get(`${test.featureName}\u0000${test.name}`);
      const latestAttempt = audit?.latest;

      return {
        ...test,
        failed: latestAttempt ? latestAttempt.status === 'failed' : scenarioAttempts.some(attempt => attempt.failed),
      };
    }
  );
  const testsByFeature = Map.groupBy(logicalTests, test => test.featureName);
  const featureTables = [...testsByFeature]
    .sort(([, firstTests], [, secondTests]) => {
      const firstFailed = firstTests.some(test => test.failed);
      const secondFailed = secondTests.some(test => test.failed);
      return Number(secondFailed) - Number(firstFailed);
    })
    .map(([featureName, featureTests]) => {
      const renderTest = (test, tableType) => {
        const status = test.failed ? 'Failed' : 'Passed';
        const statusClass = test.failed ? 'failed' : 'passed';
        const audit = retryAudit.get(`${test.featureName}\u0000${test.name}`);
        const retried = audit?.attempts.some(attempt => attempt.attempt > 1);
        const showRuntime = hasRetryAudit && tableType !== 'retried';
        const showError = hasRetryAudit && tableType === 'failure';
        const runtime = retried ? audit?.successfulAttempt?.durationMs : audit?.latest.durationMs;
        const error = audit?.latest.error?.message || audit?.latest.error?.stack || '';
        const attemptRows = retried
          ? audit.attempts
              .map(attempt => {
                const attemptStatus =
                  attempt.status === 'passed' ? 'Passed' : attempt.status === 'skipped' ? 'Skipped' : 'Failed';
                const attemptClass =
                  attempt.status === 'passed' ? 'passed' : attempt.status === 'skipped' ? '' : 'failed';
                const attemptError =
                  attempt.status === 'failed' ? attempt.error?.message || attempt.error?.stack || '' : '';
                return (
                  `<tr><td class="attempt">${attempt.attempt}</td><td class="result ${attemptClass}">${attemptStatus}</td>` +
                  `<td class="runtime">${formatRuntime(attempt.durationMs)}</td>` +
                  `<td class="error">${xmlEscape(attemptError)}</td>` +
                  '</tr>'
                );
              })
              .join('')
          : '';
        const attemptTable = `<table class="attempts"><thead><tr><th class="attempt">Attempt</th><th class="result">Result</th><th class="runtime">Runtime</th><th class="error">Error</th></tr></thead><tbody>${attemptRows}</tbody></table>`;
        return {
          row:
            `<tr><td class="${statusClass}">${status}</td>` +
            (showRuntime ? `<td class="runtime">${runtime === undefined ? '' : formatRuntime(runtime)}</td>` : '') +
            `<td class="${statusClass}">${xmlEscape(test.name)}</td>` +
            (showError ? `<td class="error">${xmlEscape(error)}</td>` : '') +
            '</tr>' +
            (retried ? `<tr><td class="empty"></td><td colspan="2">${attemptTable}</td></tr>` : ''),
        };
      };
      const tables = [];
      let rows = [];
      let tableType = null;
      const flushTable = () => {
        if (rows.length > 0) {
          tables.push({ rows, tableType });
          rows = [];
        }
      };
      for (const test of featureTests) {
        const audit = retryAudit.get(`${test.featureName}\u0000${test.name}`);
        const retried = audit?.attempts.some(attempt => attempt.attempt > 1);
        const nextTableType = retried ? 'retried' : test.failed ? 'failure' : 'normal';
        if (rows.length > 0 && tableType !== nextTableType) {
          flushTable();
        }
        tableType = nextTableType;
        const renderedTest = renderTest(test, tableType);
        rows.push(renderedTest.row);
        if (retried) {
          flushTable();
        }
      }
      flushTable();
      const renderedTables = tables
        .map(
          table =>
            `<table><thead><tr><th>Result</th>${hasRetryAudit && table.tableType !== 'retried' ? '<th class="runtime">Runtime</th>' : ''}<th>Test</th>${hasRetryAudit && table.tableType === 'failure' ? '<th class="error">Error</th>' : ''}</tr></thead>` +
            `<tbody>${table.rows.join('\n')}</tbody></table>`
        )
        .join('\n');
      const featureFailedCount = featureTests.filter(test => test.failed).length;
      const featureSummary =
        `(${featureTests.length} test${featureTests.length > 1 ? 's' : ''}: <span${featureTests.length - featureFailedCount > 0 ? ' class="passed"' : ''}>${featureTests.length - featureFailedCount} passed</span>, ` +
        `<span${featureFailedCount > 0 ? ' class="failed"' : ''}>${featureFailedCount} failed</span>)`;
      return (
        `<h3 class="featureTitle">${xmlEscape(featureName)}</h3><div class="featureSummary">${featureSummary}</div>` +
        renderedTables
      );
    })
    .join('\n');
  const failedCount = logicalTests.filter(test => test.failed).length;
  const html = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>Functional test report</title>
<meta name="color-scheme" content="light dark">
<style>:root{color-scheme:light;--background:#FFFFFF;--foreground:#292A2E;--muted-border:#ddd;--passed:#087f23;--failed:#b00020}</style>
<style>:root[data-theme="dark"]{color-scheme:dark;--background:#1F1F21;--foreground:#CECfD2;--muted-border:#505357;--passed:#65d184;--failed:#ff8585}</style>
<style>html{background:var(--background)}body{background:var(--background);color:var(--foreground);font:16px sans-serif;margin:2rem}</style>
<style>table{border-collapse:collapse;width:100%;margin-bottom:0.5rem}thead > tr:first-child{border-bottom:1px solid var(--muted-border)}th,td{border:none;border-right:1px solid var(--muted-border);min-width:max-content;padding:.5rem .75rem;text-align:left}th:first-child:not(.attempt),td:first-child:not(.attempt){padding-left:0;}th.attempt,td.attempt,th.result,td.result,th.runtime,td.runtime{text-align:center;}td.empty{min-width:1%;padding:0;border-right:none}th:last-child,td:last-child{width:100%;padding-right:0;border-right:none}</style>
<style>.passed{color:var(--passed)}.failed{color:var(--failed)}.featureTitle{display:inline-block;margin-top:2.75rem;margin-bottom:.75rem;margin-right:.25rem}.featureTitle:first-of-type{margin-top:0}.featureSummary{font-size:1.1rem;display:inline-block}.totalSummary{font-size:1.1rem}hr{margin-top:1.3575rem;margin-bottom:1.3575rem;border:0 transparent;border-top:1px solid var(--muted-border)}</style>
<style>#themeToggle{position:absolute;top:1rem;right:1rem;z-index:1;border:1px solid var(--muted-border);border-radius:.35rem;background:var(--background);color:var(--foreground);cursor:pointer;font:inherit;width:2.5rem;height:2.5rem;padding:0;font-size:0}#themeToggle:focus-visible{outline:2px solid var(--foreground);outline-offset:2px}</style>
<style>#themeToggle::before{font-size:1.5rem;content:'☾'}:root[data-theme="dark"] #themeToggle::before{content:'☀'}@media(prefers-color-scheme:dark){:root:not([data-theme]) #themeToggle::before{content:'☀'}}</style>
</head><body><button id="themeToggle" type="button" aria-label="Switch to dark theme"></button><h1>Functional test report</h1>
<div class="totalSummary">${logicalTests.length} tests: <span${logicalTests.length - failedCount > 0 ? ' class="passed"' : ''}>${logicalTests.length - failedCount} passed</span>, <span${failedCount > 0 ? ' class="failed"' : ''}>${failedCount} failed.</span></div><hr>
${featureTables}<script>const root=document.documentElement;const button=document.getElementById('themeToggle');const getSystemTheme=()=>window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';const getStoredTheme=()=>{try{return localStorage.getItem('functional-report-theme')}catch{return null}};const storeTheme=theme=>{try{localStorage.setItem('functional-report-theme',theme)}catch{}};const applyTheme=theme=>{if(theme==='system'){root.removeAttribute('data-theme')}else{root.dataset.theme=theme}const isDark=(theme==='system'?getSystemTheme():theme)==='dark';button.textContent=isDark?'☀ Light':'☾ Dark';button.setAttribute('aria-label',isDark?'Switch to light theme':'Switch to dark theme')};const storedTheme=getStoredTheme();applyTheme(storedTheme==='light'||storedTheme==='dark'?storedTheme:'system');button.addEventListener('click',()=>{const currentTheme=root.dataset.theme||getSystemTheme();const theme=currentTheme==='dark'?'light':'dark';applyTheme(theme);storeTheme(theme)});</script></body></html>\n`;
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
