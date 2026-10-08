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

const getBackgroundAttempts = (audit, attempt) =>
  (audit?.hookAttempts || []).filter(hook => hook.scenarioAttempt === attempt?.attempt);

const hasRetries = audit =>
  audit?.attempts.some(attempt => attempt.attempt > 1) || audit?.hookAttempts?.some(attempt => attempt.hookAttempt > 1);

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
  const getHookFailure = (attempt, hooks) => {
    if (attempt?.status !== 'failed' || !attempt.hookName) {
      return '';
    }
    const finalHook = hooks.reduce(
      (final, hook) => (!final || hook.hookAttempt > final.hookAttempt ? hook : final),
      null
    );
    const hasRuntime =
      finalHook?.status === 'failed' &&
      finalHook.hookName === attempt.hookName &&
      hooks.every(hook => Number.isFinite(hook.durationMs) && hook.durationMs >= 0);
    const runtime = hasRuntime ? ` in ${formatRuntime(hooks.reduce((total, hook) => total + hook.durationMs, 0))}` : '';
    const label = `Hook failure: ${xmlEscape(attempt.hookName)}${runtime}`;
    return `<span class="failed">(${hasRuntime ? artifactLink(label, finalHook.auditFile) : label})</span> `;
  };

  for (const reportFile of reportFiles) {
    try {
      const report = await readFile(reportFile, 'utf8');
      const suiteName = attribute(report.match(/<testsuite\b([^>]*)>/)?.[1] || '', 'name');
      const testcasePattern = /<testcase\b([^>]*?)(?:\/>|>([\s\S]*?)<\/testcase>)/g;
      for (const match of report.matchAll(testcasePattern)) {
        const attributes = match[1];
        const body = match[2] || '';
        const junitTimeValue = attribute(attributes, 'time');
        const junitTime = junitTimeValue === '' ? undefined : Number(junitTimeValue);
        tests.push({
          featureName: xmlUnescape(suiteName),
          name: xmlUnescape(attribute(attributes, 'name')) || '(unnamed test)',
          failed: body.includes('<failure') || body.includes('<error'),
          processFailure: attributes.includes('processFailure="true"'),
          error: xmlUnescape(attribute(body.match(/<failure\b([^>]*)>/)?.[1] || '', 'message')),
          durationMs: Number.isFinite(junitTime) && junitTime >= 0 ? junitTime * 1000 : undefined,
          junitReportFile: reportFile,
        });
      }
    } catch {
      // The per-feature fallback report is normally present. Ignore a report
      // that cannot be read so the summary can still be generated.
    }
  }

  const reportFileByFeature = new Map(tests.map(test => [test.featureName, test.junitReportFile]));
  const testKeys = new Set(tests.map(test => scenarioKey(test.featureName, test.name)));
  for (const { latest: attempt } of retryAudit.values()) {
    if (!attempt?.feature || !attempt.scenario) {
      continue;
    }

    const key = scenarioKey(attempt.feature, attempt.scenario);
    if (testKeys.has(key)) {
      continue;
    }

    tests.push({
      featureName: attempt.feature,
      name: attempt.scenario,
      failed: attempt.status === 'failed',
      processFailure: false,
      error: '',
      durationMs: undefined,
      junitReportFile: reportFileByFeature.get(attempt.feature) || attempt.featureFile || outputFile,
    });
    testKeys.add(key);
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
      featureTests.sort((first, second) => Number(second.processFailure) - Number(first.processFailure));
      const linkedScreenshots = new Set();
      const getRuntime = test => {
        const audit = retryAudit.get(scenarioKey(test.featureName, test.name));
        const retried = hasRetries(audit);
        if (retried && audit.attempts.every(attempt => Number.isFinite(attempt.durationMs))) {
          return audit.attempts.reduce((total, attempt) => total + attempt.durationMs, 0);
        }
        if (Number.isFinite(audit?.latest?.durationMs)) {
          return audit.latest.durationMs;
        }
        return test.durationMs;
      };
      const getEffectiveError = test => {
        const audit = retryAudit.get(scenarioKey(test.featureName, test.name));
        return getAttemptError(audit?.latest) || test.error;
      };
      const getResultLayout = test => {
        return {
          hasRuntime: Number.isFinite(getRuntime(test)),
          hasError: test.failed && Boolean(getEffectiveError(test)),
        };
      };
      const renderTest = (test, tableType, layout) => {
        const status = test.failed ? 'Failed' : 'Passed';
        const statusClass = test.failed ? 'failed' : 'passed';
        const audit = retryAudit.get(scenarioKey(test.featureName, test.name));
        const retried = hasRetries(audit);
        const runtime = getRuntime(test);
        const showRuntime = layout.hasRuntime;
        const showError = layout.hasError;
        const error = getEffectiveError(test);
        const hookFailure = getHookFailure(audit?.latest, getBackgroundAttempts(audit, audit?.latest));
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
        const hookScreenshots = (audit?.hookAttempts || []).map(attempt =>
          resolveScreenshot(test.junitReportFile, attempt.screenshotFile)
        );
        const validAuditScreenshots = uniqueScreenshots([...auditScreenshots, ...hookScreenshots]);
        const matchedScreenshots = nameMatchedScreenshots.filter(file => !validAuditScreenshots.includes(file));
        const errorScreenshots = showError
          ? retried
            ? matchedScreenshots
            : uniqueScreenshots([...validAuditScreenshots, ...matchedScreenshots])
          : [];
        const testColumnScreenshots = showError
          ? []
          : retried || audit
            ? matchedScreenshots
            : test.failed
              ? nameMatchedScreenshots
              : [];
        const resultLink =
          hasRetryAudit &&
          !test.processFailure &&
          (audit?.latest?.status === 'passed' || audit?.latest?.status === 'failed')
            ? audit.latest.auditFile
            : null;
        const attemptTables = [];
        let attemptRows = [];
        const flushAttemptTable = () => {
          if (attemptRows.length) {
            const errorClass = attemptRows.every(row => row.passed) ? 'error hidden' : 'error';
            attemptTables.push(
              `<table class="attempts"><thead><tr><th class="attempt">Attempt</th><th class="result">Result</th><th class="runtime">Runtime</th><th class="${errorClass}">Error</th></tr></thead><tbody>${attemptRows.map(row => row.render(errorClass)).join('')}</tbody></table>`
            );
            attemptRows = [];
          }
        };
        for (const attempt of retried ? audit.attempts : []) {
          const attemptScreenshot =
            attempt.status === 'failed' ? resolveScreenshot(test.junitReportFile, attempt.screenshotFile) : null;
          const hooks = getBackgroundAttempts(audit, attempt);
          const visibleHooks = hooks.some(hook => hook.hookAttempt > 1) ? hooks : [];
          const hookRows = visibleHooks
            .map(hook => {
              const label = `${hook.hookAttempt}`;
              return (
                `<tr><td class="attempt">${label}</td><td class="result ${getAttemptClass(hook)}">${artifactLink(getAttemptStatus(hook), hook.auditFile)}</td>` +
                `<td class="runtime">${formatRuntime(hook.durationMs)}</td>` +
                `<td class="error">${screenshotSpan(resolveScreenshot(test.junitReportFile, hook.screenshotFile), 'Screenshot', linkedScreenshots)}${xmlEscape(getAttemptError(hook))}</td></tr>`
              );
            })
            .join('');
          const hookTable = visibleHooks.length
            ? `<tr><td class="empty"></td><td colspan="3"><table class="hook-attempts"><thead><tr><th class="attempt">Background Attempt</th><th class="result">Result</th><th class="runtime">Runtime</th><th class="error">Error</th></tr></thead><tbody>${hookRows}</tbody></table></td></tr>`
            : '';
          const attemptError = `${getHookFailure(attempt, hooks)}${screenshotSpan(attemptScreenshot, 'Screenshot', linkedScreenshots)}${xmlEscape(getAttemptError(attempt))}`;
          attemptRows.push({
            passed: attempt.status === 'passed',
            render: errorClass =>
              `<tr><td class="attempt">${attempt.attempt}</td><td class="result ${getAttemptClass(attempt)}">${artifactLink(getAttemptStatus(attempt), attempt.auditFile)}</td>` +
              `<td class="runtime">${formatRuntime(attempt.durationMs)}</td>` +
              `<td class="${errorClass}">${attemptError}</td>` +
              `</tr>${hookTable}`,
          });
          if (hookTable) {
            flushAttemptTable();
          }
        }
        flushAttemptTable();
        return {
          row:
            `<tr><td class="${statusClass}">${artifactLink(status, resultLink)}</td>` +
            (showRuntime ? `<td class="runtime">${runtime === undefined ? '' : formatRuntime(runtime)}</td>` : '') +
            `<td class="${statusClass}${!showError ? ' noerror' : ''}">${xmlEscape(test.name)}${
              testColumnScreenshots.length ? testScreenshotSpans(testColumnScreenshots, linkedScreenshots) : ''
            }</td>` +
            (showError
              ? `<td class="error">${hookFailure}${testScreenshotSpans(errorScreenshots, linkedScreenshots)}${xmlEscape(error)}</td>`
              : '') +
            '</tr>' +
            (retried ? `<tr><td class="empty"></td><td colspan="3">${attemptTables.join('')}</td></tr>` : ''),
        };
      };
      const tables = [];
      let rows = [];
      let tableType = null;
      let tableLayout = null;
      const flushTable = () => {
        if (rows.length > 0) {
          tables.push({ rows, tableType, hasRuntime: tableLayout.hasRuntime, hasError: tableLayout.hasError });
          rows = [];
          tableLayout = null;
        }
      };
      for (const test of featureTests) {
        const audit = retryAudit.get(scenarioKey(test.featureName, test.name));
        const retried = hasRetries(audit);
        const nextTableType = retried ? 'retried' : test.failed ? 'failure' : 'normal';
        const nextTableLayout = getResultLayout(test);
        const nextTableKey = `${nextTableLayout.hasRuntime}:${nextTableLayout.hasError}`;
        const currentTableKey = tableLayout && `${tableLayout.hasRuntime}:${tableLayout.hasError}`;
        if (rows.length > 0 && currentTableKey !== nextTableKey) {
          flushTable();
        }
        if (rows.length === 0) {
          tableType = nextTableType;
          tableLayout = nextTableLayout;
        }
        const renderedTest = renderTest(test, tableType, tableLayout);
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
            `<table><thead><tr><th>Result</th>${table.hasRuntime ? '<th class="runtime">Runtime</th>' : ''}<th>Test</th>${table.hasError ? '<th class="error">Error</th>' : ''}</tr></thead>` +
            `<tbody>${table.rows.join('\n')}</tbody></table>`
        )
        .join('\n');
      const featureFailedCount = featureTests.filter(test => test.failed).length;
      const featureSummary =
        `(${featureTests.length} test${featureTests.length > 1 ? 's' : ''}: <span${featureTests.length - featureFailedCount > 0 ? ' class="passed"' : ''}>${featureTests.length - featureFailedCount} passed</span>, ` +
        `<span${featureFailedCount > 0 ? ' class="failed"' : ''}>${featureFailedCount} failed</span>)`;
      const featureStatus =
        featureFailedCount > 0 ? '<h3 class="featureStatus failed">✗</h3>' : '<h3 class="featureStatus passed">✓</h3>';
      return (
        `<div class="featureResultsContainer"><div class="featureTitleContainer">${featureStatus}<h3 class="featureTitle">${artifactLink(xmlEscape(featureName), featureTests[0].junitReportFile)}</h3><div class="featureSummary">${featureSummary}</div></div>` +
        unmatchedScreenshotSection +
        `${renderedTables}</div>`
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
<style>table:last-of-type{margin-bottom: 0;}table{border-collapse:collapse;width:100%;margin-bottom:0.5rem}thead > tr > th{border-bottom:1px solid var(--muted-border)}th,td{border:none;border-right:1px solid var(--muted-border);min-width:max-content;padding:.5rem .75rem;text-align:left}th:first-child:not(.attempt),td:first-child:not(.attempt){padding-left:0;}th.attempt,td.attempt,th.result,td.result,th.runtime,td.runtime{text-align:center;}td.noerror > span.failed{margin-left: .25rem;}td.empty{min-width:1%;padding:0;border-right:none}th:has(+ th.hidden), td:has(+ td.hidden){border-right: none;}th.hidden{border-bottom: none; color: var(--background)}th:last-child,td:last-child{width:100%;min-width:initial;padding-right:0;border-right:none;}</style>
<style>.passed{color:var(--passed)}.failed{color:var(--failed)}.featureResultsContainer{padding-top: 2.5rem; padding-left: 1.42rem; padding-bottom: 2.5rem;}.featureTitleContainer{margin-left: -1.42rem; padding-bottom:1rem;}.featureTitle,.featureStatus{display:inline-block;margin-top:0;margin-bottom:0;}.featureTitle{margin-right:.75rem}.featureStatus{width: 1.17rem;font-size:1.17rem;margin-right:.25rem}.featureSummary{font-size:1.1rem;display:inline-block}.totalSummary{font-size:1.1rem}hr{margin: 0; margin-top:1.5rem;border:0 transparent;border-top:1px solid var(--muted-border)}</style>
<style>.unmatchedScreenshots{padding-bottom: 1rem;}.unmatchedScreenshots > h4{ display: inline-block; margin: 0 .5rem 0 0}</style>
<style>#themeToggle{position:absolute;top:1rem;right:1rem;z-index:1;border:1px solid var(--muted-border);border-radius:.35rem;background:var(--background);color:var(--foreground);cursor:pointer;font:inherit;width:2.5rem;height:2.5rem;padding:0;font-size:0}#themeToggle:focus-visible{outline:2px solid var(--foreground);outline-offset:2px}</style>
<style>#themeToggle::before{font-size:1.5rem;content:'☾'}:root[data-theme="dark"] #themeToggle::before{content:'☀'}@media(prefers-color-scheme:dark){:root:not([data-theme]) #themeToggle::before{content:'☀'}}</style>
</head><body><div class="titleContainer"><button id="themeToggle" type="button" aria-label="Switch to dark theme"></button><h1>Functional test report</h1>
<div class="totalSummary">${logicalTests.length} tests: <span${logicalTests.length - failedCount > 0 ? ' class="passed"' : ''}>${logicalTests.length - failedCount} passed</span>, <span${failedCount > 0 ? ' class="failed"' : ''}>${failedCount} failed.</span></div><hr></div>
${featureTables}<script>const root=document.documentElement;const button=document.getElementById('themeToggle');const getSystemTheme=()=>window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';const getStoredTheme=()=>{try{return localStorage.getItem('functional-report-theme')}catch{return null}};const storeTheme=theme=>{try{localStorage.setItem('functional-report-theme',theme)}catch{}};const applyTheme=theme=>{if(theme==='system'){root.removeAttribute('data-theme')}else{root.dataset.theme=theme}const isDark=(theme==='system'?getSystemTheme():theme)==='dark';button.textContent=isDark?'☀ Light':'☾ Dark';button.setAttribute('aria-label',isDark?'Switch to light theme':'Switch to dark theme')};const storedTheme=getStoredTheme();applyTheme(storedTheme==='light'||storedTheme==='dark'?storedTheme:'system');button.addEventListener('click',()=>{const currentTheme=root.dataset.theme||getSystemTheme();const theme=currentTheme==='dark'?'light':'dark';applyTheme(theme);storeTheme(theme)});</script></body></html>\n`;
  await writeFile(outputFile, html);
};
