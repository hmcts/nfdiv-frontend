import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { createHtmlReport } from '../html-report.mjs';
import { loadRetryAudit, scenarioKey } from '../report-utils.mjs';

const renderBackgroundHistory = async (context, scenarioAttempts, backgroundAttempts) => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'nfdiv-background-html-'));
  context.after(() => rm(directory, { recursive: true, force: true }));
  const reportFile = path.join(directory, 'feature.xml');
  const outputFile = path.join(directory, 'report.html');
  await writeFile(
    reportFile,
    '<testsuites><testsuite name="Feature"><testcase name="Scenario"/></testsuite></testsuites>'
  );
  const attempts = scenarioAttempts.map(attempt => ({
    durationMs: 10000,
    error: attempt.status === 'failed' ? { message: 'Scenario failed' } : null,
    ...attempt,
    auditFile: path.join(directory, `scenario-${attempt.attempt}.json`),
  }));
  const hooks = backgroundAttempts.map(hook => ({
    durationMs: 100,
    hookName: 'Before',
    ...hook,
    auditFile: path.join(directory, `background-${hook.scenarioAttempt}-${hook.hookAttempt}.json`),
  }));
  for (const attempt of [...attempts, ...hooks]) {
    await writeFile(attempt.auditFile, JSON.stringify(attempt));
    if (attempt.screenshotFile) {
      await writeFile(path.join(directory, attempt.screenshotFile), 'png');
    }
  }
  const audit = new Map([
    [scenarioKey('Feature', 'Scenario'), { attempts, latest: attempts.at(-1), hookAttempts: hooks }],
  ]);
  await createHtmlReport([reportFile], audit, outputFile);
  return readFile(outputFile, 'utf8');
};

const assertAttemptTablesShareCell = (html, count) => {
  const tables = html.split('<table class="attempts">').slice(1);
  assert.equal(tables.length, count);
  assert.equal((html.match(/<td colspan="3"><table class="attempts">/g) || []).length, 1);
  assert.equal((html.match(/<\/tbody><\/table><table class="attempts">/g) || []).length, count - 1);
  assert.equal((html.match(/<table><thead>/g) || []).length, 1);
  assert.doesNotMatch(html, /<tbody><\/tbody>/);
  for (const table of tables) {
    assert.match(table, /^<thead><tr><th class="attempt">Attempt<\/th>/);
  }
  return tables;
};

const assertAttemptErrorVisibility = (table, hidden) => {
  const header = table.match(/^<thead>(.*?)<\/thead>/s)?.[1];
  const body = table.replace(/<table class="hook-attempts">.*?<\/table>/gs, '').match(/<tbody>(.*?)<\/tbody>/s)?.[1];
  const rows = [...(body || '').matchAll(/<tr><td class="attempt">.*?<\/tr>/gs)].map(match => match[0]);
  assert.ok(header && rows.length);
  assert.equal((header.match(/<th\b/g) || []).length, 4);
  assert.match(header, hidden ? /<th class="error hidden">Error<\/th>/ : /<th class="error">Error<\/th>/);
  for (const row of rows) {
    assert.equal((row.match(/<td\b/g) || []).length, 4);
    assert.match(row, hidden ? /<td class="error hidden"><\/td>/ : /<td class="error">/);
  }
};

const assertHookFailureLink = (html, file, label, count = 1) => {
  const spans = [...html.matchAll(/<span class="failed">\((.*?)\)<\/span>/g)]
    .map(match => match[1])
    .filter(content => content.includes(label));
  const link = `<a class="artifact-link" href="${file}" title="${file}" target="_blank" rel="noopener">${label}</a>`;
  assert.deepEqual(spans, Array(count).fill(link));
};

const assertSummaryResultLink = (html, file, status) => {
  const cell = `<td class="${status.toLowerCase()}"><a class="artifact-link" href="${file}" title="${file}" target="_blank" rel="noopener">${status}</a></td>`;
  assert.ok(html.includes(cell));
};

test('hides both attempt tables for a first-attempt pass without Background retries', async context => {
  const html = await renderBackgroundHistory(
    context,
    [{ attempt: 1, status: 'passed' }],
    [{ scenarioAttempt: 1, hookAttempt: 1, status: 'passed' }]
  );
  assert.doesNotMatch(html, /<table class="(?:attempts|hook-attempts)"/);
  assert.match(html, /href="scenario-1\.json"[^>]*>Passed<\/a>/);
  assertSummaryResultLink(html, 'scenario-1.json', 'Passed');
});

test('hides both attempt tables for a first-attempt failure while preserving its summary details', async context => {
  const html = await renderBackgroundHistory(
    context,
    [{ attempt: 1, status: 'failed', hookName: 'Before', screenshotFile: 'failure.png' }],
    [{ scenarioAttempt: 1, hookAttempt: 1, status: 'failed', durationMs: 8577, screenshotFile: 'failure.png' }]
  );
  assert.doesNotMatch(html, /<table class="(?:attempts|hook-attempts)"/);
  assertHookFailureLink(html, 'background-1-1.json', 'Hook failure: Before in 8.577s');
  assert.match(html, /<td class="runtime">10\.000s<\/td>/);
  assert.match(html, /Scenario failed/);
  assert.match(html, /href="scenario-1\.json"[^>]*>Failed<\/a>/);
  assertSummaryResultLink(html, 'scenario-1.json', 'Failed');
  assert.match(html, /href="failure\.png"[^>]*>Screenshot<\/a>/);
  assert.equal((html.match(/href="failure\.png"/g) || []).length, 1);
});

