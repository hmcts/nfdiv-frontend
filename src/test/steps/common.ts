import { Logger as hmctsLogger } from '@hmcts/nodejs-logging';
import { AxiosResponse } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Logger, transports } from 'winston';

import { OidcResponse, getIdamToken } from '../../main/app/auth/user/oidc';
import { Case } from '../../main/app/case/case';
import { CaseApi, getCaseApi } from '../../main/app/case/case-api';
import {
  ApplicationType,
  CASEWORKER_ISSUE_APPLICATION,
  CASEWORKER_REQUEST_FOR_INFORMATION,
  CITIZEN_UPDATE_CASE_STATE_AAT,
  ConditionalOrderCourt,
  DivorceOrDissolution,
  SYSTEM_UPDATE_CASE_COURT_HEARING,
  State,
} from '../../main/app/case/definition';
import { toApiFormat } from '../../main/app/case/to-api-format';
import { UserDetails } from '../../main/app/controller/AppRequest';
import { addConnectionsBasedOnQuestions } from '../../main/app/jurisdiction/connections';
import { SupportedLanguages } from '../../main/modules/i18n';
import {
  APPLICANT_1,
  APPLICANT_2,
  CHECK_JURISDICTION,
  ENTER_YOUR_ACCESS_CODE,
  HOME_URL,
  HOW_DO_YOU_WANT_TO_APPLY,
  THEIR_EMAIL_ADDRESS,
} from '../../main/steps/urls';
import { TestUserType, config as testConfig } from '../config';

import { autoLogin, iSignOut, login } from './login';
import { urlLookup } from './urlLookup';

const logger = hmctsLogger.getLogger('common-steps');
const { I } = inject();

Before(test => {
  // Retry failed scenarios x times
  test.retries(3);
});

After(async () => {
  await testConfig.clearNewUsers();
});

export const iAmOnPage = (text: string): void => {
  const url = new URL(text, testConfig.TEST_URL);
  if (!url.searchParams.has('lng')) {
    url.searchParams.set('lng', SupportedLanguages.En);
  }
  I.amOnPage(url.toString());
};

const getUserPrefix = (user: string | null): string => {
  let userPrefix = '';
  if (user) {
    userPrefix = urlLookup[user.toUpperCase()];
    if (!userPrefix) {
      userPrefix = user;
    }
  }
  return userPrefix;
};

export const iGoToPage = (url: string, user: string | null = null): void => {
  const userPrefix = getUserPrefix(user);

  const definedUrl = urlLookup[url];
  if (definedUrl) {
    iAmOnPage(userPrefix + definedUrl);
  } else {
    iAmOnPage(userPrefix + url);
  }
};

export const iWaitInUrl = (url: string, user: string | null = null): void => {
  const userPrefix = getUserPrefix(user);

  const definedUrl = urlLookup[url];
  if (definedUrl) {
    I.waitInUrl(userPrefix + definedUrl);
  } else {
    I.waitInUrl(userPrefix + url);
  }
};

Given('I go to {string} {string}', (user: string, url: string) => {
  iGoToPage(url, user);
});
Given('I go to {string}', (url: string) => {
  iGoToPage(url);
});
Given('I go to applicant1 {string}', (url: string) => {
  iGoToPage(url, 'APPLICANT_1');
});
Given('I go to respondent {string}', (url: string) => {
  iGoToPage(url, 'RESPONDENT');
});
Given('I go to applicant2 {string}', (url: string) => {
  iGoToPage(url, 'APPLICANT_2');
});

Then('the page URL should be {string} {string}', (user: string, url: string) => {
  iWaitInUrl(url, user);
});
Then('the page URL should be {string}', (url: string) => {
  iWaitInUrl(url);
});
Then('the page URL should be applicant1 {string}', (url: string) => {
  iWaitInUrl(url, 'APPLICANT_1');
});
Then('the page URL should be respondent {string}', (url: string) => {
  iWaitInUrl(url, 'RESPONDENT');
});
Then('the page URL should be applicant2 {string}', (url: string) => {
  iWaitInUrl(url, 'APPLICANT_2');
});

