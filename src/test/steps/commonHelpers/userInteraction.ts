import { AxiosResponse } from 'axios';
import { jwtDecode } from 'jwt-decode';

import { OidcResponse, getIdamToken } from '../../../main/app/auth/user/oidc';
import { Gender } from '../../../main/app/case/definition';
import { UserDetails } from '../../../main/app/controller/AppRequest';
import {
  APPLICANT_2,
  ENTER_YOUR_ACCESS_CODE,
  HAS_RELATIONSHIP_BROKEN_URL,
  HOME_URL,
  RESPONDENT,
  SIGN_OUT_URL,
  YOUR_DETAILS_URL,
} from '../../../main/steps/urls';
import { config as testConfig } from '../../config';

import { TestUserAndPassword, TestUserKey } from './IdamUserManager';
import {
  iClickSubmit,
  iEnterValueIntoInput,
  iRejectCookies,
  iSelectRadioValue,
  iWaitForElement,
  iWaitForElementWithText,
} from './elementInteraction';
import { logger } from './logger';
import { iAmOnIdam, iAmOnNfd, iAmOnPage, iClickToNavigate, iWaitInUrl } from './navigation';

const { I } = inject();

const LOGIN_TIMEOUT = 60;

export const APPLICANT_1_FIRST_NAME = 'Sarah';
export const APPLICANT_2_FIRST_NAME = 'John';
export const APPLICANTS_LAST_NAME = 'Smith';

export const iSignOutAndLoginAsUser = async (
  user: TestUserKey,
  expectedUrl?: string,
  expectedElementSelector?: string
): Promise<void> => {
  iSignOut();
  await login(user);
  if (expectedUrl) {
    iWaitInUrl(expectedUrl);
  }
  if (expectedElementSelector) {
    iWaitForElement(expectedElementSelector);
  }
};

export const iClickSignOut = async (): Promise<void> => {
  await iClickToNavigate(
    `#navigation > li > a[href="${SIGN_OUT_URL}"]`,
    LOGIN_TIMEOUT,
    new RegExp(`^${testConfig.IDAM_WEB_BASE_URL.replace(/\/+$/, '')}(?:/|$)`),
    'domcontentloaded'
  );
  testConfig.getIdamUserManager().clearCurrentUser();
};

export const iSignOut = (): void => {
  iAmOnPage(SIGN_OUT_URL);
  testConfig.getIdamUserManager().clearCurrentUser();
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
  iWaitForElementWithText(emailPasswordLabelSelector, modernEmailLabelText, LOGIN_TIMEOUT);
  iEnterEmail(username);
  await iClickSubmit();
  iWaitForElementWithText(emailPasswordLabelSelector, modernPasswordLabelText, LOGIN_TIMEOUT);
  iEnterPassword(password);
  await iClickSubmit();
};

const isModernIdamLogin = async (): Promise<boolean> => {
  const modernIntroSelector = 'div.govuk-grid-row > div.govuk-grid-column-two-thirds > p.govuk-body';
  const modernIntroText = 'You may already have an account if you have used an HMCTS service before';

  try {
    iWaitForElementWithText(modernIntroSelector, modernIntroText, 10);
    return true;
  } catch {
    return false;
  }
};

const iWaitForNfdServiceLink = (timeout = LOGIN_TIMEOUT): void => {
  iWaitForElementWithText('a.govuk-service-navigation__link', 'Apply for a divorce', timeout);
};

const isNfdServiceLinkPresent = (): boolean => {
  try {
    iWaitForNfdServiceLink(10);
    return true;
  } catch {
    return false;
  }
};

