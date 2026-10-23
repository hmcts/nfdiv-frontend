import { Logger as hmctsLogger } from '@hmcts/nodejs-logging';

import { SupportedLanguages } from '../../../main/modules/i18n';
import { APPLICANT_1, APPLICANT_2, CHECK_ANSWERS_URL, RESPONDENT } from '../../../main/steps/urls';
import { config as testConfig } from '../../config';
import { urlLookup } from '../urlLookup';

import { WaitUntil, iClick, iWaitForVisible } from './elementInteraction';

const logger = hmctsLogger.getLogger('common-steps');
const { I } = inject();

const isFullyQualifiedUrl = (value: string): boolean => {
  value = value.trim();
  if (!value.toLowerCase().startsWith('http://') && !value.toLowerCase().startsWith('https://')) {
    return false;
  }

  try {
    new URL(value);
    return true; // e.g. https://idam-web-public...
  } catch {
    return false; // e.g. /applicant1/check, applicant1/check, SOME_KEY
  }
};

const lookupUrl = (url?: string): string => {
  if (!url || url.trim().length === 0) {
    return '';
  }
  url = url.trim();
  if (isFullyQualifiedUrl(url)) {
    return url;
  }
  const definedUrl = url.startsWith('/') ? url : urlLookup[url.toUpperCase()];
  if (!definedUrl) {
    return url;
  }
  return definedUrl;
};

const urlStringToRegExp = (url: string): RegExp => {
  const escapeRegExp = (toEscape: string) => toEscape.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const resolved = lookupUrl(url);

  const absolute = isFullyQualifiedUrl(resolved)
    ? new URL(resolved)
    : new URL(resolved.startsWith('/') ? resolved : `/${resolved}`, testConfig.TEST_URL);

  const base = `${absolute.origin}${absolute.pathname}`;
  return new RegExp(`^${escapeRegExp(base)}(?:\\?.*)?(?:#.*)?$`);
};

const getUserPrefix = (user?: string): string => {
  if (!user || user.trim().length === 0) {
    return '';
  }
  user = user.trim();
  switch (user.toUpperCase()) {
    case 'APPLICANT':
    case 'APPLICANT1':
    case 'APPLICANT 1':
    case 'APPLICANT_1':
    case 'THE APPLICANT':
      return APPLICANT_1;
    case 'APPLICANT2':
    case 'APPLICANT 2':
    case 'APPLICANT_2':
      return APPLICANT_2;
    case 'RESPONDENT':
    case 'THE RESPONDENT':
      return RESPONDENT;
    default:
      throw new Error(`Cannot resolve user prefix URL from: ${user}`);
  }
};

const getFullUrl = (user?: string, url?: string): string => {
  const userPrefix = getUserPrefix(user);
  const definedUrl = lookupUrl(url);
  return userPrefix + definedUrl;
};

type UrlType = 'string' | 'empty-string' | 'regexp' | undefined;

const getTypeOfUrl = (url?: string | RegExp): UrlType => {
  if (!url) {
    return undefined;
  }
  const urlIsString = typeof url === 'string';
  if (urlIsString) {
    if (url.trim().length > 0) {
      return 'string';
    } else {
      return 'empty-string';
    }
  }
  const urlIsRegExp = typeof url === 'object' && url instanceof RegExp;
  if (urlIsRegExp) {
    return 'regexp';
  }
};

const checkForEqualityAndDiversityRedirect = async (): Promise<void> => {
  const optOutButtonSelector = 'button[name="opt-out-button"]';
  if (await iAmOnEqualityAndDiversity()) {
    logger.info('Got redirected to equality and diversity page. Clicking opt-out button.');
    iWaitForVisible(optOutButtonSelector);
    iClick(optOutButtonSelector);
  }
};

export const iAmOnPage = (urlString: string): void => {
  const url = new URL(urlString, testConfig.TEST_URL);
  if (!url.searchParams.has('lng')) {
    url.searchParams.set('lng', SupportedLanguages.En);
  }
  I.amOnPage(url.toString());
};

export const iClickToNavigate = async (
  selector: string,
  wait?: number,
  nextUrl?: string | RegExp,
  waitUntil: WaitUntil = 'load'
): Promise<void> => {
  const urlType = getTypeOfUrl(nextUrl);

  iWaitForVisible(selector, wait);
  if (urlType === 'empty-string' || urlType === undefined) {
    return iClick(selector, { waitForNavigation: waitUntil });
  }

  if (urlType === 'string' && nextUrl === CHECK_ANSWERS_URL) {
    iClick(selector, { waitForNavigation: 'domcontentloaded' });
    if (!(await iAmOnNfd())) {
      await checkForEqualityAndDiversityRedirect();
    }
  } else {
    iClick(selector);
  }
  iWaitForUrl(nextUrl, wait, waitUntil);
};

type ResolvedApplicant = 'applicant1' | 'applicant2';

export const iGoToPageAsUser = (url: string, user?: string): ResolvedApplicant => {
  const fullUrl = getFullUrl(user, url);
  iAmOnPage(fullUrl);
  return fullUrl.startsWith('/respondent') || fullUrl.startsWith('/applicant2') ? 'applicant2' : 'applicant1';
};

export const iGoToPage = (url: string): ResolvedApplicant => {
  return iGoToPageAsUser(url);
};

export const iWaitInUrlAsUser = (url: string, user?: string, wait?: number): ResolvedApplicant => {
  const fullUrl = getFullUrl(user, url);
  I.waitInUrl(fullUrl, wait);
  return fullUrl.startsWith('/respondent') || fullUrl.startsWith('/applicant2') ? 'applicant2' : 'applicant1';
};

export const iWaitInUrl = (url: string, wait?: number): ResolvedApplicant => {
  return iWaitInUrlAsUser(url, undefined, wait);
};

export const iWaitForUrl = (url?: string | RegExp, wait?: number, waitUntil: WaitUntil = 'load'): void => {
  const urlType = getTypeOfUrl(url);
  if (urlType === 'empty-string' || urlType === undefined) {
    throw new Error(`Cannot wait for URL: "${url}"`);
  }

  if (urlType === 'string') {
    url = urlStringToRegExp(url as string);
  }

  const timeout = wait ? { timeout: wait * 1000 } : {};

  I.waitForURL(url as RegExp, { ...timeout, waitUntil });
};

export const doesCurrentUrlStartWith = async (serviceUrl: string): Promise<boolean> => {
  const currentUrl = await I.grabCurrentUrl();
  return currentUrl.startsWith(serviceUrl);
};

export const iAmOnIdam = async (): Promise<boolean> => {
  return doesCurrentUrlStartWith(testConfig.IDAM_WEB_BASE_URL);
};

export const iAmOnNfd = async (): Promise<boolean> => {
  return doesCurrentUrlStartWith(testConfig.TEST_URL);
};

export const iAmOnEqualityAndDiversity = async (): Promise<boolean> => {
  return doesCurrentUrlStartWith(testConfig.EQUALITY_URL);
};
