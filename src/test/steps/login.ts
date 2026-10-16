import {
  APPLICANT_2,
  ENTER_YOUR_ACCESS_CODE,
  HAS_RELATIONSHIP_BROKEN_URL,
  HOME_URL,
  YOUR_DETAILS_URL,
} from '../../main/steps/urls';
import { TestUserType, config as testConfig } from '../config';

import { iClickElement, iClickSubmit, iWaitForElementWithText } from './common';

const { I } = inject();

const LOGIN_TIMEOUT = 60;

export const iSignOut = (): void => {
  iClickElement('#navigation > li > a[href="/logout"]');
  I.waitForURL(/^https?:\/\/idam-web-public[^/]*\//, { waitUntil: 'domcontentloaded' });
};

const iClickSignIn = (): void => {
  const signInButtonSelector = 'a.govuk-button[href="/enter-email"]';
  I.waitForElement(signInButtonSelector, LOGIN_TIMEOUT);
  I.click(signInButtonSelector);
};

const iEnterCredential = (credential: string, inputSelector: string): void => {
  I.waitForElement(inputSelector);
  I.fillField(inputSelector, credential);
};

const iEnterUsername = (username: string): void => {
  iEnterCredential(username, '#username');
};

const iEnterEmail = (email: string): void => {
  iEnterCredential(email, '#email');
};

const iEnterPassword = (password: string): void => {
  iEnterCredential(password, '#password');
};

const doClassicLogin = async (username: string, password: string): Promise<void> => {
  iEnterUsername(username);
  iEnterPassword(password);
  await iClickSubmit();
};

const doModernLogin = async (username: string, password: string): Promise<void> => {
  const emailPasswordLabelSelector = 'label.govuk-label.govuk-label--l';
  const modernEmailLabelText = 'Enter your email address';
  const modernPasswordLabelText = 'Enter your password';

  iClickSignIn();
  await iWaitForElementWithText(emailPasswordLabelSelector, modernEmailLabelText, LOGIN_TIMEOUT);
  iEnterEmail(username);
  await iClickSubmit();
  await iWaitForElementWithText(emailPasswordLabelSelector, modernPasswordLabelText, LOGIN_TIMEOUT);
  iEnterPassword(password);
  await iClickSubmit();
};

const isModernIdamLogin = async (): Promise<boolean> => {
  const modernIntroSelector = 'div.govuk-grid-row > div.govuk-grid-column-two-thirds > p.govuk-body';
  const modernIntroText = 'You may already have an account if you have used an HMCTS service before';

  try {
    await iWaitForElementWithText(modernIntroSelector, modernIntroText, 10);
    return true;
  } catch {
    return false;
  }
};

const iWaitForNfdServiceLink = async (timeout = LOGIN_TIMEOUT): Promise<void> => {
  await iWaitForElementWithText('a.govuk-service-navigation__link', 'Apply for a divorce', timeout);
};

const isNfdServiceLinkPresent = async (): Promise<boolean> => {
  try {
    await iWaitForNfdServiceLink(10);
    return true;
  } catch {
    return false;
  }
};

const doesUrlHostStartWith = (url: string, prefix: string): boolean => {
  try {
    return new URL(url).hostname.startsWith(prefix);
  } catch {
    return false;
  }
};

const doIdamLogin = async (username: string, password: string): Promise<void> => {
  let currentPageUrl = await I.grabCurrentUrl();
  if (currentPageUrl.startsWith(testConfig.TEST_URL) && (await isNfdServiceLinkPresent())) {
    iSignOut();
    currentPageUrl = await I.grabCurrentUrl();
  }
  if (doesUrlHostStartWith(currentPageUrl, 'idam-web-public')) {
    const loginHeading = 'Sign in or create an account';
    await iWaitForElementWithText('h1', loginHeading, LOGIN_TIMEOUT);

    if (await isModernIdamLogin()) {
      await doModernLogin(username, password);
      return;
    }

    await doClassicLogin(username, password);
  }
};

export const autoLogin = {
  login: async (
    username = testConfig.getTestUser(),
    password = testConfig.getTestPass(),
    createCase = true
  ): Promise<void> => {
    I.amOnPage(HOME_URL);
    await doIdamLogin(username, password);

    await iWaitForNfdServiceLink();
    if (createCase) {
      I.amOnPage(YOUR_DETAILS_URL);
      iClickElement('#male');
      await iClickSubmit();
      I.waitInUrl(HAS_RELATIONSHIP_BROKEN_URL, LOGIN_TIMEOUT);
      I.amOnPage(YOUR_DETAILS_URL);
      await iWaitForNfdServiceLink();
    }
  },
  check: async (): Promise<void> => {
    I.amOnPage(`${YOUR_DETAILS_URL}?lng=en`);
    await iWaitForNfdServiceLink();
  },
  restore: (cookies: CodeceptJS.Cookie[]): void => {
    I.amOnPage('/info');
    I.setCookie(cookies);
  },
};

export const autoLoginForApplicant2 = {
  login: async (username = testConfig.getTestUser(), password = testConfig.getTestPass()): Promise<void> => {
    I.amOnPage(APPLICANT_2);
    await doIdamLogin(username, password);

    await iWaitForNfdServiceLink();
  },
  check: async (): Promise<void> => {
    I.amOnPage(`${APPLICANT_2 + ENTER_YOUR_ACCESS_CODE}?lng=en`);
    await iWaitForNfdServiceLink();
  },
  restore: (cookies: CodeceptJS.Cookie[]): void => {
    I.amOnPage('/info');
    I.setCookie(cookies);
  },
};

export const login = async (userType: TestUserType): Promise<void> => {
  const idamUserManager = testConfig.getIdamUserManager();
  const TestPass = testConfig.getTestPass();
  let username: string;
  switch (userType) {
    case TestUserType.CITIZEN:
      await autoLogin.login();
      break;
    case TestUserType.CITIZEN_SINGLETON:
      username = testConfig.generateTestUsername();
      await idamUserManager.createUser(username, TestPass);
      await autoLogin.login(username, TestPass);
      break;
    case TestUserType.CITIZEN_APPLICANT_2:
      username = testConfig.generateTestUsername();
      await idamUserManager.createUser(username, TestPass);
      await autoLoginForApplicant2.login(username, TestPass);
      break;
  }
};
