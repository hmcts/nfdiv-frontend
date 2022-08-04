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

export const isAosStep = (reqPath: string): boolean => {
  return [
    `${RESPONDENT}${CHECK_ANSWERS_URL}`,
    `${RESPONDENT}${DETAILS_OTHER_PROCEEDINGS}`,
    `${RESPONDENT}${DISPUTING_THE_APPLICATION}`,
    `${RESPONDENT}${HOW_DO_YOU_WANT_TO_RESPOND}`,
    `${RESPONDENT}${HOW_THE_COURTS_WILL_CONTACT_YOU}`,
    `${RESPONDENT}${LEGAL_JURISDICTION_OF_THE_COURTS}`,
    `${RESPONDENT}${OTHER_COURT_CASES}`,
    `${RESPONDENT}${REVIEW_THE_APPLICATION}`,
  ].includes(reqPath as PageLink);
};
