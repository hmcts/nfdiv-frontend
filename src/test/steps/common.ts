import {
  ApplicationType,
  CASEWORKER_ISSUE_APPLICATION,
  CITIZEN_UPDATE_CASE_STATE_AAT,
  ConditionalOrderCourt,
  SYSTEM_UPDATE_CASE_COURT_HEARING,
} from '../../main/app/case/definition';
import { CHECK_JURISDICTION, HOW_DO_YOU_WANT_TO_APPLY, THEIR_EMAIL_ADDRESS } from '../../main/steps/urls';
import { TestUserType } from '../config';

import {
  executeUserCaseScript,
  iGetTheTestUser,
  linkUserToCase,
  triggerAnEvent,
} from './commonHelpers/caseInteraction';
import {
  iCheckOptionFor,
  iClearTheForm,
  iClickElement,
  iClickMoreDetailsComponent,
  iClickNo,
  iClickRadioValueForField,
  iClickString,
  iClickSubmit,
  iClickYes,
  iConfirmPrayerAndStatementOfTruth,
  iDeleteAllUploadedFiles,
  iRejectCookies,
  iWait,
  iWaitForVisible,
} from './commonHelpers/elementInteraction';
import { iAmOnPage, iGoToPage, iGoToPageAsUser, iWaitInUrl, iWaitInUrlAsUser } from './commonHelpers/navigation';
import { autoLoginWithUserIndex, clearNewUsers, iClickSignOut, login } from './commonHelpers/userInteraction';

const { I } = inject();

Before(test => {
  // Retry failed scenarios x times
  test.retries(3);
});

After(async () => {
  await clearNewUsers();
});

Given('I go to {string} for {string}', (url: string, user: string) => {
  iGoToPageAsUser(url, user);
});
Given('I go to {string}', (url: string) => {
  iGoToPage(url);
});
Given('I go to applicant1 {string}', (url: string) => {
  iGoToPageAsUser(url, 'APPLICANT_1');
});
Given('I go to respondent {string}', (url: string) => {
  iGoToPageAsUser(url, 'RESPONDENT');
});
Given('I go to applicant2 {string}', (url: string) => {
  iGoToPageAsUser(url, 'APPLICANT_2');
});

Then('the page URL should be {string} {string}', (user: string, url: string) => {
  iWaitInUrlAsUser(url, user);
});
Then('the page URL should be {string}', (url: string) => {
  iWaitInUrl(url);
});
Then('the page URL should be applicant1 {string}', (url: string) => {
  iWaitInUrlAsUser(url, 'APPLICANT_1');
});
Then('the page URL should be respondent {string}', (url: string) => {
  iWaitInUrlAsUser(url, 'RESPONDENT');
});
Then('the page URL should be applicant2 {string}', (url: string) => {
  iWaitInUrlAsUser(url, 'APPLICANT_2');
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
  await autoLoginWithUserIndex(parseInt(applicant));
});

When('I reject cookies', iRejectCookies);

When('I click {string}', iClickString);
When('I select {string}', iClickString);
When('I wait {string} seconds', iWait);
When('I click for more details', iClickMoreDetailsComponent);

When('I select {string} for {string}', (optionLabel: string, fieldLabel: string) => {
  iCheckOptionFor(optionLabel, fieldLabel);
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

Then('the page should include visible element {string}', iWaitForVisible);

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

When('I sign out', iClickSignOut);

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
When('I click yes', iClickYes);
When('I click no', iClickNo);
When('I click radio value {string} for field {string}', (value: string, field: string) => {
  iClickRadioValueForField(value, field);
});
When('I click radio value {string}', (value: string) => {
  iClickRadioValueForField(value);
});

When('I confirm the prayer and statement of truth', iConfirmPrayerAndStatementOfTruth);
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
  const testUser = await iGetTheTestUser();
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

Given('I clear the form', iClearTheForm);

Given("I've said I'm applying as a joint application", async () => {
  iAmOnPage(HOW_DO_YOU_WANT_TO_APPLY);
  await iClearTheForm();
  I.checkOption(`#${ApplicationType.JOINT_APPLICATION}`);
  await iClickSubmit();
});

Given("I've said I do not have my husband's email address", async () => {
  iAmOnPage(THEIR_EMAIL_ADDRESS);
  await iClearTheForm();
  iClickElement('#doNotKnowEmailAddress');
  await iClickSubmit();
});

Given('I delete any previously uploaded files', async () => {
  await iDeleteAllUploadedFiles();
});

When('I upload the file {string}', (pathToFile: string) => {
  I.attachFile('input[type="file"]', pathToFile);
});

When('I enter my valid case reference and valid access code', async () => {
  await linkUserToCase(TestUserType.CITIZEN_APPLICANT_2);
});

When('I as applicant1 enter my valid case reference and valid access code', async () => {
  await linkUserToCase(TestUserType.CITIZEN_SINGLETON);
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
  await triggerAnEvent(CITIZEN_UPDATE_CASE_STATE_AAT, { [field]: value });
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
  iAmOnPage(CHECK_JURISDICTION);
  await iClickSubmit();
});
