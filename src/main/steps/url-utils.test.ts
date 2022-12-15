import { isLinkingUrl, signInNotRequired } from './url-utils';
import { ACCESSIBILITY_STATEMENT_URL, HOME_URL, RESPONDENT } from './urls';

describe('url-utils', () => {
  describe('signInNotRequired', () => {
    test('Returns true if request path is a "sign in not required" path', () => {
      const result = signInNotRequired(ACCESSIBILITY_STATEMENT_URL);
      expect(result).toBe(true);
    });

    test('Returns false if request path is not a "sign in not required" path', () => {
      const result = signInNotRequired(HOME_URL);
      expect(result).toBe(false);
    });
  });

  describe('isLinkingUrl', () => {
    test('Returns true if request path is a "linking" path', () => {
      const result = isLinkingUrl(RESPONDENT);
      expect(result).toBe(true);
    });

    test('Returns false if request path is not a "linking" path', () => {
      const result = isLinkingUrl(HOME_URL);
      expect(result).toBe(false);
    });
  });
});
