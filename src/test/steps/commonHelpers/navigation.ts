import { Logger as hmctsLogger } from '@hmcts/nodejs-logging';

import { SupportedLanguages } from '../../../main/modules/i18n';
import { CHECK_ANSWERS_URL } from '../../../main/steps/urls';
import { config as testConfig } from '../../config';
import { urlLookup } from '../urlLookup';
import { iClick, iWaitForVisible, WaitUntil } from './elementInteraction';

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
    case 'APPLICANT1':
    case 'APPLICANT 1':
    case 'APPLICANT_1':
      user = 'APPLICANT_1';
      break;
    case 'APPLICANT2':
    case 'APPLICANT 2':
    case 'APPLICANT_2':
      user = 'APPLICANT_2';
      break;
    case 'RESPONDENT':
      user = 'RESPONDENT';
      break;
    default:
      break;
  }

  return lookupUrl(user);
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

const checkForEquityAndDiversityRedirect = async (elemId: string): Promise<void> => {
  const equityAndDiversityUrl = testConfig.getEquityAndDiversityUrl();
  iClick(elemId, { waitForNavigation: 'domcontentloaded' });
  const currentUrl = await I.grabCurrentUrl();

  if (currentUrl.startsWith(testConfig.TEST_URL)) {
    return;
  }
  const optOutButtonSelector = 'button[name="opt-out-button"]';
  if (currentUrl.startsWith(equityAndDiversityUrl)) {
    logger.info('Got redirected to equity and diversity page. Clicking opt-out button.');
    I.waitForElement(optOutButtonSelector);
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
  elemId: string,
  wait?: number,
  nextUrl?: string | RegExp,
  waitUntil: WaitUntil = 'load'
): Promise<void> => {
  const urlType = getTypeOfUrl(nextUrl);

  iWaitForVisible(elemId, wait);
  if (urlType === 'empty-string' || urlType === undefined) {
    return iClick(elemId, { waitForNavigation: waitUntil });
  }

  if (urlType === 'string' && nextUrl === CHECK_ANSWERS_URL) {
    await checkForEquityAndDiversityRedirect(elemId);
  }
  iClick(elemId);
  iWaitForUrl(nextUrl, wait, waitUntil);
};

export const iGoToPageAsUser = (url: string, user?: string): void => {
  iAmOnPage(getFullUrl(user, url));
};

export const iGoToPage = (url: string): void => {
  iGoToPageAsUser(url);
};

export const iWaitInUrlAsUser = (url: string, user?: string, wait?: number): void => {
  I.waitInUrl(getFullUrl(user, url), wait);
};

export const iWaitInUrl = (url: string, wait?: number): void => {
  iWaitInUrlAsUser(url, undefined, wait);
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

  I.waitForURL(url as RegExp, { ...timeout, waitUntil: waitUntil });
}
