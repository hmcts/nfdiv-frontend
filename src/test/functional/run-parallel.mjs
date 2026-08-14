import { spawn } from 'node:child_process';
import { readdir } from 'node:fs/promises';
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

let nextFeature = 0;
let failed = false;

const runFeature = (feature, workerIndex) =>
  new Promise(resolve => {
    const featureName = path.basename(feature, '.feature').replace(/[^a-zA-Z0-9_-]/g, '_');
    const reportDir = path.join('functional-output/functional/reports', `worker-${workerIndex}-${featureName}`);
    const override = JSON.stringify({
      output: reportDir,
      plugins: {
        junitReporter: {
          output: 'functional-output/functional/reports',
          outputName: `result-worker-${workerIndex}-${featureName}.xml`,
        },
      },
    });

    const args = ['run', feature, '--config', configFile, '--override', override];
    if (grep) {
      args.push('--grep', grep);
    }

    const child = spawn(codeceptBin, args, {
      cwd: projectRoot,
      env: process.env,
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    const prefix = `[Feature worker ${workerIndex}] `;
    child.stdout.on('data', data => process.stdout.write(`${prefix}${data}`));
    child.stderr.on('data', data => process.stderr.write(`${prefix}${data}`));
    child.on('error', error => {
      failed = true;
      process.stderr.write(`${prefix}${error.stack || error}\n`);
      resolve();
    });
    child.on('close', code => {
      if (code !== 0) {
        failed = true;
      }
      resolve();
    });
  });

const worker = async workerIndex => {
  while (nextFeature < features.length) {
    const feature = features[nextFeature++];
    await runFeature(feature, workerIndex);
  }
};

await Promise.all(Array.from({ length: Math.min(workerCount, features.length) }, (_, index) => worker(index + 1)));

process.exitCode = failed ? 1 : 0;
