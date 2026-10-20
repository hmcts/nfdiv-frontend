import {
  APPLICANT_2,
  ENTER_YOUR_ACCESS_CODE,
  HAS_RELATIONSHIP_BROKEN_URL,
  HOME_URL,
  SIGN_OUT_URL,
  YOUR_DETAILS_URL,
} from '../../../main/steps/urls';
import { TestUserType, config as testConfig } from '../../config';

import { TestUserAndPassword } from './IdamUserManager';
import { iClickElement, iClickSubmit, iEnterValueIntoInput, iWaitForElementWithText } from './elementInteraction';
import { iAmOnPage, iClickToNavigate, iWaitInUrl } from './navigation';

const { I } = inject();

const LOGIN_TIMEOUT = 60;

const idamUserManager = testConfig.getIdamUserManager();
const defaultTestUser = idamUserManager.getDefaultTestUser();

export const iClickSignOut = (): void => {
  iClickToNavigate(
    `#navigation > li > a[href="${SIGN_OUT_URL}"]`,
    LOGIN_TIMEOUT,
    /^https?:\/\/idam-web-public[^/]*\//,
    'domcontentloaded'
  );
};

export const iSignOut = (): void => {
  I.amOnPage(SIGN_OUT_URL);
};

const iClickSignIn = (): void => {
  iClickToNavigate('a.govuk-button[href="/enter-email"]', LOGIN_TIMEOUT);
};

const iEnterUsername = (username: string): void => {
  iEnterValueIntoInput(username, '#username');
};

const iEnterEmail = (email: string): void => {
  iEnterValueIntoInput(email, '#email');
};

const iEnterPassword = (password: string): void => {
  iEnterValueIntoInput(password, '#password');
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
    iClickSignOut();
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
    username = defaultTestUser.username,
    password = defaultTestUser.password,
    createCase = true
  ): Promise<void> => {
    I.amOnPage(HOME_URL);
    await doIdamLogin(username, password);

    await iWaitForNfdServiceLink();
    if (createCase) {
      iAmOnPage(YOUR_DETAILS_URL);
      iClickElement('#male');
      await iClickSubmit();
      iWaitInUrl(HAS_RELATIONSHIP_BROKEN_URL, LOGIN_TIMEOUT);
      iAmOnPage(YOUR_DETAILS_URL);
      await iWaitForNfdServiceLink();
    }
  },
  check: async (): Promise<void> => {
    iAmOnPage(YOUR_DETAILS_URL);
    await iWaitForNfdServiceLink();
  },
  restore: (cookies: CodeceptJS.Cookie[]): void => {
    I.amOnPage('/info');
    I.setCookie(cookies);
  },
};

export const autoLoginForApplicant2 = {
  login: async (username = defaultTestUser.username, password = defaultTestUser.password): Promise<void> => {
    iAmOnPage(APPLICANT_2);
    await doIdamLogin(username, password);

    await iWaitForNfdServiceLink();
  },
  check: async (): Promise<void> => {
    iAmOnPage(APPLICANT_2 + ENTER_YOUR_ACCESS_CODE);
    await iWaitForNfdServiceLink();
  },
  restore: (cookies: CodeceptJS.Cookie[]): void => {
    I.amOnPage('/info');
    I.setCookie(cookies);
  },
};

export const login = async (userType: TestUserType): Promise<void> => {
  if (userType === TestUserType.CITIZEN) {
    await autoLogin.login();
    return;
  }

  const user = await idamUserManager.createUser();
  if (userType === TestUserType.CITIZEN_SINGLETON) {
    await autoLogin.login(user.username, user.password);
  } else {
    await autoLoginForApplicant2.login(user.username, user.password);
  }
};

export const autoLoginWithUserIndex = async (userIndex: number, createCase: boolean = false): Promise<void> => {
  const user = idamUserManager.getUser(userIndex);
  await autoLogin.login(user.username, user.password, createCase);
};

export const getCurrentUser = (): TestUserAndPassword => {
  return idamUserManager.getCurrentUser();
};

export const getUser = (index: number): TestUserAndPassword => {
  return idamUserManager.getUser(index);
};

export const getUserEmail = (index: number): string => {
  return idamUserManager.getUser(index).username;
};

export const getOrCreateCaseWorker = async (): Promise<TestUserAndPassword> => {
  let caseWorker = idamUserManager.getCaseWorker();
  if (!caseWorker.username) {
    caseWorker = await idamUserManager.createCaseWorker();
  }
  return caseWorker;
};

export const clearNewUsers = async (): Promise<void> => {
  await idamUserManager.clearAndKeepOnlyOriginalUser();
};
