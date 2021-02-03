import Axios from 'axios';

import {
  HAS_MARRIAGE_BROKEN_URL,
  LANGUAGE_PREFERENCE_URL,
  MARRIAGE_CERTIFICATE_URL,
  RESPONDENT_ADDRESS_URL,
  TERMS_AND_CONDITIONS_URL,
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

function loginPally(): Pa11yResult {
  return pa11y(`${config.TEST_URL}/login`, {
    hideElements: '.govuk-footer__licence-logo, .govuk-header__logotype-crown',
    actions: [
      `set field #username to ${config.TestUser}`,
      `set field #password to ${config.TestPass}`,
      'click element .button',
      'wait for path to be /',
    ],
  });
}

beforeAll(() => {
  loginPally();
});

function ensurePageCallWillSucceed(url: string): Promise<void> {
  return axios.get(url);
}

function runPally(url: string): Promise<Pa11yResult> {
  const fullUrl = `${config.TEST_URL}${url}`;
  return pa11y(fullUrl, {
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
  // testing accessibility of the home page
  testAccessibility('/');
  testAccessibility(TERMS_AND_CONDITIONS_URL);
  testAccessibility(LANGUAGE_PREFERENCE_URL);
  testAccessibility(HAS_MARRIAGE_BROKEN_URL);
  testAccessibility(RESPONDENT_ADDRESS_URL);
  testAccessibility(MARRIAGE_CERTIFICATE_URL);

  // TODO: include each path of your application in accessibility checks
});