test('shows every Background retry when it recovers on the first scenario attempt', async context => {
  const html = await renderBackgroundHistory(
    context,
    [{ attempt: 1, status: 'passed' }],
    [
      {
        scenarioAttempt: 1,
        hookAttempt: 1,
        status: 'failed',
        error: { message: 'Recovered failure' },
        screenshotFile: 'background.png',
      },
      { scenarioAttempt: 1, hookAttempt: 2, status: 'passed' },
    ]
  );
  assert.match(html, /<table class="attempts"/);
  assert.match(html, /<th class="attempt">Before Hook Attempt<\/th>/);
  assert.match(html, /href="background-1-1\.json"[^>]*>Failed<\/a>/);
  assert.match(html, /href="background-1-2\.json"[^>]*>Passed<\/a>/);
  assert.match(html, /href="background\.png"[^>]*>Screenshot<\/a>/);
  assert.doesNotMatch(html, /Hook failure:/);
  assert.match(html, /1 passed/);
  assertSummaryResultLink(html, 'scenario-1.json', 'Passed');
  const [table] = assertAttemptTablesShareCell(html, 1);
  assertAttemptErrorVisibility(table, true);
  assert.match(table, /<td colspan="3"><table class="hook-attempts">/);
  assert.match(table, /<table class="hook-attempts"><thead><tr>.*?<th class="error">Error<\/th>/);
  assert.match(table, /<td class="error">.*?Recovered failure<\/td>/);
  assert.match(table, /Recovered failure/);
});

test('splits after a Background table before a passed scenario attempt within the same cell', async context => {
  const html = await renderBackgroundHistory(
    context,
    [
      { attempt: 1, status: 'failed', hookName: 'Before' },
      { attempt: 2, status: 'passed' },
    ],
    [
      { scenarioAttempt: 1, hookAttempt: 1, status: 'failed' },
      { scenarioAttempt: 1, hookAttempt: 2, status: 'failed' },
      { scenarioAttempt: 2, hookAttempt: 1, status: 'passed' },
    ]
  );
  const [first, second] = assertAttemptTablesShareCell(html, 2);
  assert.match(first, /href="scenario-1\.json"[^>]*>Failed<\/a>/);
  assert.match(first, /<table class="hook-attempts"/);
  assert.doesNotMatch(first, /scenario-2\.json/);
  assert.match(second, /href="scenario-2\.json"[^>]*>Passed<\/a>/);
  assert.doesNotMatch(second, /<table class="hook-attempts"/);
  assert.match(html, /1 passed/);
  assertAttemptErrorVisibility(first, false);
  assertAttemptErrorVisibility(second, true);
  assertSummaryResultLink(html, 'scenario-2.json', 'Passed');
});

test('groups attempts until Background history closes the group', async context => {
  const html = await renderBackgroundHistory(
    context,
    [
      { attempt: 1, status: 'failed' },
      { attempt: 2, status: 'failed', hookName: 'Before' },
      { attempt: 3, status: 'failed' },
      { attempt: 4, status: 'passed' },
    ],
    [
      { scenarioAttempt: 1, hookAttempt: 1, status: 'passed' },
      { scenarioAttempt: 2, hookAttempt: 1, status: 'failed', screenshotFile: 'background.png' },
      { scenarioAttempt: 2, hookAttempt: 2, status: 'failed' },
      { scenarioAttempt: 3, hookAttempt: 1, status: 'passed' },
      { scenarioAttempt: 4, hookAttempt: 1, status: 'passed' },
    ]
  );
  const [first, second] = assertAttemptTablesShareCell(html, 2);
  assert.match(first, /scenario-1\.json[\s\S]*scenario-2\.json[\s\S]*<table class="hook-attempts"/);
  assert.match(first, /href="background\.png"[^>]*>Screenshot<\/a>/);
  assert.doesNotMatch(first, /scenario-[34]\.json/);
  assert.match(second, /scenario-3\.json[\s\S]*scenario-4\.json/);
  assert.doesNotMatch(second, /<table class="hook-attempts"/);
  assertAttemptErrorVisibility(first, false);
  assertAttemptErrorVisibility(second, false);
});

test('keeps mixed results in one attempt table with visible Error cells for every row', async context => {
  const html = await renderBackgroundHistory(
    context,
    [
      { attempt: 1, status: 'passed' },
      { attempt: 2, status: 'failed' },
      { attempt: 3, status: 'failed' },
      { attempt: 4, status: 'passed' },
      { attempt: 5, status: 'passed' },
      { attempt: 6, status: 'failed' },
    ],
    []
  );
  const [table] = assertAttemptTablesShareCell(html, 1);
  assertAttemptErrorVisibility(table, false);
  assert.match(
    table,
    /scenario-1\.json[\s\S]*scenario-2\.json[\s\S]*scenario-3\.json[\s\S]*scenario-4\.json[\s\S]*scenario-5\.json[\s\S]*scenario-6\.json/
  );
  assert.doesNotMatch(table, /class="error hidden"/);
  assertSummaryResultLink(html, 'scenario-6.json', 'Failed');
});

test('hides every Error cell when all scenario attempts in the table pass', async context => {
  const html = await renderBackgroundHistory(
    context,
    [
      { attempt: 1, status: 'passed' },
      { attempt: 2, status: 'passed' },
      { attempt: 3, status: 'passed' },
    ],
    []
  );
  const [table] = assertAttemptTablesShareCell(html, 1);
  assertAttemptErrorVisibility(table, true);
  assert.equal((table.match(/<td class="error hidden"><\/td>/g) || []).length, 3);
});

for (const statuses of [
  ['failed', 'passed', 'passed', 'passed'],
  ['passed', 'passed', 'failed', 'passed'],
]) {
  test(`determines Error visibility separately after a Background table (${statuses.join(', ')})`, async context => {
    const html = await renderBackgroundHistory(
      context,
      statuses.map((status, index) => ({ attempt: index + 1, status })),
      [
        { scenarioAttempt: 2, hookAttempt: 1, status: 'failed', error: { message: 'Recovered Background failure' } },
        { scenarioAttempt: 2, hookAttempt: 2, status: 'passed' },
      ]
    );
    const [first, second] = assertAttemptTablesShareCell(html, 2);
    assertAttemptErrorVisibility(
      first,
      statuses.slice(0, 2).every(status => status === 'passed')
    );
    assertAttemptErrorVisibility(
      second,
      statuses.slice(2).every(status => status === 'passed')
    );
    assert.match(first, /scenario-1\.json[\s\S]*scenario-2\.json[\s\S]*<table class="hook-attempts"/);
    assert.doesNotMatch(first, /scenario-[34]\.json/);
    assert.match(second, /scenario-3\.json[\s\S]*scenario-4\.json/);
    assert.doesNotMatch(second, /<table class="hook-attempts"/);
    assert.match(first, /<table class="hook-attempts"><thead><tr>.*?<th class="error">Error<\/th>/);
    assert.match(first, /<td class="error">Recovered Background failure<\/td>/);
  });
}

