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

const featureMetadata = new Map(
  await Promise.all(
    features.map(async feature => {
      const source = await readFile(feature, 'utf8');
      const featureName = source.match(/^\s*Feature:\s*(.+)$/m)?.[1]?.trim() || path.basename(feature, '.feature');
      const scenarios = [...source.matchAll(/^\s*Scenario(?: Outline)?:\s*(.+)$/gm)].map(match => match[1].trim());
      return [feature, { featureName, scenarios }];
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

const createLogFormatter = (workerIndex, metadata) => {
  let scenarioIndex = -1;
  let pending = '';

  const formatLine = line => {
    // eslint-disable-next-line no-control-regex
    const cleanLine = line.replace(/\u001b\[[0-?]*[ -/]*[@-~]/g, '');
    const scenarioMarker = `${metadata.featureName} › `;
    const scenarioFromOutput = cleanLine.includes(scenarioMarker) ? cleanLine.split(scenarioMarker, 2)[1].trim() : '';
    if (scenarioFromOutput) {
      scenarioIndex = metadata.scenarios.indexOf(scenarioFromOutput);
    } else if (/^\s*Scenario\(\)/.test(cleanLine)) {
      scenarioIndex += 1;
    }
    const scenarioName = metadata.scenarios[scenarioIndex] || 'before scenario';
    return `[Feature worker ${workerIndex}][${metadata.featureName}][${scenarioName}] ${line}`;
  };

  return {
    write(data) {
      pending += data.toString();
      const lines = pending.split('\n');
      pending = lines.pop();
      lines.forEach(line => process.stdout.write(`${formatLine(line)}\n`));
    },
    flush() {
      if (pending) {
        process.stdout.write(formatLine(pending) + '\n');
      }
    },
  };
};

const runFeature = (feature, workerIndex) =>
  new Promise(resolve => {
    const metadata = featureMetadata.get(feature);
    const featureName = path.basename(feature, '.feature').replace(/[^a-zA-Z0-9_-]/g, '_');
    const reportDir = path.join(
      projectRoot,
      'functional-output/functional/reports',
      `worker-${workerIndex}-${featureName}`
    );
    const junitReportDir = path.join(projectRoot, 'functional-output/functional/reports');
    const junitReportFile = path.join(junitReportDir, `result-worker-${workerIndex}-${featureName}.xml`);
    const override = JSON.stringify({
      output: reportDir,
      plugins: {
        junitReporter: {
          output: junitReportDir,
          outputName: `result-worker-${workerIndex}-${featureName}.xml`,
        },
      },
    });

    const args = ['run', feature, '--config', configFile, '--override', override, '--steps'];
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

    const formatter = createLogFormatter(workerIndex, metadata);
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

await Promise.all(Array.from({ length: Math.min(workerCount, features.length) }, (_, index) => worker(index + 1)));

const reportFiles = features.flatMap(feature => {
  const featureName = path.basename(feature, '.feature').replace(/[^a-zA-Z0-9_-]/g, '_');
  return Array.from({ length: Math.min(workerCount, features.length) }, (_, workerIndex) =>
    path.join(reportsRoot, `result-worker-${workerIndex + 1}-${featureName}.xml`)
  );
});
await createAggregateJunitReport(reportFiles);

process.exitCode = failed ? 1 : 0;