const doIdamLogin = async (username: string, password: string, rejectCookies: boolean = true): Promise<void> => {
  if ((await iAmOnNfd()) && isNfdServiceLinkPresent()) {
    await iClickSignOut();
  }
  if (await iAmOnIdam()) {
    const loginHeading = 'Sign in or create an account';
    iWaitForElementWithText('h1', loginHeading, LOGIN_TIMEOUT);

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
  login: async (createCase = true, rejectCookies: boolean = true): Promise<void> => {
    if (createCase) {
      await testConfig.getIdamUserManager().deleteUser(TestUserKey.APPLICANT_1);
    }
    const user = await testConfig.getIdamUserManager().getApplicant1();
    iAmOnPage(HOME_URL);
    await doIdamLogin(user.username, user.password, rejectCookies);

    iWaitForNfdServiceLink();
    if (rejectCookies) {
      await iRejectCookies();
    }
    if (createCase) {
      iAmOnPage(YOUR_DETAILS_URL);
      iSelectRadioValue(Gender.MALE);
      await iClickSubmit();
      iWaitInUrl(HAS_RELATIONSHIP_BROKEN_URL, LOGIN_TIMEOUT);
      iAmOnPage(YOUR_DETAILS_URL);
      iWaitForNfdServiceLink();
    }
    testConfig.getIdamUserManager().setCurrentUser(TestUserKey.APPLICANT_1);
  },
  check: async (): Promise<void> => {
    iAmOnPage(YOUR_DETAILS_URL);
    iWaitForNfdServiceLink();
  },
  restore: (cookies: CodeceptJS.Cookie[]): void => {
    I.amOnPage('/info');
    I.setCookie(cookies);
  },
};

export const autoLoginForApplicant2 = {
  login: async (rejectCookies: boolean = true): Promise<void> => {
    const user = await testConfig.getIdamUserManager().getApplicant2();
    iAmOnPage(APPLICANT_2);
    await doIdamLogin(user.username, user.password, rejectCookies);

    iWaitForNfdServiceLink();
    if (rejectCookies) {
      await iRejectCookies();
    }
    testConfig.getIdamUserManager().setCurrentUser(TestUserKey.APPLICANT_2);
  },
  check: async (): Promise<void> => {
    iAmOnPage(APPLICANT_2 + ENTER_YOUR_ACCESS_CODE);
    iWaitForNfdServiceLink();
  },
  restore: (cookies: CodeceptJS.Cookie[]): void => {
    I.amOnPage('/info');
    I.setCookie(cookies);
  },
};

export const autoLoginForRespondent = {
  login: async (rejectCookies: boolean = true): Promise<void> => {
    const user = await testConfig.getIdamUserManager().getRespondent();
    iAmOnPage(RESPONDENT);
    await doIdamLogin(user.username, user.password, rejectCookies);

    iWaitForNfdServiceLink();
    if (rejectCookies) {
      await iRejectCookies();
    }
    testConfig.getIdamUserManager().setCurrentUser(TestUserKey.RESPONDENT);
  },
  check: async (): Promise<void> => {
    iAmOnPage(APPLICANT_2 + ENTER_YOUR_ACCESS_CODE);
    iWaitForNfdServiceLink();
  },
  restore: (cookies: CodeceptJS.Cookie[]): void => {
    I.amOnPage('/info');
    I.setCookie(cookies);
  },
};

export const login = async (
  userKey: TestUserKey,
  createCase: boolean = false,
  rejectCookies: boolean = true
): Promise<void> => {
  if (userKey === TestUserKey.APPLICANT_1) {
    await autoLogin.login(createCase, rejectCookies);
  } else if (userKey === TestUserKey.APPLICANT_2) {
    await autoLoginForApplicant2.login(rejectCookies);
  } else if (userKey === TestUserKey.RESPONDENT) {
    await autoLoginForRespondent.login(rejectCookies);
  }
};

export const getCurrentUser = (): TestUserAndPassword => {
  const idamUserManager = testConfig.getIdamUserManager();
  return idamUserManager.getCurrentUser();
};

export const getCurrentUserKey = (): TestUserKey => {
  const idamUserManager = testConfig.getIdamUserManager();
  return idamUserManager.getCurrentUserKey();
};

export const getUser = async (userKey: TestUserKey): Promise<TestUserAndPassword> => {
  const idamUserManager = testConfig.getIdamUserManager();
  return idamUserManager.getUser(userKey);
};

export const getUserKeyByIndex = (index: number): TestUserKey => {
  const idamUserManager = testConfig.getIdamUserManager();
  if (index === 1) {
    return TestUserKey.APPLICANT_1;
  } else if (index === 2) {
    return idamUserManager.hasUser(TestUserKey.APPLICANT_2) ? TestUserKey.APPLICANT_2 : TestUserKey.RESPONDENT;
  }
  const errorMessage = `Invalid applicant user index: ${index}`;
  logger.error(errorMessage);
  throw new Error(errorMessage);
};

export const getUserEmail = async (index: number): Promise<string> => {
  const idamUserManager = testConfig.getIdamUserManager();
  const userKey = getUserKeyByIndex(index);
  const user = await idamUserManager.getUser(userKey);
  return user.username;
};

export const getCaseworker = async (): Promise<TestUserAndPassword> => {
  const idamUserManager = testConfig.getIdamUserManager();
  return idamUserManager.getCaseWorker();
};

export const clearNewUsers = async (): Promise<void> => {
  const idamUserManager = testConfig.getIdamUserManager();
  await idamUserManager.clearAndKeepOnlyOriginalUser();
};

export const iGetTheTestUser = async (
  user: { username: string; password: string } = getCurrentUser()
): Promise<UserDetails> => {
  const params = { username: user.username, password: user.password };
  const response: AxiosResponse<OidcResponse> = await getIdamToken(params, params.username);

  const jwt = jwtDecode(response.data.id_token) as {
    uid: string;
    sub: string;
    given_name: string;
    family_name: string;
    roles: string[];
  };

  return {
    accessToken: response.data.access_token,
    id: jwt.uid,
    email: jwt.sub,
    givenName: jwt.given_name,
    familyName: jwt.family_name,
    roles: jwt.roles,
  };
};

export const isApplicant2 = (): boolean => {
  const idamUserManager = testConfig.getIdamUserManager();
  return idamUserManager.isApplicant2();
};

export const isRespondent = (): boolean => {
  const idamUserManager = testConfig.getIdamUserManager();
  return idamUserManager.isRespondent();
};

export const getApplicantNumber = (): number => {
  return isApplicant2() || isRespondent() ? 2 : 1;
};

export const getOtherApplicantNumber = (): number => {
  return isApplicant2() || isRespondent() ? 1 : 2;
};

export const getApplicantString = (): string => {
  return `applicant${getApplicantNumber()}`;
};

export const getOtherApplicantString = (): string => {
  return `applicant${getOtherApplicantNumber()}`;
};

const getFirstName = (otherParty: boolean = false): string => {
  if (otherParty) {
    return isApplicant2() || isRespondent() ? APPLICANT_1_FIRST_NAME : APPLICANT_2_FIRST_NAME;
  }
  return isApplicant2() || isRespondent() ? APPLICANT_2_FIRST_NAME : APPLICANT_1_FIRST_NAME;
};

export const getMyName = (): { firstName: string; lastName: string } => {
  return { firstName: getFirstName(), lastName: APPLICANTS_LAST_NAME };
};

export const getTheirName = (): { firstName: string; lastName: string } => {
  return { firstName: getFirstName(true), lastName: APPLICANTS_LAST_NAME };
};
