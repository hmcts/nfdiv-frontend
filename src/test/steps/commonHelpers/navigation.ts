import { Logger as hmctsLogger } from '@hmcts/nodejs-logging';

import { SupportedLanguages } from '../../../main/modules/i18n';
import { getPageTitleIdFromUrl } from '../../../main/steps/url-utils';
import {
  APPLICANT_1,
  APPLICANT_2,
  CHECK_ANSWERS_URL,
  CSRF_TOKEN_ERROR_URL,
  ENTER_YOUR_ACCESS_CODE,
  EXISTING_APPLICATION,
  PageLink,
  RESPONDENT,
  VIEW_YOUR_ANSWERS,
} from '../../../main/steps/urls';
import { config as testConfig } from '../../config';
import {
  ERROR_PAGE_URL,
  InternalPageLink,
  getPathPrefix,
  isFullyQualifiedUrl,
  isInternalPageLink,
  lookupUrl,
} from '../urlLookup';

import { WaitUntil, iClick, iWaitForVisible } from './elementInteraction';
import { isApplicant2, isRespondent } from './userInteraction';

const logger = hmctsLogger.getLogger('common-steps');
const { I } = inject();

type UrlType = 'string' | 'empty-string' | 'regexp' | undefined;
const BACK_LINK_SELECTOR = 'a.govuk-back-link';
const CHECK_ANSWERS_SELECTOR = `a[href="${VIEW_YOUR_ANSWERS}"]`;
const WITHDRAW_LINK_SELECTOR = 'a#withdrawLink';

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
    case APPLICANT_1.toUpperCase():
      return APPLICANT_1;
    case 'APPLICANT2':
    case 'APPLICANT 2':
    case 'APPLICANT_2':
    case APPLICANT_2.toUpperCase():
      return APPLICANT_2;
    case 'RESPONDENT':
    case 'THE RESPONDENT':
    case RESPONDENT.toUpperCase():
      return RESPONDENT;
    default:
      throw new Error(`Cannot resolve user prefix URL from: ${user}`);
  }
};

export const getFullUrl = (user?: string, url?: string): string => {
  const userPrefix = getUserPrefix(user);
  const definedUrl = lookupUrl(url);

  const definedOnly =
    userPrefix === '' ||
    isFullyQualifiedUrl(definedUrl) ||
    (userPrefix === APPLICANT_1 && definedUrl !== ENTER_YOUR_ACCESS_CODE) ||
    getPathPrefix(definedUrl as PageLink) !== '';

  return definedOnly ? definedUrl : userPrefix + definedUrl;
};