Given('I login', async () => {
  await login(TestUserType.CITIZEN);
});

Given('I create a new user and login', async () => {
  await login(TestUserType.CITIZEN_SINGLETON);
});

Given('I create a new user and login as applicant 2', async () => {
  await login(TestUserType.CITIZEN_APPLICANT_2);
});

Given('I login with applicant {string}', async (applicant: string) => {
  await autoLogin.login(
    testConfig.GetUser(parseInt(applicant)).username,
    testConfig.GetUser(parseInt(applicant)).password,
    false
  );
});

export const iClick = (text: string, locator?: CodeceptJS.LocatorOrString, wait?: number): void => {
  I.waitForText(text, wait);
  I.click(locator || text);
};

export const iClickElement = (elemId: string, wait?: number): void => {
  I.waitForElement(elemId, wait);
  I.click(elemId);
};

export const iClickSubmit = async (): Promise<void> => {
  const submitSelector = await I.executeScript(() =>
    document.getElementById('main-form-submit')
      ? '#main-form-submit'
      : 'button[type="submit"]:not(.document-delete-button)'
  );

  iClickElement(submitSelector as string);
};

export const iRejectCookies = (): void => {
  iClickElement('button.cookie-banner-reject-button');
  iClickElement('button.cookie-banner-hide-button');
};

When('I reject cookies', iRejectCookies);

export const iWait = (time: number): void => {
  I.wait(time);
};

export const iWaitForElementWithText = async (selector: string, text: string, timeout: number): Promise<void> => {
  I.waitForText(text, timeout, selector);
};

export const iClickMoreDetailsComponent = (): void => {
  I.click("span[class='govuk-details__summary-text']");
};

When('I click {string}', iClick);
When('I select {string}', iClick);
When('I click for more details', iClickMoreDetailsComponent);
When('I wait {string} seconds', iWait);

When('I click yes', () => {
  iClickElement('#yes');
});
When('I click no', () => {
  iClickElement('#no');
});

export const checkOptionFor = (optionLabel: string, fieldLabel: string): void =>
  I.checkOption(optionLabel, `//*[contains(text(), '${fieldLabel}')]/..`);
When('I select {string} for {string}', (optionLabel: string, fieldLabel: string) => {
  checkOptionFor(optionLabel, fieldLabel);
});

Given('I choose {string} from {string}', (option: string, select: string) => {
  I.selectOption(select, option);
});

Then('I expect the page title to be {string}', (title: string) => {
  I.seeInTitle(title);
});

Then('the page should include {string}', (text: string) => {
  I.waitForText(text);
});

Then('the page should include element {string}', (elemId: string) => {
  I.waitForElement(elemId);
});

Then('the page should not include element {string}', (elemId: string) => {
  I.dontSeeElementInDOM(elemId);
});

Then('the page should include visible element {string}', (elemId: string) => {
  I.waitForVisible(elemId + ':not(.hidden)');
});

When('I select element {string}', iClickElement);
When('I click element {string}', iClickElement);

When('I click back', () => {
  iClickElement('a.govuk-back-link');
});

When('I toggle language to Welsh', () => {
  iClickElement('a.govuk-link.language[lang="cy"]');
});
When('I toggle language to English', () => {
  iClickElement('a.govuk-link.language[lang="en"]');
});

When('I click start', () => {
  iClickElement('.govuk-button--start');
});

When('I sign out', iSignOut);

When('I click find address', () => {
  iClickElement('#findAddressButton');
});
When('I cannot find the address in the list', () => {
  iClickElement('#cannotFindAddress');
});
When('I have an international address', () => {
  iClickElement('#cannot-enter-uk-postcode');
});

When('I click submit', iClickSubmit);
When('I click continue', iClickSubmit);
When('I click send for review', iClickSubmit);
When('I click submit application', iClickSubmit);
When('I click continue to payment', iClickSubmit);
When('I click pay and submit application', iClickSubmit);
When('I click accept and send', iClickSubmit);
When('I click save and sign out', () => {
  iClickElement('#saveAndSignOutButton');
});
When('I click provide information', () => {
  iClickElement('#provideInformationButton');
});
When('I click apply for conditional order', () => {
  iClickElement('#applyForConditionalOrderButton');
});
When('I click apply for final order', () => {
  iClickElement('#applyForFinalOrderButton');
});
When('I click confirm', iClickSubmit);
When('I click continue to the next steps', () => {
  iClickElement('a.govuk-button[href="/return-to-service"]');
});
When('I click respond to the application', () => {
  iClickElement('#respondToTheApplicationButton');
});

