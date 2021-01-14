import { fail } from 'assert';
import { config } from '../config';
import Axios from 'axios';

const pa11y = require('pa11y');
const axios = Axios.create({ baseURL: config.TEST_URL });

interface Pa11yResult {
  documentTitle: string,
  pageUrl: string,
  issues: PallyIssue[]
}

interface PallyIssue {
  code: string,
  context: string,
  message: string,
  selector: string,
  type: string,
  typeCode: number
}

beforeAll((done /* call it or remove it*/) => {
  done(); // calling it
});

function ensurePageCallWillSucceed(url: string): Promise<void> {
  return axios.get(url);
}

function runPally(url: string): Pa11yResult {
  return pa11y(config.TEST_URL + url, {
    hideElements: '.govuk-footer__licence-logo, .govuk-header__logotype-crown',
  });
}

function expectNoErrors(messages: PallyIssue[]): void {
  const errors = messages.filter(m => m.type === 'error');

  if (errors.length > 0) {
    const errorsAsJson = `${JSON.stringify(errors, null, 2)}`;
    fail(`There are accessibility issues: \n${errorsAsJson}\n`);
  }
}

function testAccessibility(url: string): void {
  describe(`Page ${url}`, () => {
    test('should have no accessibility errors', done => {
      ensurePageCallWillSucceed(url)
        .then(() => runPally(url))
        .then((result: Pa11yResult) => {
          expectNoErrors(result.issues);
          done();
        })
        .catch((err: Error) => done(err));
    });
  });
}

describe('Accessibility', () => {
  // testing accessibility of the home page
  testAccessibility('/');
  testAccessibility('/terms-and-conditions');

  // TODO: include each path of your application in accessibility checks
});
