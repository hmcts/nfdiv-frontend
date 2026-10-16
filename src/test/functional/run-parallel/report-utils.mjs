import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

export const xmlEscape = value =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

export const xmlUnescape = value =>
  value
    .replaceAll('&quot;', '"')
    .replaceAll('&apos;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&amp;', '&');

export const featureReportDirectoryName = featureFile =>
  featureFile
    .split(/[\\/]/)
    .at(-1)
    .replace(/\.feature$/, '')
    .replace(/[^a-zA-Z0-9_-]/g, '_');

export const scenarioKey = (featureName, scenarioName) => `${featureName}\u0000${scenarioName}`;

const validRetryAuditStatuses = new Set(['failed', 'passed', 'skipped']);

export const loadRetryAudit = async retryAuditRoot => {
  try {
    const auditFiles = (await readdir(retryAuditRoot)).filter(file => file.endsWith('.json'));
    const attempts = new Map();
    const hookAttempts = new Map();

    await Promise.all(
      auditFiles.map(async auditFile => {
        try {
          const audit = JSON.parse(await readFile(path.join(retryAuditRoot, auditFile), 'utf8'));
          if (
            !audit.feature ||
            !audit.scenario ||
            typeof audit.durationMs !== 'number' ||
            !validRetryAuditStatuses.has(audit.status)
          ) {
            return;
          }

          const key = scenarioKey(audit.feature, audit.scenario);
          if (audit.kind === 'hook') {
            if (
              audit.hookName !== 'Before' ||
              !Number.isFinite(audit.durationMs) ||
              audit.durationMs < 0 ||
              ![audit.scenarioAttempt, audit.hookAttempt].every(value => Number.isInteger(value) && value > 0)
            ) {
              return;
            }
            hookAttempts.set(key, [
              ...(hookAttempts.get(key) || []),
              { ...audit, auditFile: path.join(retryAuditRoot, auditFile) },
            ]);
            return;
          }
          attempts.set(key, [
            ...(attempts.get(key) || []),
            { ...audit, auditFile: path.join(retryAuditRoot, auditFile) },
          ]);
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
        const hooks = hookAttempts
          .get(key)
          ?.sort(
            (first, second) => first.scenarioAttempt - second.scenarioAttempt || first.hookAttempt - second.hookAttempt
          );
        return [
          key,
          {
            attempts: orderedAttempts,
            latest: orderedAttempts.at(-1),
            successfulAttempt,
            ...(hooks?.length ? { hookAttempts: hooks } : {}),
          },
        ];
      })
    );
  } catch {
    // Retry audit output is optional, so report generation still works when it is absent.
    return new Map();
  }
};

export const getRetryAuditScenarios = (retryAudit, featureName) =>
  [...retryAudit.values()]
    .map(audit => audit.latest)
    .filter(attempt => attempt?.feature === featureName)
    .sort((first, second) => first.scenario.localeCompare(second.scenario));