When('I confirm the prayer and statement of truth', () => {
  iClickElement('#iConfirmPrayer');
  iClickElement('#statementOfTruth');
});
When('I confirm the statement of truth', () => {
  iClickElement('#statementOfTruth');
});
When('I have read the application for divorce', () => {
  iClickElement('#confirmReadPetitionId');
});

Then('the page should show an error for field {string}', (fieldName: string) => {
  I.waitForElement(".govuk-error-summary__body > ul.govuk-error-summary__list > li > a[href='#" + fieldName + "']");
});

Then('the page should show an error for field {string}', (fieldName: string) => {
  I.waitForElement(".govuk-error-summary__body > ul.govuk-error-summary__list > li > a[href='#" + fieldName + "']");
});

Then('I wait until the page contains image {string}', (text: string) => {
  I.waitForText(text, 30);
});

Then('I wait until the page contains file element {string}', (elemId: string) => {
  I.waitForElement(elemId, 30);
});

Then('the page should not include {string}', (text: string) => {
  I.dontSee(text);
});

Then("I wait until the page doesn't contain {string}", (text: string) => {
  I.waitForFunction(content => document.body.textContent?.search(content) === -1, [text], 20);
});

Then('the form input {string} should be {string}', (formInput: string, value: string) => {
  I.seeInField(formInput, value);
});

Then('I type {string}', (text: string) => {
  I.type(text);
});

Given('I type my own email address', async () => {
  const user = testConfig.GetCurrentUser();
  const testUser = await iGetTheTestUser(user);
  I.type(testUser.email);
});

Given('I use an invalid CSRF token', async () => {
  await I.executeScript(() => {
    const el = document.querySelector('input[name="_csrf"]');
    if (el) {
      el.setAttribute('value', 'invalid-token');
    }
  });
});

export const iClearTheForm = async (): Promise<void> => {
  await I.executeScript(() => {
    const checkedInputs = document.querySelectorAll('input:checked') as NodeListOf<HTMLInputElement>;
    for (const checkedInput of checkedInputs) {
      checkedInput.checked = false;
    }

    const clearInputs = (inputs: NodeListOf<HTMLInputElement | HTMLTextAreaElement>) => {
      for (const input of inputs) {
        input.value = '';
      }
    };

    clearInputs(document.querySelectorAll('textarea'));
    clearInputs(document.querySelectorAll('input[type="text"]'));
  });
  await I.grabCurrentUrl();
};
Given('I clear the form', iClearTheForm);

Given("I've said I'm applying as a joint application", async () => {
  I.amOnPage(HOW_DO_YOU_WANT_TO_APPLY);
  await iClearTheForm();
  I.checkOption(`#${ApplicationType.JOINT_APPLICATION}`);
  await iClickSubmit();
});

Given("I've said I do not have my husband's email address", async () => {
  I.amOnPage(THEIR_EMAIL_ADDRESS);
  await iClearTheForm();
  I.checkOption('#doNotKnowEmailAddress');
  await iClickSubmit();
});

Given('I delete any previously uploaded files', async () => {
  const locator = 'button.document-delete-button';
  let numberOfElements = await I.grabNumberOfVisibleElements(locator);

  const maxRetries = 10;
  let i = 0;
  while (numberOfElements > 0 && i < maxRetries) {
    iClickElement('button.document-delete-button');
    I.wait(2); // Wait for the deletion to complete and the page to update
    numberOfElements = await I.grabNumberOfVisibleElements(locator);
    i++;
  }

  if (numberOfElements > 0) {
    throw new Error('Unable to delete previously uploaded files');
  }
});

When('I upload the file {string}', (pathToFile: string) => {
  I.attachFile('input[type="file"]', pathToFile);
});

