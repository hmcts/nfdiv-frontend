import {
  ACCESSIBILITY_STATEMENT_URL,
  APPLICANT_2,
  CONTACT_US,
  COOKIES_URL,
  ENTER_YOUR_ACCESS_CODE,
  PRIVACY_POLICY_URL,
  PageLink,
  RESPONDENT,
  TERMS_AND_CONDITIONS_URL,
  WEBCHAT_URL,
} from './urls';

export const signInNotRequired = (reqPath: string): boolean =>
  [
    ACCESSIBILITY_STATEMENT_URL,
    CONTACT_US,
    COOKIES_URL,
    PRIVACY_POLICY_URL,
    TERMS_AND_CONDITIONS_URL,
    WEBCHAT_URL,
  ].includes(reqPath as PageLink);

export const isLinkingUrl = (reqPath: string): boolean =>
  reqPath.endsWith(APPLICANT_2) || reqPath.endsWith(RESPONDENT) || reqPath.endsWith(ENTER_YOUR_ACCESS_CODE);

export const convertUrlsToRespondentUrls = (urls: PageLink[]): PageLink[] =>
  urls.map(url => `${RESPONDENT}${url}` as PageLink);

export const convertUrlsToApplicant2Urls = (urls: PageLink[]): PageLink[] =>
  urls.map(url => `${APPLICANT_2}${url}` as PageLink);