const getTypeOfUrl = (url?: string | RegExp): UrlType => {
  if (!url) {
    return undefined;
  }
  const urlIsString = typeof url === 'string';
  if (urlIsString) {
    if (url.trim().length > 0) {
      return 'string';
    }
    return 'empty-string';
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

export const isNoPathPrefixUrl = (url: string): boolean => {
  switch (url.toUpperCase()) {
    case 'ERROR_PAGE_URL':
    case ERROR_PAGE_URL.toUpperCase():
    case 'CSRF_TOKEN_ERROR_URL':
    case CSRF_TOKEN_ERROR_URL.toUpperCase():
    case 'EXISTING_APPLICATION':
    case EXISTING_APPLICATION.toUpperCase():
      return true;
    default:
      return false;
  }
};

export const setUserPathPrefix = (nextUrl: string, user?: string): InternalPageLink | string => {
  if (isNoPathPrefixUrl(nextUrl)) {
    return lookupUrl(nextUrl);
  }
  if (user !== undefined) {
    return getFullUrl(user, nextUrl);
  }
  if (isApplicant2()) {
    return getFullUrl(APPLICANT_2, nextUrl);
  }
  if (isRespondent()) {
    return getFullUrl(RESPONDENT, nextUrl);
  }
  return lookupUrl(nextUrl);
};

export const iDontSeeABackLink = (): void => {
  I.dontSeeElementInDOM(BACK_LINK_SELECTOR);
};
export const iClickBackLink = async (nextUrl?: string | RegExp): Promise<void> => {
  iWaitForVisible(BACK_LINK_SELECTOR);
  await iClickToNavigate(BACK_LINK_SELECTOR, undefined, nextUrl);
};

export const iClickWithdrawLink = async (nextUrl?: string | RegExp): Promise<void> => {
  iWaitForVisible(WITHDRAW_LINK_SELECTOR);
  await iClickToNavigate(WITHDRAW_LINK_SELECTOR, undefined, nextUrl);
};

export const iClickCheckYourAnswersLink = async (nextUrl?: string | RegExp): Promise<void> => {
  iWaitForVisible(CHECK_ANSWERS_SELECTOR);
  await iClickToNavigate(CHECK_ANSWERS_SELECTOR, undefined, nextUrl || VIEW_YOUR_ANSWERS);
};

export const iWaitForUrlParam = (param: string, value: string, wait: number = 10): void => {
  I.waitForFunction(
    ([urlParam, expectedValue]: [string, string]) =>
      new URL(window.location.href).searchParams.get(urlParam) === expectedValue,
    [param, value],
    wait
  );
};

export const iAmOnPage = (urlString: string, user?: string): void => {
  urlString = setUserPathPrefix(urlString, user);
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
  waitUntil: WaitUntil = 'load',
  titleSelector: string = ''
): Promise<void> => {
  const urlType = getTypeOfUrl(nextUrl);

  iWaitForVisible(selector, wait);
  if (urlType === 'empty-string' || urlType === undefined) {
    return iClick(selector, { waitForNavigation: waitUntil });
  }

  let checkTitle: boolean = titleSelector.trim().length > 0;
  if (urlType === 'string') {
    nextUrl = setUserPathPrefix(nextUrl as string);
    if (isInternalPageLink(nextUrl) && !checkTitle) {
      checkTitle = true;
      titleSelector = `#${getPageTitleIdFromUrl(nextUrl as PageLink)}`;
    }
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
  if (checkTitle) {
    I.waitForElement(titleSelector, wait);
  }
};

export const iGoToPageAsUser = (url: string, user?: string): void => {
  iAmOnPage(url, user);
};

export const iGoToPage = (url: string): void => {
  iGoToPageAsUser(url);
};

export const iWaitInUrlAsUser = (url: string, user?: string, wait?: number): void => {
  url = setUserPathPrefix(url, user);
  I.waitInUrl(url, wait);
};

export const iWaitInUrl = (url: string, wait?: number): void => {
  iWaitInUrlAsUser(url, undefined, wait);
};

export const iWaitInErrorPage = (wait?: number): void => {
  iWaitInUrlAsUser(ERROR_PAGE_URL, undefined, wait);
};

export const iWaitInPageNotFoundErrorPage = (wait?: number): void => {
  iWaitInUrlAsUser(lookupUrl(ERROR_PAGE_URL), undefined, wait);
  iWaitForVisible('#pageNotFoundTitle', wait);
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

export const doesCurrentUrlStartWith = async (serviceUrl: string, currentUrl?: string): Promise<boolean> => {
  currentUrl = currentUrl || (await I.grabCurrentUrl());
  return currentUrl.startsWith(serviceUrl);
};

export const iGrabCurrentUrl = async (): Promise<string> => {
  const currentUrl = await I.grabCurrentUrl();
  if (await iAmOnNfd(currentUrl)) {
    return new URL(currentUrl).pathname;
  }
  return currentUrl;
};

export const iAmOnIdam = async (): Promise<boolean> => {
  return doesCurrentUrlStartWith(testConfig.IDAM_WEB_BASE_URL);
};

export const iAmOnNfd = async (currentUrl?: string): Promise<boolean> => {
  return doesCurrentUrlStartWith(testConfig.TEST_URL, currentUrl);
};

export const iAmOnEqualityAndDiversity = async (): Promise<boolean> => {
  return doesCurrentUrlStartWith(testConfig.EQUALITY_URL);
};
