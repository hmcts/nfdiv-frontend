import { spawn } from 'node:child_process';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { createHtmlReport } from './run-parallel/html-report.mjs';
import { createAggregateJunitReport, ensureJunitReport } from './run-parallel/junit-report.mjs';

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

const createLogFormatter = (workerIndex, featureName) => {
  let pending = '';

  const formatLine = line => `[Feature worker ${workerIndex}][${featureName}] ${line}`;

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
const aggregateJunitFile = path.join(reportsRoot, 'result.xml');
const htmlReportFile = path.join(reportsRoot, 'Functional test report.html');

const createReports = async () => {
  await createAggregateJunitReport(reportFiles, aggregateJunitFile);
  await createHtmlReport(reportFiles, retryAuditRoot, htmlReportFile);
};

if (process.env.FUNCTIONAL_REPORT_ONLY === 'true') {
  await createReports();
  process.exit(0);
}

await Promise.all(Array.from({ length: Math.min(workerCount, features.length) }, (_, index) => worker(index + 1)));
await createReports();

process.exitCode = failed ? 1 : 0;
