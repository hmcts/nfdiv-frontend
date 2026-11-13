import { applicant2PostSubmissionSequence, applicant2PreSubmissionSequence } from '../../main/steps/applicant2Sequence';
import { respondentSequence } from '../../main/steps/respondentSequence';
import * as urls from '../../main/steps/urls';
import {
  APPLICANT_1,
  APPLICANT_2,
  ENTER_YOUR_ACCESS_CODE,
  PageLink,
  RESPONDENT,
  WITHDRAW_CONFIRMATION,
} from '../../main/steps/urls';

export const ERROR_PAGE_URL: PageLink = '/error';
const urlLookup = { ...urls, ERROR_PAGE_URL };

type UrlLookupKey = keyof typeof urlLookup;

export type InternalPageLink = (typeof urlLookup)[UrlLookupKey];
const internalPageLinkKeySet = new Set(Object.keys(urlLookup));

const internalPageLinkSet = new Set(Object.values(urlLookup));
export const INTERIM_APPLICATIONS_BASE_PATH = '/interim-applications';

const prefixedRoutes = new Set<string>([
  ...[...applicant2PreSubmissionSequence, ...applicant2PostSubmissionSequence, ...respondentSequence].map(
    step => step.url
  ),
  `${APPLICANT_1}${ENTER_YOUR_ACCESS_CODE}`,
  `${APPLICANT_2}${ENTER_YOUR_ACCESS_CODE}`,
  `${APPLICANT_2}${WITHDRAW_CONFIRMATION}`,
]);

const userPrefixLookup = { APPLICANT_1, APPLICANT_2, RESPONDENT } as const;
type UserPrefixKey = keyof typeof userPrefixLookup;

const userPrefixKeySet = new Set(Object.keys(userPrefixLookup));
const userPrefixSet = new Set(Object.values(userPrefixLookup));

const lookupUrlByKey = (urlKey: string): InternalPageLink | undefined => {
  urlKey = urlKey.trim().toUpperCase();
  return isInternalPageLinkKey(urlKey) ? urlLookup[urlKey] : undefined;
};

const lookupUrlByPath = (urlPath: string): InternalPageLink | undefined => {
  return isInternalPageLink(urlPath) ? (urlPath as InternalPageLink) : undefined;
};

const isDefinedInternalPageLink = (url: string): InternalPageLink | undefined => {
  if (isFullyQualifiedUrl(url)) {
    return undefined;
  }
  return url.startsWith('/') ? lookupUrlByPath(url) : lookupUrlByKey(url);
};

const isInternalPageLinkKey = (linkKeyValue: string): linkKeyValue is UrlLookupKey => {
  return internalPageLinkKeySet.has(linkKeyValue.toUpperCase() as UrlLookupKey);
};

const getPathWithoutPrefix = (path: PageLink): string => {
  if (path === urls.APPLICANT_1 || path.startsWith(`${urls.APPLICANT_1}/`)) {
    return path.slice(urls.APPLICANT_1.length);
  } else if (path === urls.APPLICANT_2 || path.startsWith(`${urls.APPLICANT_2}/`)) {
    return path.slice(urls.APPLICANT_2.length);
  } else if (path === urls.RESPONDENT || path.startsWith(`${urls.RESPONDENT}/`)) {
    return path.slice(urls.RESPONDENT.length);
  }
  return path;
};

export const getUrlWithoutQuery = (url: string): string => {
  return url.split('?')[0].split('#')[0];
};

export const getPathPrefix = (path: PageLink): string => {
  if (path === urls.APPLICANT_1 || path.startsWith(`${urls.APPLICANT_1}/`)) {
    return urls.APPLICANT_1;
  } else if (path === urls.APPLICANT_2 || path.startsWith(`${urls.APPLICANT_2}/`)) {
    return urls.APPLICANT_2;
  } else if (path === urls.RESPONDENT || path.startsWith(`${urls.RESPONDENT}/`)) {
    return urls.RESPONDENT;
  }
  return '';
};

export const isInternalPageLink = (linkValue: string): linkValue is InternalPageLink => {
  const linkValueWithoutPrefix = getPathWithoutPrefix(linkValue as PageLink);
  const linkValueWithoutQuery = getUrlWithoutQuery(linkValueWithoutPrefix);
  return internalPageLinkSet.has(linkValueWithoutQuery as InternalPageLink);
};

export const isFullyQualifiedUrl = (url?: string): boolean => {
  url = url?.trim();
  if (!url) {
    return false;
  }
  if (!url.toLowerCase().startsWith('http://') && !url.toLowerCase().startsWith('https://')) {
    return false;
  }
  try {
    new URL(url);
    return true; // e.g. https://idam-web-public...
  } catch {
    return false; // e.g. /applicant1/check, applicant1/check, SOME_KEY
  }
};

export const lookupUrl = (url?: string): InternalPageLink | string => {
  url = url?.trim();
  if (!url) {
    return '';
  }
  return isDefinedInternalPageLink(url) ?? url;
};

export const isInterimApplicationsUrl = (url: string): boolean => {
  return url.trim().startsWith(INTERIM_APPLICATIONS_BASE_PATH);
};

export const isPrefixedRoute = (url: string): boolean => {
  const urlWithoutQuery = getUrlWithoutQuery(url);
  return prefixedRoutes.has(urlWithoutQuery);
};

const isUserPrefixKey = (userKeyValue: string): userKeyValue is UserPrefixKey => userPrefixKeySet.has(userKeyValue);

export const lookupUserPrefix = (user?: string): '' | PageLink | undefined => {
  user = user?.trim();
  if (!user) {
    return '';
  }
  if (user.startsWith('/')) {
    return userPrefixSet.has(user as PageLink) ? (user as PageLink) : undefined;
  }
  return isUserPrefixKey(user) ? userPrefixLookup[user] : undefined;
};