When('I enter my valid case reference and valid access code', async () => {
  I.amOnPage(HOME_URL);
  await iClearTheForm();

  const user = testConfig.GetCurrentUser();
  const testUser = await iGetTheTestUser(user);
  const caseApi = iGetTheCaseApi(testUser);
  const userCase = await caseApi.getExistingUserCase(DivorceOrDissolution.DIVORCE);

  if (userCase) {
    const fetchedCase = await caseApi.getCaseById(userCase.id);

    const caseReference = userCase.id;
    const accessCode = fetchedCase.accessCode;

    if (!caseReference || !accessCode) {
      throw new Error(`No case reference or access code was returned for ${testUser}`);
    }

    iClickElement('#navigation > li > a[href="/logout"]');
    await login(TestUserType.CITIZEN_APPLICANT_2);
    I.amOnPage(APPLICANT_2 + ENTER_YOUR_ACCESS_CODE);

    iClickElement('#caseReference');
    I.type(caseReference);
    iClickElement('#accessCode');
    I.type(accessCode);
    await iClickSubmit();
  } else {
    logger.error('Could not get case data as ' + user.username);
    process.exit(-1);
  }
});

When('I as applicant1 enter my valid case reference and valid access code', async () => {
  I.amOnPage(HOME_URL);
  await iClearTheForm();

  const user = testConfig.GetCurrentUser();
  const testUser = await iGetTheTestUser(user);
  const caseApi = iGetTheCaseApi(testUser);
  const userCase = await caseApi.getExistingUserCase(DivorceOrDissolution.DIVORCE);

  if (userCase) {
    const fetchedCase = await caseApi.getCaseById(userCase.id);

    const caseReference = userCase.id;
    const accessCode = fetchedCase.accessCodeApplicant1;

    if (!caseReference || !accessCode) {
      throw new Error(`No case reference or access code was returned for Applicant1 ${testUser}`);
    }

    iClickElement('#navigation > li > a[href="/logout"]');
    await login(TestUserType.CITIZEN_SINGLETON);
    I.amOnPage(APPLICANT_1 + ENTER_YOUR_ACCESS_CODE);

    iClickElement('#caseReference');
    I.type(caseReference);
    iClickElement('#accessCode');
    I.type(accessCode);
    await iClickSubmit();
  } else {
    logger.error('Could not get case data as ' + user.username);
    process.exit(-1);
  }
});

When('a case worker issues a request for information', async () => {
  await triggerAnEvent(CASEWORKER_REQUEST_FOR_INFORMATION, {
    requestForInformationSoleParties: 'applicant',
    requestForInformationDetails: 'test',
  });
});

When('a case worker issues a request for information to a third party', async () => {
  await triggerAnEvent(CASEWORKER_REQUEST_FOR_INFORMATION, {
    requestForInformationSoleParties: 'other',
    requestForInformationDetails: 'test',
    requestForInformationName: 'third party',
    requestForInformationEmailAddress: 'thirdparty@hmcts.net',
  });
});

When('a case worker issues a request for information to app1 on a joint case', async () => {
  await triggerAnEvent(CASEWORKER_REQUEST_FOR_INFORMATION, {
    requestForInformationJointParties: 'applicant1',
    requestForInformationDetails: 'test',
  });
});

When('a case worker issues a request for information to app2 on a joint case', async () => {
  await triggerAnEvent(CASEWORKER_REQUEST_FOR_INFORMATION, {
    requestForInformationJointParties: 'applicant2',
    requestForInformationDetails: 'test',
  });
});

When('a case worker issues a request for information to both parties on a joint case', async () => {
  await triggerAnEvent(CASEWORKER_REQUEST_FOR_INFORMATION, {
    requestForInformationJointParties: 'both',
    requestForInformationDetails: 'test',
  });
});

When('a case worker issues a request for information to a third party on a joint case', async () => {
  await triggerAnEvent(CASEWORKER_REQUEST_FOR_INFORMATION, {
    requestForInformationJointParties: 'other',
    requestForInformationDetails: 'test',
    requestForInformationName: 'third party',
    requestForInformationEmailAddress: 'thirdparty@hmcts.net',
  });
});

