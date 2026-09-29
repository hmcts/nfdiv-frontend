import { existsSync } from 'node:fs';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { testToFileName } from 'codeceptjs/lib/mocha/test';

import { scenarioKey, xmlEscape, xmlUnescape } from './report-utils.mjs';

const getAttemptStatus = attempt =>
  attempt?.status === 'passed' ? 'Passed' : attempt?.status === 'skipped' ? 'Skipped' : 'Failed';

const getAttemptClass = attempt =>
  attempt?.status === 'passed' ? 'passed' : attempt?.status === 'skipped' ? '' : 'failed';

const getAttemptError = attempt =>
  attempt?.status === 'failed' ? attempt.error?.message || attempt.error?.stack || '' : '';

const getHookFailure = attempt =>
  attempt?.status === 'failed' && attempt.hookName
    ? `<span class="failed">(Hook failure: ${xmlEscape(attempt.hookName)})</span> `
    : '';

export const createHtmlReport = async (reportFiles, retryAudit, outputFile) => {
  const tests = [];
  const hasRetryAudit = retryAudit.size > 0;
  const linkTo = file => encodeURI(path.relative(path.dirname(outputFile), file).replaceAll(path.sep, '/'));
  const artifactLink = (label, file) => {
    if (!file) {
      return label;
    }

    const href = linkTo(file);
    return `<a class="artifact-link" href="${xmlEscape(href)}" title="${xmlEscape(href)}" target="_blank" rel="noopener">${label}</a>`;
  };
  const screenshotSpan = (file, label = 'Screenshot', linkedScreenshots) => {
    if (!file || !existsSync(file)) {
      return '';
    }

    linkedScreenshots?.add(file);
    return `<span class="failed">(${artifactLink(label, file)})</span> `;
  };
  const numberedScreenshotSpans = (files, linkedScreenshots) =>
    files.map((file, index) => screenshotSpan(file, `Screenshot ${index + 1}`, linkedScreenshots)).join('');
  const testScreenshotSpans = (files, linkedScreenshots) =>
    files.length === 1
      ? screenshotSpan(files[0], 'Screenshot', linkedScreenshots)
      : numberedScreenshotSpans(files, linkedScreenshots);
  const featureScreenshots = new Map();
  const loadFeatureScreenshots = async reportFile => {
    const directory = path.dirname(reportFile);
    if (featureScreenshots.has(directory)) {
      return featureScreenshots.get(directory);
    }

    try {
      const files = (await readdir(directory, { withFileTypes: true }))
        .filter(entry => entry.isFile() && entry.name.toLowerCase().endsWith('.png'))
        .map(entry => path.join(directory, entry.name))
        .sort();
      featureScreenshots.set(directory, files);
      return files;
    } catch {
      featureScreenshots.set(directory, []);
      return [];
    }
  };
  const scenarioScreenshotMatches = (test, files) => {
    const scenarioName = testToFileName({ title: test.name }, { suffix: '', unique: false }).toLowerCase();
    return files.filter(file => {
      const fileName = path.basename(file, path.extname(file)).toLowerCase();
      const retryAuditFileName = fileName.replace(/\.attempt_\d+\.failed$/, '');
      return (
        fileName.includes(scenarioName) ||
        scenarioName.includes(fileName) ||
        retryAuditFileName.includes(scenarioName) ||
        scenarioName.includes(retryAuditFileName)
      );
    });
  };
  const uniqueScreenshots = files => [...new Set(files.filter(Boolean))];
  const resolveScreenshot = (reportFile, screenshotFile) => {
    if (!screenshotFile) {
      return null;
    }

    const file = path.resolve(path.dirname(reportFile), screenshotFile);
    return existsSync(file) ? file : null;
  };
  const attribute = (attributes, name) => attributes.match(new RegExp(`${name}="([^"]*)"`))?.[1] || '';
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
      const testcasePattern = /<testcase\b([^>]*?)(?:\/>|>([\s\S]*?)<\/testcase>)/g;
      for (const match of report.matchAll(testcasePattern)) {
        const attributes = match[1];
        const body = match[2] || '';
        tests.push({
          featureName: xmlUnescape(suiteName),
          name: xmlUnescape(attribute(attributes, 'name')) || '(unnamed test)',
          failed: body.includes('<failure') || body.includes('<error'),
          junitReportFile: reportFile,
        });
      }
    } catch {
      // The per-feature fallback report is normally present. Ignore a report
      // that cannot be read so the summary can still be generated.
    }
  }

  await Promise.all([...new Set(tests.map(test => test.junitReportFile))].map(loadFeatureScreenshots));

  const logicalTests = [...Map.groupBy(tests, test => scenarioKey(test.featureName, test.name))].map(
    ([, scenarioAttempts]) => {
      const test = scenarioAttempts[0];
      const audit = retryAudit.get(scenarioKey(test.featureName, test.name));
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
      const linkedScreenshots = new Set();
      const renderTest = (test, tableType) => {
        const status = test.failed ? 'Failed' : 'Passed';
        const statusClass = test.failed ? 'failed' : 'passed';
        const audit = retryAudit.get(scenarioKey(test.featureName, test.name));
        const retried = audit?.attempts.some(attempt => attempt.attempt > 1);
        const showRuntime = hasRetryAudit && tableType !== 'retried';
        const showError = hasRetryAudit && tableType === 'failure';
        const runtime = retried ? audit?.successfulAttempt?.durationMs : audit?.latest.durationMs;
        const error = getAttemptError(audit?.latest);
        const hookFailure = getHookFailure(audit?.latest);
        const screenshots = featureScreenshots.get(path.dirname(test.junitReportFile)) || [];
        const nameMatchedScreenshots =
          test.name === test.featureName ? screenshots : scenarioScreenshotMatches(test, screenshots);
        const auditScreenshots = retried
          ? audit.attempts
              .filter(attempt => attempt.status === 'failed')
              .map(attempt => resolveScreenshot(test.junitReportFile, attempt.screenshotFile))
          : audit?.latest?.status === 'failed'
            ? [resolveScreenshot(test.junitReportFile, audit.latest.screenshotFile)]
            : [];
        const validAuditScreenshots = uniqueScreenshots(auditScreenshots);
        const matchedScreenshots = nameMatchedScreenshots.filter(file => !validAuditScreenshots.includes(file));
        const noRetryScreenshots = !hasRetryAudit && test.failed ? nameMatchedScreenshots : [];
        const summaryScreenshots =
          hasRetryAudit && !retried && audit?.latest?.status === 'failed'
            ? uniqueScreenshots([...validAuditScreenshots, ...matchedScreenshots])
            : [];
        const resultLink =
          hasRetryAudit && !retried && (audit?.latest?.status === 'passed' || audit?.latest?.status === 'failed')
            ? audit.latest.auditFile
            : null;
        const attemptRows = retried
          ? audit.attempts
              .map(attempt => {
                const attemptScreenshot =
                  attempt.status === 'failed' ? resolveScreenshot(test.junitReportFile, attempt.screenshotFile) : null;
                return (
                  `<tr><td class="attempt">${attempt.attempt}</td><td class="result ${getAttemptClass(attempt)}">${artifactLink(getAttemptStatus(attempt), attempt.auditFile)}</td>` +
                  `<td class="runtime">${formatRuntime(attempt.durationMs)}</td>` +
                  `<td class="error">${getHookFailure(attempt)}${screenshotSpan(attemptScreenshot, 'Screenshot', linkedScreenshots)}${xmlEscape(getAttemptError(attempt))}</td>` +
                  '</tr>'
                );
              })
              .join('')
          : '';
        const retriedTestScreenshots = retried ? matchedScreenshots : [];
        const attemptTable = `<table class="attempts"><thead><tr><th class="attempt">Attempt</th><th class="result">Result</th><th class="runtime">Runtime</th><th class="error">Error</th></tr></thead><tbody>${attemptRows}</tbody></table>`;
        return {
          row:
            `<tr><td class="${statusClass}">${artifactLink(status, resultLink)}</td>` +
            (showRuntime ? `<td class="runtime">${runtime === undefined ? '' : formatRuntime(runtime)}</td>` : '') +
            `<td class="${statusClass}${!showError ? ' noerror' : ''}">${artifactLink(xmlEscape(test.name), test.junitReportFile)}${
              !hasRetryAudit
                ? testScreenshotSpans(noRetryScreenshots, linkedScreenshots)
                : retriedTestScreenshots.length
                  ? testScreenshotSpans(retriedTestScreenshots, linkedScreenshots)
                  : ''
            }</td>` +
            (showError
              ? `<td class="error">${hookFailure}${testScreenshotSpans(summaryScreenshots, linkedScreenshots)}${xmlEscape(error)}</td>`
              : '') +
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
        const audit = retryAudit.get(scenarioKey(test.featureName, test.name));
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
      const featureDirectory = path.dirname(featureTests[0].junitReportFile);
      const unmatchedScreenshots = (featureScreenshots.get(featureDirectory) || []).filter(
        screenshot => !linkedScreenshots.has(screenshot)
      );
      const unmatchedScreenshotSection = unmatchedScreenshots.length
        ? `<div class="unmatchedScreenshots"><h4>Unmatched Screenshots:</h4>${numberedScreenshotSpans(unmatchedScreenshots)}</div>`
        : '';
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
        unmatchedScreenshotSection +
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
<style>.artifact-link{color:inherit}.artifact-link:visited{font-weight:bold}</style>
<style>table{border-collapse:collapse;width:100%;margin-bottom:0.5rem}thead > tr:first-child{border-bottom:1px solid var(--muted-border)}th,td{border:none;border-right:1px solid var(--muted-border);min-width:max-content;padding:.5rem .75rem;text-align:left}th:first-child:not(.attempt),td:first-child:not(.attempt){padding-left:0;}th.attempt,td.attempt,th.result,td.result,th.runtime,td.runtime{text-align:center;}td.noerror > span.failed{margin-left: .25rem;}td.empty{min-width:1%;padding:0;border-right:none}th:last-child,td:last-child{width:100%;min-width:initial;padding-right:0;border-right:none}</style>
<style>.passed{color:var(--passed)}.failed{color:var(--failed)}.featureTitle{display:inline-block;margin-top:2.75rem;margin-bottom:.75rem;margin-right:.25rem}.featureTitle:first-of-type{margin-top:0}.featureSummary{font-size:1.1rem;display:inline-block}.totalSummary{font-size:1.1rem}hr{margin-top:1.3575rem;margin-bottom:1.3575rem;border:0 transparent;border-top:1px solid var(--muted-border)}</style>
<style>.unmatchedScreenshots{ margin-bottom: .75rem;}.unmatchedScreenshots > h4{ display: inline-block; margin: .25rem .25rem 0 0}</style>
<style>#themeToggle{position:absolute;top:1rem;right:1rem;z-index:1;border:1px solid var(--muted-border);border-radius:.35rem;background:var(--background);color:var(--foreground);cursor:pointer;font:inherit;width:2.5rem;height:2.5rem;padding:0;font-size:0}#themeToggle:focus-visible{outline:2px solid var(--foreground);outline-offset:2px}</style>
<style>#themeToggle::before{font-size:1.5rem;content:'☾'}:root[data-theme="dark"] #themeToggle::before{content:'☀'}@media(prefers-color-scheme:dark){:root:not([data-theme]) #themeToggle::before{content:'☀'}}</style>
</head><body><button id="themeToggle" type="button" aria-label="Switch to dark theme"></button><h1>Functional test report</h1>
<div class="totalSummary">${logicalTests.length} tests: <span${logicalTests.length - failedCount > 0 ? ' class="passed"' : ''}>${logicalTests.length - failedCount} passed</span>, <span${failedCount > 0 ? ' class="failed"' : ''}>${failedCount} failed.</span></div><hr>
${featureTables}<script>const root=document.documentElement;const button=document.getElementById('themeToggle');const getSystemTheme=()=>window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';const getStoredTheme=()=>{try{return localStorage.getItem('functional-report-theme')}catch{return null}};const storeTheme=theme=>{try{localStorage.setItem('functional-report-theme',theme)}catch{}};const applyTheme=theme=>{if(theme==='system'){root.removeAttribute('data-theme')}else{root.dataset.theme=theme}const isDark=(theme==='system'?getSystemTheme():theme)==='dark';button.textContent=isDark?'☀ Light':'☾ Dark';button.setAttribute('aria-label',isDark?'Switch to light theme':'Switch to dark theme')};const storedTheme=getStoredTheme();applyTheme(storedTheme==='light'||storedTheme==='dark'?storedTheme:'system');button.addEventListener('click',()=>{const currentTheme=root.dataset.theme||getSystemTheme();const theme=currentTheme==='dark'?'light':'dark';applyTheme(theme);storeTheme(theme)});</script></body></html>\n`;
  await writeFile(outputFile, html);
};
