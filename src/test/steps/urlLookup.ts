import { PageLink } from '../../main/steps/urls';
import * as urls from '../../main/steps/urls';

const { ...urlPageLinks } = urls;

const urlLookup = urlPageLinks;
type UrlLookupKey = keyof typeof urlLookup;
export type InternalPageLink = (typeof urlLookup)[UrlLookupKey];

const internalPageLinkKeySet = new Set(Object.keys(urlLookup));
const internalPageLinkSet = new Set(Object.values(urlLookup));

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

export const isInternalPageLink = (linkValue: string): linkValue is InternalPageLink => {
  const linkValueWithoutPrefix = getPathWithoutPrefix(linkValue as PageLink);
  return internalPageLinkSet.has(linkValueWithoutPrefix as PageLink);
};

export const isFullyQualifiedUrl = (url: string): boolean => {
  url = url.trim();
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
  if (!url || url.trim().length === 0) {
    return '';
  }
  url = url.trim();
  return isDefinedInternalPageLink(url) ?? url;
};