When('a case worker issues the application', async () => {
  await triggerAnEvent(CASEWORKER_ISSUE_APPLICATION, { ceremonyPlace: 'Somewhere' });
});

When('a case worker updates court case hearing', async () => {
  await triggerAnEvent(SYSTEM_UPDATE_CASE_COURT_HEARING, {
    coDateAndTimeOfHearing: '2021-11-10T00:00:00.000',
    coCourt: ConditionalOrderCourt.BIRMINGHAM,
    coDecisionDate: '2021-05-10',
  });
});

When('a superuser updates {string} with {string}', async (field: string, value: string) => {
  const data = {};
  data[field] = value;
  await triggerAnEvent(CITIZEN_UPDATE_CASE_STATE_AAT, data);
});

When('I pause the test', () => pause());

When('I reset the jurisdiction connections', async () => {
  const userCaseObj = {
    connections: null,
    applicant1LifeBasedInEnglandAndWales: null,
    applicant2LifeBasedInEnglandAndWales: null,
    applicant1DomicileInEnglandWales: null,
    applicant2DomicileInEnglandWales: null,
    bothLastHabituallyResident: null,
    applicant1LivingInEnglandWalesTwelveMonths: null,
    applicant1LivingInEnglandWalesSixMonths: null,
    jurisdictionResidualEligible: null,
  };
  await executeUserCaseScript(userCaseObj);
  I.amOnPage(CHECK_JURISDICTION);
  await iClickSubmit();
});

const triggerAnEvent = async (eventName: string, userData: Partial<Case>) => {
  I.amOnPage(HOME_URL);
  await iClearTheForm();

  const user = testConfig.GetCurrentUser();
  const testUser = await iGetTheTestUser(user);
  const caseApi = iGetTheCaseApi(testUser);
  const userCase = await caseApi.getExistingUserCase(DivorceOrDissolution.DIVORCE);

  if (userCase) {
    const caseReference = userCase.id;

    if (!caseReference) {
      throw new Error(`No case reference or access code was returned for ${testUser}`);
    }

    const cwUser = await testConfig.GetOrCreateCaseWorker();
    const caseWorker = await iGetTheTestUser(cwUser);
    const cwCaseApi = iGetTheCaseApi(caseWorker);
    await cwCaseApi.triggerEvent(caseReference, userData, eventName);
  } else {
    logger.error('Could not get case data as ' + user.username);
    process.exit(-1);
  }
};

export const iGetTheTestUser = async (user: { username: string; password: string }): Promise<UserDetails> => {
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

export const iGetTheCaseApi = (testUser: UserDetails): CaseApi => {
  const caseApiLogger = new Logger({
    transports: [new transports.Console(), new transports.File({ filename: 'test.log' })],
  });

  return getCaseApi(testUser, caseApiLogger);
};

export const iSetTheUsersCaseTo = async (userCaseObj: Partial<BrowserCase>): Promise<void> =>
  executeUserCaseScript(userCaseObj);

const executeUserCaseScript = async data => {
  await I.grabCurrentUrl();

  const user = testConfig.GetCurrentUser();
  const testUser = await iGetTheTestUser(user);
  const api = iGetTheCaseApi(testUser);

  // add a delay after logging a user in because it creates an extra case that needs to be added to the ES index
  await new Promise(resolve => setTimeout(resolve, 2000));
  const userCase = await api.getExistingUserCase(DivorceOrDissolution.DIVORCE);

  if (userCase) {
    data.applicant2MiddleNames = data.state || userCase.state;

    const connections = addConnectionsBasedOnQuestions(data);

    // don't set as applicant 2 as they don't have permission
    data.connections = connections.length > 0 ? connections : undefined;

    try {
      await api.triggerEvent(userCase.id, data, CITIZEN_UPDATE_CASE_STATE_AAT);
    } catch (error) {
      logger.error('Could not set fixture data as ' + user.username);
      logger.error(toApiFormat(data));
      process.exit(-1);
    }
  }
};

export interface BrowserCase extends Case {
  state: State;
}
