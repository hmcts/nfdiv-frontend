import { spawn } from 'node:child_process';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { createHtmlReport } from './run-parallel/html-report.mjs';
import { createAggregateJunitReport, ensureJunitReport } from './run-parallel/junit-report.mjs';
import { featureReportDirectoryName, getRetryAuditScenarios, loadRetryAudit } from './run-parallel/report-utils.mjs';
import { createRetryAuditReport } from './run-parallel/retry-audit-report.mjs';

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

const reportsRoot = path.join(projectRoot, 'functional-output/functional/reports');
const retryAuditRoot = path.join(projectRoot, 'functional-output/functional/retry-audit');
const retryAuditReportFile = path.join(reportsRoot, 'retry-audit-result.xml');

const featureDescriptors = await Promise.all(
  features.map(async feature => {
    const source = await readFile(feature, 'utf8');
    const reportDirectoryName = featureReportDirectoryName(feature);
    return {
      file: feature,
      title: source.match(/^\s*Feature:\s*(.+)$/m)?.[1]?.trim() || path.basename(feature, '.feature'),
      reportDir: path.join(reportsRoot, reportDirectoryName),
      reportFile: path.join(reportsRoot, reportDirectoryName, 'result.xml'),
    };
  })
);

const findJunitReports = async directory => {
  try {
    const entries = await readdir(directory, { withFileTypes: true });
    const reports = await Promise.all(
      entries.map(entry => {
        const entryPath = path.join(directory, entry.name);
        return entry.isDirectory() ? findJunitReports(entryPath) : entry.name === 'result.xml' ? [entryPath] : [];
      })
    );
    return reports.flat();
  } catch {
    return [];
  }
};

let nextFeature = 0;
let failed = false;

const createLogFormatter = (workerIndex, featureTitle) => {
  let pending = '';

  const formatLine = line => `[Feature worker ${workerIndex}][${featureTitle}] ${line}`;

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
    const override = JSON.stringify({
      output: feature.reportDir,
      plugins: {
        junitReporter: {
          output: feature.reportDir,
          outputName: 'result.xml',
        },
      },
    });

    const args = ['run', feature.file, '--config', configFile, '--override', override];
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

    const formatter = createLogFormatter(workerIndex, feature.title);
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
      loadRetryAudit(retryAuditRoot)
        .then(retryAudit =>
          ensureJunitReport(feature.reportFile, feature.title, code, getRetryAuditScenarios(retryAudit, feature.title))
        )
        .finally(resolve);
    });
  });

const worker = async workerIndex => {
  while (nextFeature < features.length) {
    const feature = featureDescriptors[nextFeature++];
    await runFeature(feature, workerIndex);
  }
};

const aggregateJunitFile = path.join(reportsRoot, 'result.xml');
const htmlReportFile = path.join(reportsRoot, 'Functional test report.html');

const createReports = async () => {
  const retryAudit = await loadRetryAudit(retryAuditRoot);
  await Promise.all(
    featureDescriptors.map(async feature => {
      const scenarioAttempts = getRetryAuditScenarios(retryAudit, feature.title);
      if (scenarioAttempts.some(attempt => attempt.status === 'failed')) {
        await ensureJunitReport(feature.reportFile, feature.title, 1, scenarioAttempts);
      }
    })
  );
  const reportFiles = [...new Set(await findJunitReports(reportsRoot))].filter(
    reportFile => reportFile !== aggregateJunitFile
  );
  await createAggregateJunitReport(reportFiles, aggregateJunitFile);
  await createHtmlReport(reportFiles, retryAudit, htmlReportFile);
  await createRetryAuditReport(retryAudit, retryAuditReportFile);
};

if (process.env.FUNCTIONAL_REPORT_ONLY === 'true') {
  await createReports();
  process.exit(0);
}

await Promise.all(Array.from({ length: Math.min(workerCount, features.length) }, (_, index) => worker(index + 1)));
await createReports();

process.exitCode = failed ? 1 : 0;
