export type PageLink = `/${string}`;

export const HOME_URL: PageLink = '/';
export const SIGN_IN_URL: PageLink = '/login';
export const SIGN_OUT_URL: PageLink = '/logout';
export const SAVE_SIGN_OUT_URL: PageLink = '/save-and-sign-out';
export const CSRF_TOKEN_ERROR_URL: PageLink = '/csrf-token-error';
export const PRIVACY_POLICY_URL: PageLink = '/privacy-policy';
export const TERMS_AND_CONDITIONS_URL: PageLink = '/terms-and-conditions';
export const COOKIES_URL: PageLink = '/cookies';
export const ACCESSIBILITY_STATEMENT_URL: PageLink = '/accessibility-statement';
export const SUMMARY_URL: PageLink = '/summary';
export const RESET_URL: PageLink = '/summary/reset';

export const YOUR_DETAILS_URL: PageLink = '/your-details';
export const HAS_RELATIONSHIP_BROKEN_URL: PageLink = '/irretrievable-breakdown';
export const RELATIONSHIP_NOT_BROKEN_URL: PageLink = '/relationship-not-broken';

export const RELATIONSHIP_DATE_URL: PageLink = '/date-from-certificate';
//TODO change when ticket is picked up
export const RELATIONSHIP_DATE_LESS_THAN_YEAR_URL: PageLink = '/less-than-year-together';

export const CERTIFICATE_URL: PageLink = '/do-you-have-your-certificate';
export const NO_CERTIFICATE_URL: PageLink = '/you-need-your-certificate';

export const UNION_CERTIFICATE_URL: PageLink = '/screening-questions/union-certificate';
