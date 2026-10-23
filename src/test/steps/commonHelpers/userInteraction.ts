import { Gender } from '../../../main/app/case/definition';
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
import {
  iClickSubmit,
  iEnterValueIntoInput,
  iRejectCookies,
  iSelectRadioValue,
  iWaitForElementWithText,
} from './elementInteraction';
import { iAmOnIdam, iAmOnNfd, iAmOnPage, iClickToNavigate, iWaitInUrl } from './navigation';

const { I } = inject();

const LOGIN_TIMEOUT = 60;

export const iClickSignOut = async (): Promise<void> => {
  await iClickToNavigate(
    `#navigation > li > a[href="${SIGN_OUT_URL}"]`,
    LOGIN_TIMEOUT,
    new RegExp(`^${testConfig.IDAM_WEB_BASE_URL.replace(/\/+$/, '')}(?:/|$)`),
    'domcontentloaded'
  );
};

export const iSignOut = (): void => {
  I.amOnPage(SIGN_OUT_URL);
};

const iClickSignIn = async (): Promise<void> => {
  await iClickToNavigate('a.govuk-button[href="/enter-email"]', LOGIN_TIMEOUT);
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

  await iClickSignIn();
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

const doIdamLogin = async (username: string, password: string, rejectCookies: boolean = true): Promise<void> => {
  if ((await iAmOnNfd()) && (await isNfdServiceLinkPresent())) {
    await iClickSignOut();
  }
  if (await iAmOnIdam()) {
    const loginHeading = 'Sign in or create an account';
    await iWaitForElementWithText('h1', loginHeading, LOGIN_TIMEOUT);

    if (rejectCookies) {
      await iRejectCookies();
    }

    if (await isModernIdamLogin()) {
      await doModernLogin(username, password);
      return;
    }

    await doClassicLogin(username, password);
  }
};

export const autoLogin = {
  login: async (
    user = testConfig.getIdamUserManager().getDefaultTestUser(),
    createCase = true,
    rejectCookies: boolean = true
  ): Promise<void> => {
    I.amOnPage(HOME_URL);
    await doIdamLogin(user.username, user.password, rejectCookies);

    await iWaitForNfdServiceLink();
    if (rejectCookies) {
      await iRejectCookies();
    }
    if (createCase) {
      iAmOnPage(YOUR_DETAILS_URL);
      iSelectRadioValue(Gender.MALE);
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
  login: async (
    user = testConfig.getIdamUserManager().getDefaultTestUser(),
    rejectCookies: boolean = true
  ): Promise<void> => {
    iAmOnPage(APPLICANT_2);
    await doIdamLogin(user.username, user.password, rejectCookies);

    await iWaitForNfdServiceLink();
    if (rejectCookies) {
      await iRejectCookies();
    }
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

export const login = async (userType: TestUserType, rejectCookies: boolean = true): Promise<void> => {
  const idamUserManager = testConfig.getIdamUserManager();
  if (userType === TestUserType.CITIZEN) {
    await autoLogin.login(undefined, undefined, rejectCookies);
    return;
  }

  const user = await idamUserManager.createUser();
  if (userType === TestUserType.CITIZEN_SINGLETON) {
    await autoLogin.login(user, undefined, rejectCookies);
  } else {
    await autoLoginForApplicant2.login(user, rejectCookies);
  }
};

export const autoLoginWithUserIndex = async (
  userIndex: number,
  createCase: boolean = false,
  rejectCookies: boolean = true
): Promise<void> => {
  const user = getUser(userIndex);
  await autoLogin.login(user, createCase, rejectCookies);
};

export const getCurrentUser = (): TestUserAndPassword => {
  const idamUserManager = testConfig.getIdamUserManager();
  return idamUserManager.getCurrentUser();
};

export const getUser = (index: number): TestUserAndPassword => {
  const idamUserManager = testConfig.getIdamUserManager();
  return idamUserManager.getUser(index);
};

export const getUserEmail = (index: number): string => {
  const idamUserManager = testConfig.getIdamUserManager();
  return idamUserManager.getUser(index).username;
};

export const getOrCreateCaseWorker = async (): Promise<TestUserAndPassword> => {
  const idamUserManager = testConfig.getIdamUserManager();
  let caseWorker = idamUserManager.getCaseWorker();
  if (!caseWorker.username) {
    caseWorker = await idamUserManager.createCaseWorker();
  }
  return caseWorker;
};

export const clearNewUsers = async (): Promise<void> => {
  const idamUserManager = testConfig.getIdamUserManager();
  await idamUserManager.clearAndKeepOnlyOriginalUser();
};
