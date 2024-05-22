import { AxiosResponse } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Logger, transports } from 'winston';

import { OidcResponse, getIdamToken } from '../../main/app/auth/user/oidc';
import { Case } from '../../main/app/case/case';
import { CaseApi, getCaseApi } from '../../main/app/case/case-api';
import {
  CASEWORKER_ISSUE_APPLICATION,
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
import { APPLICANT_2, CHECK_JURISDICTION, ENTER_YOUR_ACCESS_CODE, HOME_URL } from '../../main/steps/urls';
import { autoLogin, config as testConfig } from '../config';

const { I, login } = inject();

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
Given('I go to {string}', iAmOnPage);

Then('the page URL should be {string}', (url: string) => {
  I.waitInUrl(url);
});

Given('I login', async () => {
  await login('citizen');
});

Given('I create a new user and login', async () => {
  await login('citizenSingleton');
});

Given('I create a new user and login as applicant 2', async () => {
  await login('citizenApplicant2');
});

Given('I login with applicant {string}', async (applicant: string) => {
  autoLogin.login(
    I,
    testConfig.GetUser(parseInt(applicant)).username,
    testConfig.GetUser(parseInt(applicant)).password,
    false
  );
});

export const iClick = (text: string, locator?: CodeceptJS.LocatorOrString, wait?: number): void => {
  I.waitForText(text, wait);
  I.click(locator || text);
};

export const iWait = (time: number): void => {
  I.wait(time);
};

export const iClickMoreDetailsComponent = (): void => {
  I.click("span[class='govuk-details__summary-text']");
};

When('I click {string}', iClick);
When('I select {string}', iClick);
When('I click for more details', iClickMoreDetailsComponent);
When('I wait {string} seconds', iWait);

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

Then('I wait until the page contains image {string}', (text: string) => {
  I.waitForText(text, 120);
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
  I.amOnPage('/how-do-you-want-to-apply');
  await iClearTheForm();
  I.checkOption('I want to apply jointly');
  I.click('Continue');
});

Given("I've said I do not have my husband's email address", async () => {
  I.amOnPage('/their-email-address');
  await iClearTheForm();
  I.checkOption('I do not know their email address');
  I.click('Continue');
});

Given('I delete any previously uploaded files', async () => {
  const locator = '//a[text()="Delete"]';
  let numberOfElements = await I.grabNumberOfVisibleElements(locator);

  const maxRetries = 10;
  let i = 0;
  while (numberOfElements > 0 && i < maxRetries) {
    I.click('Delete');
    I.wait(1);
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

    iClick('Sign out');
    await login('citizenApplicant2');
    I.amOnPage(APPLICANT_2 + ENTER_YOUR_ACCESS_CODE);

    iClick('Your reference number');
    I.type(caseReference);
    iClick('Your access code');
    I.type(accessCode);
    iClick('Continue');
  } else {
    console.error('Could not get case data as ' + user.username);
    process.exit(-1);
  }
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
  I.click('Continue');
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
    console.error('Could not get case data as ' + user.username);
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
  const logger = new Logger({
    transports: [new transports.Console(), new transports.File({ filename: 'test.log' })],
  });

  return getCaseApi(testUser, logger);
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
      console.error('Could not set fixture data as ' + user.username);
      console.error(toApiFormat(data));
      process.exit(-1);
    }
  }
};

export interface BrowserCase extends Case {
  state: State;
}
