import assert from 'node:assert/strict';
import test from 'node:test';

import {
  featureReportDirectoryName,
  getRetryAuditScenarios,
  scenarioKey,
  xmlEscape,
  xmlUnescape,
} from '../report-utils.mjs';

test('escapes and unescapes report markup values', () => {
  const value = 'Feature & <scenario> "quoted"';

  assert.equal(xmlUnescape(xmlEscape(value)), value);
});

test('creates stable feature report directory names and scenario keys', () => {
  assert.equal(featureReportDirectoryName('/features/applicant 1-sole.feature'), 'applicant_1-sole');
  assert.equal(
    scenarioKey('Applicant 1 sole application', 'Happy path'),
    'Applicant 1 sole application\u0000Happy path'
  );
});

test('selects latest retry-audit scenarios for a feature', () => {
  const retryAudit = new Map([
    ['feature\u0000passed', { latest: { feature: 'Feature', scenario: 'passed', status: 'passed' } }],
    ['feature\u0000failed', { latest: { feature: 'Feature', scenario: 'failed', status: 'failed' } }],
    ['other\u0000scenario', { latest: { feature: 'Other feature', scenario: 'scenario', status: 'failed' } }],
  ]);

  assert.deepEqual(
    getRetryAuditScenarios(retryAudit, 'Feature').map(attempt => attempt.scenario),
    ['failed', 'passed']
  );
});
