import Axios from 'axios';

import {
  ACCESSIBILITY_STATEMENT_URL,
  CERTIFICATE_URL,
  COOKIES_URL,
  HAS_RELATIONSHIP_BROKEN_URL,
  HOME_URL,
  NO_CERTIFICATE_URL,
  PRIVACY_POLICY_URL,
  RELATIONSHIP_DATE_URL,
  RELATIONSHIP_NOT_BROKEN_URL,
  TERMS_AND_CONDITIONS_URL,
  YOUR_DETAILS_URL,
} from '../../main/steps/urls';
import { config } from '../config';

const pa11y = require('pa11y');
const axios = Axios.create({ baseURL: config.TEST_URL });

interface Pa11yResult {
  documentTitle: string;
  pageUrl: string;
  issues: PallyIssue[];
}

interface PallyIssue {
  code: string;
  context: string;
  message: string;
  selector: string;
  type: string;
  typeCode: number;
}

function ensurePageCallWillSucceed(url: string): Promise<void> {
  return axios.get(url);
}

function runPally(url: string): Promise<Pa11yResult> {
  const fullUrl = `${config.TEST_URL}${url}`;
  return pa11y(fullUrl, {
    actions: [
      `set field #username to ${config.TestUser}`,
      `set field #password to ${config.TestPass}`,
      'click element input[type="submit"]',
      `navigate to ${fullUrl}`,
    ],
    hideElements: '.govuk-footer__licence-logo, .govuk-header__logotype-crown',
  });
}

function expectNoErrors(messages: PallyIssue[]): void {
  const errors = messages.filter(m => m.type === 'error');

  if (errors.length > 0) {
    const errorsAsJson = `${JSON.stringify(errors, null, 2)}`;
    throw new Error(`There are accessibility issues: \n${errorsAsJson}\n`);
  }
}

function testAccessibility(url: string): void {
  describe(`Page ${url}`, () => {
    test('should have no accessibility errors', async () => {
      await ensurePageCallWillSucceed(url);
      const result = await runPally(url);
      expect(result.issues).toEqual(expect.any(Array));
      expectNoErrors(result.issues);
    });
  });
}

describe('Accessibility', () => {
  testAccessibility(HOME_URL);
  testAccessibility(PRIVACY_POLICY_URL);
  testAccessibility(TERMS_AND_CONDITIONS_URL);
  testAccessibility(COOKIES_URL);
  testAccessibility(ACCESSIBILITY_STATEMENT_URL);
  testAccessibility(YOUR_DETAILS_URL);
  testAccessibility(HAS_RELATIONSHIP_BROKEN_URL);
  testAccessibility(RELATIONSHIP_NOT_BROKEN_URL);
  testAccessibility(RELATIONSHIP_DATE_URL);
  testAccessibility(CERTIFICATE_URL);
  testAccessibility(NO_CERTIFICATE_URL);

  // TODO: include each path of your application in accessibility checks
});