test('keeps Error cells visible when passed attempts share a table with a skipped attempt', async context => {
  const html = await renderBackgroundHistory(
    context,
    [
      { attempt: 1, status: 'passed' },
      { attempt: 2, status: 'skipped' },
    ],
    []
  );
  const [table] = assertAttemptTablesShareCell(html, 1);
  assertAttemptErrorVisibility(table, false);
  assert.match(
    table,
    /scenario-2\.json[^>]*>Skipped<\/a><\/td><td class="runtime">10\.000s<\/td><td class="error"><\/td>/
  );
});

test('splits consecutive Background tables without creating an empty final attempt table', async context => {
  const html = await renderBackgroundHistory(
    context,
    [
      { attempt: 1, status: 'failed', hookName: 'Before' },
      { attempt: 2, status: 'failed', hookName: 'Before' },
    ],
    [
      { scenarioAttempt: 1, hookAttempt: 1, status: 'failed' },
      { scenarioAttempt: 1, hookAttempt: 2, status: 'failed' },
      { scenarioAttempt: 2, hookAttempt: 1, status: 'failed' },
      { scenarioAttempt: 2, hookAttempt: 2, status: 'failed' },
    ]
  );
  const [first, second] = assertAttemptTablesShareCell(html, 2);
  assert.match(first, /scenario-1\.json[\s\S]*background-1-1\.json[\s\S]*background-1-2\.json/);
  assert.doesNotMatch(first, /scenario-2\.json/);
  assert.match(second, /scenario-2\.json[\s\S]*background-2-1\.json[\s\S]*background-2-2\.json/);
  assert.equal((html.match(/<table class="hook-attempts"/g) || []).length, 2);
});

test('links both timed failure labels to the final Background attempt even when the records are unordered', async context => {
  const html = await renderBackgroundHistory(
    context,
    [{ attempt: 1, status: 'failed', hookName: 'Before' }],
    [
      { scenarioAttempt: 1, hookAttempt: 2, status: 'failed', durationMs: 900 },
      { scenarioAttempt: 1, hookAttempt: 1, status: 'failed', durationMs: 600 },
    ]
  );
  assertHookFailureLink(html, 'background-1-2.json', 'Hook failure: Before in 1.500s', 2);
  assertSummaryResultLink(html, 'scenario-1.json', 'Failed');
  assert.match(html, /<table class="hook-attempts"/);
  assert.match(html, /<td class="runtime">10\.000s<\/td>/);
  assertAttemptTablesShareCell(html, 1);
});

test('keeps Background visibility and failure totals separate for each scenario attempt', async context => {
  const html = await renderBackgroundHistory(
    context,
    [
      { attempt: 1, status: 'failed', hookName: 'Before' },
      { attempt: 2, status: 'failed', hookName: 'Before' },
    ],
    [
      { scenarioAttempt: 1, hookAttempt: 1, status: 'failed', durationMs: 100 },
      { scenarioAttempt: 1, hookAttempt: 2, status: 'failed', durationMs: 200 },
      { scenarioAttempt: 2, hookAttempt: 1, status: 'failed', durationMs: 500 },
    ]
  );
  assert.equal((html.match(/<table class="hook-attempts"/g) || []).length, 1);
  assertHookFailureLink(html, 'background-1-2.json', 'Hook failure: Before in 300ms');
  assertHookFailureLink(html, 'background-2-1.json', 'Hook failure: Before in 500ms', 2);
  assert.doesNotMatch(html, /href="background-2-1\.json"[^>]*>Failed<\/a>/);
  assertSummaryResultLink(html, 'scenario-2.json', 'Failed');
  assertAttemptTablesShareCell(html, 2);
});

test('keeps successful scenario retries without showing unretried Backgrounds', async context => {
  const html = await renderBackgroundHistory(
    context,
    [
      { attempt: 1, status: 'failed', hookName: 'Before' },
      { attempt: 2, status: 'passed' },
    ],
    [
      { scenarioAttempt: 1, hookAttempt: 1, status: 'failed', durationMs: 500 },
      { scenarioAttempt: 2, hookAttempt: 1, status: 'passed' },
    ]
  );
  assert.match(html, /<table class="attempts"/);
  assert.doesNotMatch(html, /<table class="hook-attempts"/);
  assert.match(html, /href="scenario-1\.json"[^>]*>Failed<\/a>/);
  assert.match(html, /href="scenario-2\.json"[^>]*>Passed<\/a>/);
  assertHookFailureLink(html, 'background-1-1.json', 'Hook failure: Before in 500ms');
  assert.match(html, /1 passed/);
  const [table] = assertAttemptTablesShareCell(html, 1);
  assertAttemptErrorVisibility(table, false);
});

test('includes zero milliseconds as a valid failed Background runtime', async context => {
  const html = await renderBackgroundHistory(
    context,
    [{ attempt: 1, status: 'failed', hookName: 'Before' }],
    [{ scenarioAttempt: 1, hookAttempt: 1, status: 'failed', durationMs: 0 }]
  );
  assertHookFailureLink(html, 'background-1-1.json', 'Hook failure: Before in 0ms');
});

for (const durationMs of [undefined, null, -1, NaN, Infinity, '200']) {
  test(`omits the hook total when the final Background runtime is invalid (${durationMs})`, async context => {
    const html = await renderBackgroundHistory(
      context,
      [{ attempt: 1, status: 'failed', hookName: 'Before' }],
      [{ scenarioAttempt: 1, hookAttempt: 1, status: 'failed', durationMs }]
    );
    assert.equal((html.match(/\(Hook failure: Before\)/g) || []).length, 1);
    assert.doesNotMatch(html, /Hook failure: Before in /);
  });
}

test('omits the hook total when an earlier Background runtime is missing', async context => {
  const html = await renderBackgroundHistory(
    context,
    [{ attempt: 1, status: 'failed', hookName: 'Before' }],
    [
      { scenarioAttempt: 1, hookAttempt: 1, status: 'failed', durationMs: undefined },
      { scenarioAttempt: 1, hookAttempt: 2, status: 'failed', durationMs: 500 },
    ]
  );
  assert.equal((html.match(/\(Hook failure: Before\)/g) || []).length, 2);
  assert.doesNotMatch(html, /Hook failure: Before in /);
});

