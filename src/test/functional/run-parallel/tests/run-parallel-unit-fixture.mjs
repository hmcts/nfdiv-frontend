import { EventEmitter } from 'node:events';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SourceTextModule, SyntheticModule, createContext } from 'node:vm';

// Evaluate the real entrypoint with isolated I/O. No features are run and no
// files in functional-output are read, written, or removed by this fixture.
const options = JSON.parse(process.argv[2]);
const runnerUrl = new URL('../../run-parallel.mjs', import.meta.url);
const projectRoot = path.resolve(path.dirname(fileURLToPath(runnerUrl)), '../../..');
const featuresDir = path.join(projectRoot, 'src/test/functional/features');
const reportsRoot = path.join(projectRoot, 'functional-output/functional/reports');
const features = options.features || [];
const reportFiles = options.reports || [];
const audit = new Map(
  (options.audit || []).map(record => [`${record.feature}\0${record.scenario}`, { latest: record }])
);
const state = { spawns: [], closed: 0, maxActive: 0, logs: '', ensured: [], reportOrder: [], exitCode: null };
let active = 0;
const exitSignal = {};
const processStub = {
  argv: [process.execPath, fileURLToPath(runnerUrl), options.grep],
  env: {
    FUNCTIONAL_WORKERS: String(options.workers ?? 10),
    ...options.env,
    ...(options.reportOnly ? { FUNCTIONAL_REPORT_ONLY: 'true' } : {}),
  },
  stdout: {
    write: value => {
      state.logs += value;
    },
  },
  exit: code => {
    state.exitCode = code;
    throw exitSignal;
  },
};
const context = createContext({ process: processStub });
const dependencies = {
  'node:path': { default: path },
  'node:url': { fileURLToPath },
  'node:fs/promises': {
    readFile: async file => {
      const feature = features.find(entry => path.join(featuresDir, entry.file) === file);
      if (!feature) {
        throw new Error(`Unexpected feature read: ${file}`);
      }
      return feature.source ?? `Feature: ${feature.title || feature.file}`;
    },
    readdir: async directory => {
      if (directory === featuresDir) {
        return [...features.map(feature => feature.file), ...(options.ignoredFiles || [])];
      }
      if (options.missingReports) {
        throw new Error('No reports directory');
      }
      const relative = path.relative(reportsRoot, directory);
      const entries = new Map();
      for (const file of reportFiles) {
        const rest = path.relative(relative || '.', file);
        if (rest.startsWith('..')) {
          continue;
        }
        const [name, ...children] = rest.split(path.sep);
        entries.set(name, children.length > 0);
      }
      return [...entries].map(([name, isDirectory]) => ({ name, isDirectory: () => isDirectory }));
    },
  },
  'node:child_process': {
    spawn: (command, args, settings) => {
      state.spawns.push({ command, args, settings });
      state.maxActive = Math.max(state.maxActive, ++active);
      const feature = features.find(entry => entry.file === path.basename(args[1]));
      const child = new EventEmitter();
      child.stdout = new EventEmitter();
      child.stderr = new EventEmitter();
      setImmediate(() => {
        active--;
        if (feature.spawnError) {
          child.emit('error', new Error(feature.spawnError));
          return;
        }
        for (const chunk of feature.stdout || []) {
          child.stdout.emit('data', Buffer.from(chunk));
        }
        for (const chunk of feature.stderr || []) {
          child.stderr.emit('data', Buffer.from(chunk));
        }
        state.closed++;
        child.emit('close', feature.exitCode ?? 0);
      });
      return child;
    },
  },
  './run-parallel/report-utils.mjs': {
    featureReportDirectoryName: file => path.basename(file, '.feature'),
    getRetryAuditScenarios: (records, feature) =>
      [...records.values()].map(record => record.latest).filter(record => record.feature === feature),
    loadRetryAudit: async () => audit,
  },
  './run-parallel/junit-report.mjs': {
    ensureJunitReport: async (file, feature, code, scenarios) => {
      state.ensured.push({ file, feature, code, scenarios });
    },
    createAggregateJunitReport: async (files, file) => {
      state.reportOrder.push('aggregate');
      state.aggregate = { files, file, closed: state.closed };
    },
  },
  './run-parallel/html-report.mjs': {
    createHtmlReport: async (files, records, file) => {
      state.reportOrder.push('html');
      state.html = { files, file, scenarios: [...records.keys()] };
    },
  },
  './run-parallel/retry-audit-report.mjs': {
    createRetryAuditReport: async (records, file) => {
      state.reportOrder.push('audit');
      state.audit = { file, scenarios: [...records.keys()] };
    },
  },
};
const runner = new SourceTextModule(await readFile(runnerUrl, 'utf8'), {
  context,
  identifier: fileURLToPath(runnerUrl),
  initializeImportMeta: meta => {
    meta.url = runnerUrl.href;
  },
});
await runner.link(specifier => {
  const exports = dependencies[specifier];
  if (!exports) {
    throw new Error(`Unexpected dependency: ${specifier}`);
  }
  return new SyntheticModule(
    Object.keys(exports),
    function () {
      for (const [name, value] of Object.entries(exports)) {
        this.setExport(name, value);
      }
    },
    { context }
  );
});
try {
  await runner.evaluate();
  state.exitCode = processStub.exitCode;
} catch (error) {
  if (error !== exitSignal) {
    throw error;
  }
}
process.stdout.write(JSON.stringify(state));
