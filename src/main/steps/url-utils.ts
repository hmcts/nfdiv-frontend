import {
  ACCESSIBILITY_STATEMENT_URL,
  APPLICANT_2,
  COOKIES_URL,
  ENTER_YOUR_ACCESS_CODE,
  PRIVACY_POLICY_URL,
  PageLink,
  RESPONDENT,
  TERMS_AND_CONDITIONS_URL,
  WEBCHAT_URL,
} from './urls';

export const signInNotRequired = (reqPath: string): boolean =>
  [ACCESSIBILITY_STATEMENT_URL, WEBCHAT_URL, PRIVACY_POLICY_URL, TERMS_AND_CONDITIONS_URL, COOKIES_URL].includes(
    reqPath as PageLink
  );

export const isLinkingUrl = (reqPath: string): boolean =>
  reqPath.endsWith(APPLICANT_2) || reqPath.endsWith(RESPONDENT) || reqPath.endsWith(ENTER_YOUR_ACCESS_CODE);