for (const finalHook of [
  { status: 'passed', hookName: 'Before' },
  { status: 'failed', hookName: 'After' },
]) {
  test(`does not time a Before failure using an unrelated final hook (${finalHook.status}, ${finalHook.hookName})`, async context => {
    const html = await renderBackgroundHistory(
      context,
      [{ attempt: 1, status: 'failed', hookName: 'Before' }],
      [
        { scenarioAttempt: 1, hookAttempt: 1, status: 'failed', durationMs: 300 },
        { scenarioAttempt: 1, hookAttempt: 2, durationMs: 500, ...finalHook },
      ]
    );
    assert.equal((html.match(/\(Hook failure: Before\)/g) || []).length, 2);
    assert.doesNotMatch(html, /Hook failure: Before in /);
  });
}

test('renders retry-audit hook failures in the HTML report', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'nfdiv-html-report-'));
  try {
    const reportFile = path.join(directory, 'feature.xml');
    const auditDirectory = path.join(directory, 'retry-audit');
    const outputFile = path.join(directory, 'Functional test report.html');
    await mkdir(auditDirectory, { recursive: true });
    await writeFile(
      reportFile,
      '<?xml version="1.0" encoding="UTF-8"?><testsuites><testsuite name="Applicant 1 sole application" tests="1" failures="0"><testcase name="Happy path scenario"/></testsuite></testsuites>'
    );
    await writeFile(
      path.join(auditDirectory, 'attempt.json'),
      JSON.stringify({
        feature: 'Applicant 1 sole application',
        scenario: 'Happy path scenario',
        attempt: 1,
        status: 'failed',
        hookName: 'Before',
        durationMs: 1000,
        error: { message: 'The page was not ready' },
        screenshotFile: 'Happy_path_scenario.attempt_1.failed.png',
        recordedAt: '2026-01-01T00:00:00.000Z',
      })
    );
    await writeFile(path.join(directory, 'Happy_path_scenario.attempt_1.failed.png'), 'png');

    await createHtmlReport([reportFile], await loadRetryAudit(auditDirectory), outputFile);

    const html = await readFile(outputFile, 'utf8');
    assert.match(html, /1 failed/);
    assert.match(
      html,
      /<div class="featureResultsContainer"><div class="featureTitleContainer"><h3 class="featureStatus failed">✗<\/h3><h3 class="featureTitle"><a class="artifact-link" href="feature\.xml" title="feature\.xml" target="_blank" rel="noopener">Applicant 1 sole application<\/a><\/h3><div class="featureSummary">/
    );
    assert.match(html, /Hook failure: Before/);
    assert.doesNotMatch(html, /<table class="(?:attempts|hook-attempts)"/);
    assert.match(html, /The page was not ready/);
    assert.match(
      html,
      /<td class="error"><span class="failed">\(Hook failure: Before\)<\/span> <span class="failed">\(<a class="artifact-link" href="Happy_path_scenario\.attempt_1\.failed\.png" title="Happy_path_scenario\.attempt_1\.failed\.png" target="_blank" rel="noopener">Screenshot<\/a>\)/
    );
    assert.match(html, /<td class="failed">Happy path scenario<\/td>/);
    assert.match(
      html,
      /<a class="artifact-link" href="retry-audit\/attempt\.json" title="retry-audit\/attempt\.json" target="_blank" rel="noopener">Failed<\/a>/
    );
    assert.match(html, /\.artifact-link:visited\{font-weight:bold\}/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test('renders audit scenarios after a process failure without forcing a runtime onto that result', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'nfdiv-html-report-'));
  try {
    const reportFile = path.join(directory, 'feature.xml');
    const auditDirectory = path.join(directory, 'retry-audit');
    const outputFile = path.join(directory, 'Functional test report.html');
    await mkdir(auditDirectory, { recursive: true });
    await writeFile(
      reportFile,
      '<?xml version="1.0" encoding="UTF-8"?><testsuites><testsuite name="Feature" tests="2" failures="1"><testcase name="Feature [feature process]" processFailure="true"><failure message="Feature process exited with code 255"/></testcase><testcase name="Passed scenario"/></testsuite></testsuites>'
    );
    await writeFile(
      path.join(auditDirectory, 'passed.json'),
      JSON.stringify({
        feature: 'Feature',
        scenario: 'Passed scenario',
        attempt: 1,
        status: 'passed',
        durationMs: 1500,
        recordedAt: '2026-01-01T00:00:00.000Z',
      })
    );

    await createHtmlReport([reportFile], await loadRetryAudit(auditDirectory), outputFile);

    const html = await readFile(outputFile, 'utf8');
    const tables = [...html.matchAll(/<table><thead/g)].map(match => match.index);
    assert.equal(tables.length, 2);
    const firstTable = html.slice(tables[0], tables[1]);
    const secondTable = html.slice(tables[1]);
    assert.match(firstTable, /Feature \[feature process\]/);
    assert.doesNotMatch(firstTable, /<th class="runtime">Runtime<\/th>/);
    assert.match(secondTable, /<th class="runtime">Runtime<\/th>/);
    assert.match(secondTable, /1\.500s/);
    assert.match(html, /2 tests: <span class="passed">1 passed<\/span>, <span class="failed">1 failed<\/span>/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test('links the summary to the final scenario attempt and each retried attempt to its own audit file', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'nfdiv-html-report-'));
  try {
    const reportFile = path.join(directory, 'feature.xml');
    const auditDirectory = path.join(directory, 'retry-audit');
    const outputFile = path.join(directory, 'Functional test report.html');
    await mkdir(auditDirectory, { recursive: true });
    await writeFile(
      reportFile,
      '<?xml version="1.0" encoding="UTF-8"?><testsuites><testsuite name="Feature"><testcase name="Retried scenario"/></testsuite></testsuites>'
    );
    await writeFile(
      path.join(auditDirectory, 'first.json'),
      JSON.stringify({
        feature: 'Feature',
        scenario: 'Retried scenario',
        attempt: 1,
        status: 'failed',
        screenshotFile: 'Retried_scenario.attempt_1.failed.png',
        durationMs: 1000,
        recordedAt: '2026-01-01T00:00:00.000Z',
      })
    );
    await writeFile(path.join(directory, 'Retried_scenario.attempt_1.failed.png'), 'png');
    await writeFile(
      path.join(auditDirectory, 'second.json'),
      JSON.stringify({
        feature: 'Feature',
        scenario: 'Retried scenario',
        attempt: 2,
        status: 'passed',
        durationMs: 1000,
        recordedAt: '2026-01-01T00:00:01.000Z',
      })
    );

    await createHtmlReport([reportFile], await loadRetryAudit(auditDirectory), outputFile);

    const html = await readFile(outputFile, 'utf8');
    assert.match(
      html,
      /<div class="featureResultsContainer"><div class="featureTitleContainer"><h3 class="featureStatus passed">✓<\/h3><h3 class="featureTitle"><a class="artifact-link" href="feature\.xml" title="feature\.xml" target="_blank" rel="noopener">Feature<\/a><\/h3><div class="featureSummary">/
    );
    assert.match(html, /<th>Result<\/th><th class="runtime">Runtime<\/th><th>Test<\/th>/);
    assert.match(
      html,
      /<td class="passed"><a class="artifact-link" href="retry-audit\/second\.json" title="retry-audit\/second\.json" target="_blank" rel="noopener">Passed<\/a><\/td><td class="runtime">2\.000s<\/td><td class="passed noerror">Retried scenario<\/td>/
    );
    assertSummaryResultLink(html, 'retry-audit/second.json', 'Passed');
    assert.doesNotMatch(html, /<td class="passed">Passed<\/td>/);
    assert.match(
      html,
      /<td class="result failed"><a class="artifact-link" href="retry-audit\/first\.json" title="retry-audit\/first\.json" target="_blank" rel="noopener">Failed<\/a><\/td>/
    );
    assert.match(
      html,
      /<td class="result passed"><a class="artifact-link" href="retry-audit\/second\.json" title="retry-audit\/second\.json" target="_blank" rel="noopener">Passed<\/a><\/td>/
    );
    assert.match(
      html,
      /<td class="error"><span class="failed">\(<a class="artifact-link" href="Retried_scenario\.attempt_1\.failed\.png" title="Retried_scenario\.attempt_1\.failed\.png" target="_blank" rel="noopener">Screenshot<\/a>\)<\/span> <\/td>/
    );
    assert.match(html, /<td class="passed noerror">Retried scenario<\/td>/);
    assert.doesNotMatch(html, /<td class="failed"><span class="failed">/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test('links a failed screenshot from the Error column without retry-audit', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'nfdiv-html-report-'));
  try {
    const reportFile = path.join(directory, 'feature.xml');
    const outputFile = path.join(directory, 'Functional test report.html');
    await writeFile(
      reportFile,
      '<?xml version="1.0" encoding="UTF-8"?><testsuites><testsuite name="Feature"><testcase name="Failed scenario"><failure message="failed"/></testcase></testsuite></testsuites>'
    );
    await writeFile(path.join(directory, 'Failed_scenario.failed.png'), 'png');

    await createHtmlReport([reportFile], new Map(), outputFile);

    const html = await readFile(outputFile, 'utf8');
    assert.match(
      html,
      /<td class="failed">Failed scenario<\/td><td class="error"><span class="failed">\(<a class="artifact-link" href="Failed_scenario\.failed\.png" title="Failed_scenario\.failed\.png" target="_blank" rel="noopener">Screenshot<\/a>\)<\/span> failed<\/td>/
    );
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test('uses JUnit testcase timing when retry-audit is unavailable', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'nfdiv-html-report-'));
  try {
    const reportFile = path.join(directory, 'feature.xml');
    const outputFile = path.join(directory, 'Functional test report.html');
    await writeFile(
      reportFile,
      '<?xml version="1.0" encoding="UTF-8"?><testsuites><testsuite name="Feature"><testcase name="Timed scenario" time="1.250"/></testsuite></testsuites>'
    );

    await createHtmlReport([reportFile], new Map(), outputFile);

    const html = await readFile(outputFile, 'utf8');
    assert.match(html, /<th>Result<\/th><th class="runtime">Runtime<\/th><th>Test<\/th>/);
    assert.match(html, /<td class="runtime">1\.250s<\/td>/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test('uses JUnit timing and failure text when retry-audit data is incomplete', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'nfdiv-html-report-'));
  try {
    const reportFile = path.join(directory, 'feature.xml');
    const outputFile = path.join(directory, 'Functional test report.html');
    await writeFile(
      reportFile,
      '<?xml version="1.0" encoding="UTF-8"?><testsuites><testsuite name="Feature"><testcase name="Failed scenario" time="2.500"><failure message="JUnit fallback failure"/></testcase></testsuite></testsuites>'
    );
    const retryAudit = new Map([
      [
        scenarioKey('Feature', 'Failed scenario'),
        {
          attempts: [
            {
              status: 'failed',
              attempt: 1,
              durationMs: undefined,
              auditFile: path.join(directory, 'failed.json'),
            },
          ],
          latest: {
            status: 'failed',
            attempt: 1,
            durationMs: undefined,
            auditFile: path.join(directory, 'failed.json'),
          },
        },
      ],
    ]);

    await createHtmlReport([reportFile], retryAudit, outputFile);

    const html = await readFile(outputFile, 'utf8');
    assert.match(html, /<th>Result<\/th><th class="runtime">Runtime<\/th><th>Test<\/th><th class="error">Error<\/th>/);
    assert.match(html, /<td class="runtime">2\.500s<\/td>/);
    assert.match(html, /<td class="error">JUnit fallback failure<\/td>/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test('does not show a JUnit fallback error after a retried scenario passes', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'nfdiv-html-report-'));
  try {
    const reportFile = path.join(directory, 'feature.xml');
    const outputFile = path.join(directory, 'Functional test report.html');
    await writeFile(
      reportFile,
      '<?xml version="1.0" encoding="UTF-8"?><testsuites><testsuite name="Feature"><testcase name="Retried scenario"><failure message="stale JUnit failure"/></testcase></testsuite></testsuites>'
    );
    const retryAudit = new Map([
      [
        scenarioKey('Feature', 'Retried scenario'),
        {
          attempts: [
            { status: 'failed', attempt: 1, durationMs: 1000, auditFile: path.join(directory, 'first.json') },
            { status: 'passed', attempt: 2, durationMs: 1100, auditFile: path.join(directory, 'second.json') },
          ],
          latest: { status: 'passed', attempt: 2, durationMs: 1100, auditFile: path.join(directory, 'second.json') },
        },
      ],
    ]);

    await createHtmlReport([reportFile], retryAudit, outputFile);

    const html = await readFile(outputFile, 'utf8');
    assert.doesNotMatch(html, /stale JUnit failure/);
    assert.match(html, /<td class="passed noerror">Retried scenario<\/td>/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test('numbers every screenshot for a synthetic feature-level failure', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'nfdiv-html-report-'));
  try {
    const reportFile = path.join(directory, 'feature.xml');
    const outputFile = path.join(directory, 'Functional test report.html');
    await writeFile(
      reportFile,
      '<?xml version="1.0" encoding="UTF-8"?><testsuites><testsuite name="Feature"><testcase name="Feature"><failure message="failed"/></testcase></testsuite></testsuites>'
    );
    await writeFile(path.join(directory, 'second.failed.png'), 'png');
    await writeFile(path.join(directory, 'first.failed.png'), 'png');

    await createHtmlReport([reportFile], new Map(), outputFile);

    const html = await readFile(outputFile, 'utf8');
    assert.match(html, /first\.failed\.png[^>]+>Screenshot 1<\/a>\)/);
    assert.match(html, /second\.failed\.png[^>]+>Screenshot 2<\/a>\)/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test('does not number a single screenshot for a synthetic feature-level failure', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'nfdiv-html-report-'));
  try {
    const reportFile = path.join(directory, 'feature.xml');
    const outputFile = path.join(directory, 'Functional test report.html');
    await writeFile(
      reportFile,
      '<?xml version="1.0" encoding="UTF-8"?><testsuites><testsuite name="Feature"><testcase name="Feature"><failure message="failed"/></testcase></testsuite></testsuites>'
    );
    await writeFile(path.join(directory, 'only.failed.png'), 'png');

    await createHtmlReport([reportFile], new Map(), outputFile);

    const html = await readFile(outputFile, 'utf8');
    assert.match(html, /href="only\.failed\.png"[^>]+>Screenshot<\/a>\)/);
    assert.doesNotMatch(html, /href="only\.failed\.png"[^>]+>Screenshot 1<\/a>\)/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test('matches screenshots to explicit failed scenarios and exposes unmatched files without retry-audit', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'nfdiv-html-report-'));
  try {
    const reportFile = path.join(directory, 'feature.xml');
    const outputFile = path.join(directory, 'Functional test report.html');
    await writeFile(
      reportFile,
      '<?xml version="1.0" encoding="UTF-8"?><testsuites><testsuite name="Feature"><testcase name="First scenario"><failure message="failed"/></testcase><testcase name="Second scenario"><failure message="failed"/></testcase></testsuite></testsuites>'
    );
    await writeFile(path.join(directory, 'First_scenario_before_hook.failed.png'), 'png');
    await writeFile(path.join(directory, 'Second_scenario.failed.png'), 'png');
    await writeFile(path.join(directory, 'Unrelated.failed.png'), 'png');

    await createHtmlReport([reportFile], new Map(), outputFile);

    const html = await readFile(outputFile, 'utf8');
    assert.match(
      html,
      /First scenario<\/td><td class="error"><span class="failed">\(<a[^>]+First_scenario_before_hook\.failed\.png[^>]+>Screenshot<\/a>\)/
    );
    assert.match(
      html,
      /Second scenario<\/td><td class="error"><span class="failed">\(<a[^>]+Second_scenario\.failed\.png[^>]+>Screenshot<\/a>\)/
    );
    assert.match(html, /Unmatched Screenshots:/);
    assert.match(html, /href="Unrelated\.failed\.png"/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test('shows JUnit failure details without retry-audit', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'nfdiv-html-report-'));
  try {
    const reportFile = path.join(directory, 'feature.xml');
    const outputFile = path.join(directory, 'Functional test report.html');
    await writeFile(
      reportFile,
      '<?xml version="1.0" encoding="UTF-8"?><testsuites><testsuite name="Feature"><testcase name="Passed scenario"/><testcase name="Failed scenario"><failure message="failed"/></testcase></testsuite></testsuites>'
    );

    await createHtmlReport([reportFile], new Map(), outputFile);

    const html = await readFile(outputFile, 'utf8');
    assert.equal((html.match(/<table>/g) || []).length, 2);
    assert.match(html, /<th>Result<\/th><th>Test<\/th>/);
    assert.match(html, /<th>Result<\/th><th>Test<\/th><th class="error">Error<\/th>/);
    assert.match(html, /<td class="passed noerror">Passed scenario<\/td>/);
    assert.match(html, /<td class="failed">Failed scenario<\/td><td class="error">failed<\/td>/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test('splits retry-audit tables by result layout and after retried results', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'nfdiv-html-report-'));
  try {
    const reportFile = path.join(directory, 'feature.xml');
    const outputFile = path.join(directory, 'Functional test report.html');
    const scenarios = [
      ['First failed scenario', [{ attempt: 1, status: 'failed', durationMs: 700 }]],
      [
        'Retried scenario',
        [
          { attempt: 1, status: 'failed', durationMs: 900 },
          { attempt: 2, status: 'passed', durationMs: 1200 },
        ],
      ],
      ['Third passed scenario', [{ attempt: 1, status: 'passed', durationMs: 950 }]],
      ['Fourth passed scenario', [{ attempt: 1, status: 'passed', durationMs: 1100 }]],
      [
        'Fifth retried scenario',
        [
          { attempt: 1, status: 'failed', durationMs: 900 },
          { attempt: 2, status: 'failed', durationMs: 850 },
        ],
      ],
      ['Sixth passed scenario', [{ attempt: 1, status: 'passed', durationMs: 650 }]],
      ['Seventh passed scenario', [{ attempt: 1, status: 'passed', durationMs: 800 }]],
    ];
    const retryAudit = new Map(
      scenarios.map(([scenario, attempts]) => {
        const auditAttempts = attempts.map(attempt => ({
          ...attempt,
          auditFile: path.join(directory, `${scenario}-${attempt.attempt}.json`),
        }));
        return [
          scenarioKey('Feature', scenario),
          {
            attempts: auditAttempts,
            latest: auditAttempts.at(-1),
            successfulAttempt: auditAttempts.find(attempt => attempt.status === 'passed'),
          },
        ];
      })
    );
    const testCases = scenarios.map(([scenario]) => `<testcase name="${scenario}"/>`).join('');
    await writeFile(
      reportFile,
      `<?xml version="1.0" encoding="UTF-8"?><testsuites><testsuite name="Feature">${testCases}</testsuite></testsuites>`
    );

    await createHtmlReport([reportFile], retryAudit, outputFile);

    const html = await readFile(outputFile, 'utf8');
    const tableStarts = [...html.matchAll(/<table><thead/g)].map(match => match.index);
    assert.equal(tableStarts.length, 3);
    const tables = tableStarts.map((start, index) => html.slice(start, tableStarts[index + 1]));
    assert.match(tables[0], /First failed scenario/);
    assert.match(tables[0], /Retried scenario/);
    assert.match(tables[1], /Third passed scenario[\s\S]*Fourth passed scenario[\s\S]*Fifth retried scenario/);
    assert.match(tables[1], /<th>Result<\/th><th class="runtime">Runtime<\/th><th>Test<\/th>/);
    assert.match(tables[2], /Sixth passed scenario[\s\S]*Seventh passed scenario/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test('parses a self-closing testcase followed by a failed testcase with retry-audit', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'nfdiv-html-report-'));
  try {
    const reportFile = path.join(directory, 'feature.xml');
    const outputFile = path.join(directory, 'Functional test report.html');
    await writeFile(
      reportFile,
      '<?xml version="1.0" encoding="UTF-8"?><testsuites><testsuite name="Feature"><testcase name="Passed scenario" time="1.200" /><testcase name="Failed scenario" time="0.750"><failure message="failure"/></testcase></testsuite></testsuites>'
    );

    const retryAudit = new Map([
      [
        scenarioKey('Feature', 'Passed scenario'),
        {
          attempts: [
            { status: 'passed', durationMs: 1200, attempt: 1, auditFile: path.join(directory, 'passed.json') },
          ],
          latest: { status: 'passed', durationMs: 1200, attempt: 1, auditFile: path.join(directory, 'passed.json') },
        },
      ],
      [
        scenarioKey('Feature', 'Failed scenario'),
        {
          attempts: [{ status: 'failed', durationMs: 750, attempt: 1, auditFile: path.join(directory, 'failed.json') }],
          latest: {
            status: 'failed',
            durationMs: 750,
            attempt: 1,
            auditFile: path.join(directory, 'failed.json'),
            error: { message: 'failure' },
          },
        },
      ],
    ]);

    await createHtmlReport([reportFile], retryAudit, outputFile);

    const html = await readFile(outputFile, 'utf8');
    assert.match(html, /\(2 tests: <span class="passed">1 passed<\/span>, <span class="failed">1 failed<\/span>\)/);
    assert.match(html, /<td class="passed noerror">Passed scenario<\/td>/);
    assert.match(html, /<td class="failed">Failed scenario<\/td>/);
    assert.match(html, /failure/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test('matches a screenshot when retry-audit has no screenshot file', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'nfdiv-html-report-'));
  try {
    const reportFile = path.join(directory, 'feature.xml');
    const auditDirectory = path.join(directory, 'retry-audit');
    const outputFile = path.join(directory, 'Functional test report.html');
    await mkdir(auditDirectory, { recursive: true });
    await writeFile(
      reportFile,
      '<?xml version="1.0" encoding="UTF-8"?><testsuites><testsuite name="Feature"><testcase name="Failed scenario"><failure message="failed"/></testcase></testsuite></testsuites>'
    );
    await writeFile(
      path.join(auditDirectory, 'failed.json'),
      JSON.stringify({
        feature: 'Feature',
        scenario: 'Failed scenario',
        attempt: 1,
        status: 'failed',
        screenshotFile: null,
        durationMs: 1000,
        error: { message: 'failed' },
        recordedAt: '2026-01-01T00:00:00.000Z',
      })
    );
    await writeFile(path.join(directory, 'Failed_scenario.failed.png'), 'png');

    await createHtmlReport([reportFile], await loadRetryAudit(auditDirectory), outputFile);

    const html = await readFile(outputFile, 'utf8');
    assert.match(
      html,
      /<td class="error"><span class="failed">\(<a class="artifact-link" href="Failed_scenario\.failed\.png" title="Failed_scenario\.failed\.png" target="_blank" rel="noopener">Screenshot<\/a>\)<\/span>/
    );
    assert.doesNotMatch(html, /Unmatched Screenshots:/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test('matches a screenshot when retry-audit points to a missing file', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'nfdiv-html-report-'));
  try {
    const reportFile = path.join(directory, 'feature.xml');
    const auditDirectory = path.join(directory, 'retry-audit');
    const outputFile = path.join(directory, 'Functional test report.html');
    await mkdir(auditDirectory, { recursive: true });
    await writeFile(
      reportFile,
      '<?xml version="1.0" encoding="UTF-8"?><testsuites><testsuite name="Feature"><testcase name="Failed scenario"><failure message="failed"/></testcase></testsuite></testsuites>'
    );
    await writeFile(
      path.join(auditDirectory, 'failed.json'),
      JSON.stringify({
        feature: 'Feature',
        scenario: 'Failed scenario',
        attempt: 1,
        status: 'failed',
        screenshotFile: 'Failed_scenario.failed.png',
        durationMs: 1000,
        error: { message: 'failed' },
        recordedAt: '2026-01-01T00:00:00.000Z',
      })
    );
    await writeFile(path.join(directory, 'Failed_scenario_before_hook.failed.png'), 'png');

    await createHtmlReport([reportFile], await loadRetryAudit(auditDirectory), outputFile);

    const html = await readFile(outputFile, 'utf8');
    assert.match(html, /href="Failed_scenario_before_hook\.failed\.png"[^>]+>Screenshot<\/a>/);
    assert.doesNotMatch(html, /Unmatched Screenshots:/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test('shows the audit screenshot and other matching screenshots together in Error', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'nfdiv-html-report-'));
  try {
    const reportFile = path.join(directory, 'feature.xml');
    const auditDirectory = path.join(directory, 'retry-audit');
    const outputFile = path.join(directory, 'Functional test report.html');
    await mkdir(auditDirectory, { recursive: true });
    await writeFile(
      reportFile,
      '<?xml version="1.0" encoding="UTF-8"?><testsuites><testsuite name="Feature"><testcase name="Failed scenario"><failure message="failed"/></testcase></testsuite></testsuites>'
    );
    await writeFile(
      path.join(auditDirectory, 'failed.json'),
      JSON.stringify({
        feature: 'Feature',
        scenario: 'Failed scenario',
        attempt: 1,
        status: 'failed',
        screenshotFile: 'Failed_scenario.attempt_1.failed.png',
        durationMs: 1000,
        error: { message: 'failed' },
        recordedAt: '2026-01-01T00:00:00.000Z',
      })
    );
    await writeFile(path.join(directory, 'Failed_scenario.attempt_1.failed.png'), 'png');
    await writeFile(path.join(directory, 'Failed_scenario_before_hook.failed.png'), 'png');

    await createHtmlReport([reportFile], await loadRetryAudit(auditDirectory), outputFile);

    const html = await readFile(outputFile, 'utf8');
    const errorCell = html.slice(html.indexOf('<td class="error">'));
    assert.match(errorCell, /Failed_scenario\.attempt_1\.failed\.png[^>]+>Screenshot 1<\/a>/);
    assert.match(errorCell, /Failed_scenario_before_hook\.failed\.png[^>]+>Screenshot 2<\/a>/);
    assert.doesNotMatch(html, /Unmatched Screenshots:/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test('matches additional screenshots for retried scenarios in the Test column', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'nfdiv-html-report-'));
  try {
    const reportFile = path.join(directory, 'feature.xml');
    const auditDirectory = path.join(directory, 'retry-audit');
    const outputFile = path.join(directory, 'Functional test report.html');
    await mkdir(auditDirectory, { recursive: true });
    await writeFile(
      reportFile,
      '<?xml version="1.0" encoding="UTF-8"?><testsuites><testsuite name="Feature"><testcase name="Retried scenario"/></testsuite></testsuites>'
    );
    await writeFile(
      path.join(auditDirectory, 'first.json'),
      JSON.stringify({
        feature: 'Feature',
        scenario: 'Retried scenario',
        attempt: 1,
        status: 'failed',
        screenshotFile: null,
        durationMs: 1000,
        error: { message: 'failed' },
        recordedAt: '2026-01-01T00:00:00.000Z',
      })
    );
    await writeFile(
      path.join(auditDirectory, 'second.json'),
      JSON.stringify({
        feature: 'Feature',
        scenario: 'Retried scenario',
        attempt: 2,
        status: 'passed',
        screenshotFile: null,
        durationMs: 1000,
        recordedAt: '2026-01-01T00:00:01.000Z',
      })
    );
    await writeFile(path.join(directory, 'Retried_scenario.attempt_1.failed.png'), 'png');

    await createHtmlReport([reportFile], await loadRetryAudit(auditDirectory), outputFile);

    const html = await readFile(outputFile, 'utf8');
    assert.match(html, /<td class="error">failed<\/td>/);
    assert.match(
      html,
      /Retried scenario<span class="failed">\(<a[^>]+Retried_scenario\.attempt_1\.failed\.png[^>]+>Screenshot<\/a>\)/
    );
    assert.doesNotMatch(html, /Unmatched Screenshots:/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test('renders retry-audit screenshots left unmatched in the feature folder', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'nfdiv-html-report-'));
  try {
    const reportFile = path.join(directory, 'feature.xml');
    const auditDirectory = path.join(directory, 'retry-audit');
    const outputFile = path.join(directory, 'Functional test report.html');
    await mkdir(auditDirectory, { recursive: true });
    await writeFile(
      reportFile,
      '<?xml version="1.0" encoding="UTF-8"?><testsuites><testsuite name="Feature"><testcase name="Scenario"/></testsuite></testsuites>'
    );
    await writeFile(
      path.join(auditDirectory, 'attempt.json'),
      JSON.stringify({
        feature: 'Feature',
        scenario: 'Scenario',
        attempt: 1,
        status: 'passed',
        durationMs: 1000,
        recordedAt: '2026-01-01T00:00:00.000Z',
      })
    );
    await writeFile(path.join(directory, 'unmatched.png'), 'png');

    await createHtmlReport([reportFile], await loadRetryAudit(auditDirectory), outputFile);

    const html = await readFile(outputFile, 'utf8');
    const summaryEnd = html.indexOf('</div>', html.indexOf('<div class="featureSummary">'));
    const unmatchedStart = html.indexOf('<div class="unmatchedScreenshots">');
    const firstTable = html.indexOf('<table>');
    assert.ok(summaryEnd < unmatchedStart && unmatchedStart < firstTable);
    assert.match(
      html,
      /<div class="unmatchedScreenshots"><h4>Unmatched Screenshots:<\/h4><span class="failed">\(<a class="artifact-link" href="unmatched\.png" title="unmatched\.png" target="_blank" rel="noopener">Screenshot 1<\/a>\)<\/span> <\/div>/
    );
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test('does not repeat screenshots that are already linked without retry-audit', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'nfdiv-html-report-'));
  try {
    const reportFile = path.join(directory, 'feature.xml');
    const outputFile = path.join(directory, 'Functional test report.html');
    await writeFile(
      reportFile,
      '<?xml version="1.0" encoding="UTF-8"?><testsuites><testsuite name="Feature"><testcase name="Scenario"><failure message="failed"/></testcase></testsuite></testsuites>'
    );
    await writeFile(path.join(directory, 'Scenario.failed.png'), 'png');

    await createHtmlReport([reportFile], new Map(), outputFile);

    const html = await readFile(outputFile, 'utf8');
    assert.doesNotMatch(html, /Unmatched Screenshots:/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
