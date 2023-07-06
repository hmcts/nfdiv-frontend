import {
  ACCESSIBILITY_STATEMENT_URL,
  APPLICANT_2,
  CONTACT_US,
  COOKIES_URL,
  ENTER_YOUR_ACCESS_CODE,
  HABITUALLY_RESIDENT_ENGLAND_WALES,
  JURISDICTION_DOMICILE,
  JURISDICTION_LAST_TWELVE_MONTHS,
  LIVING_ENGLAND_WALES_SIX_MONTHS,
  PRIVACY_POLICY_URL,
  PageLink,
  RESIDUAL_JURISDICTION,
  RESPONDENT,
  TERMS_AND_CONDITIONS_URL,
  TIMED_OUT_URL,
  WEBCHAT_URL,
  WHERE_YOUR_LIVES_ARE_BASED_URL,
} from './urls';

export const signInNotRequired = (reqPath: string): boolean =>
  [
    ACCESSIBILITY_STATEMENT_URL,
    CONTACT_US,
    COOKIES_URL,
    PRIVACY_POLICY_URL,
    TERMS_AND_CONDITIONS_URL,
    WEBCHAT_URL,
    TIMED_OUT_URL,
  ].includes(reqPath as PageLink);

export const isLinkingUrl = (reqPath: string): boolean =>
  reqPath.endsWith(APPLICANT_2) || reqPath.endsWith(RESPONDENT) || reqPath.endsWith(ENTER_YOUR_ACCESS_CODE);

export const convertUrlsToRespondentUrls = (urls: PageLink[]): PageLink[] =>
  urls.map(url => `${RESPONDENT}${url}` as PageLink);

export const convertUrlsToApplicant2Urls = (urls: PageLink[]): PageLink[] =>
  urls.map(url => `${APPLICANT_2}${url}` as PageLink);

export const jurisdictionUrls: PageLink[] = [
  WHERE_YOUR_LIVES_ARE_BASED_URL,
  JURISDICTION_DOMICILE,
  JURISDICTION_LAST_TWELVE_MONTHS,
  HABITUALLY_RESIDENT_ENGLAND_WALES,
  LIVING_ENGLAND_WALES_SIX_MONTHS,
  RESIDUAL_JURISDICTION,
];
