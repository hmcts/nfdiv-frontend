import { LanguagePreference } from '../../main/app/case/case';
import {
  ApplicationType,
  CASEWORKER_ISSUE_APPLICATION,
  CITIZEN_UPDATE_CASE_STATE_AAT,
  ConditionalOrderCourt,
  Gender,
  SYSTEM_UPDATE_CASE_COURT_HEARING,
  YesOrNo,
} from '../../main/app/case/definition';
import { FinancialOrderForRadioOption } from '../../main/steps/applicant1/who-is-the-financial-order-for/content';
import { CHECK_JURISDICTION, HOW_DO_YOU_WANT_TO_APPLY, THEIR_EMAIL_ADDRESS } from '../../main/steps/urls';
import { TestUserType } from '../config';

import {
  executeUserCaseScript,
  iGetTheTestUser,
  linkUserToCase,
  triggerAnEvent,
} from './commonHelpers/caseInteraction';
import {
  iAcceptCookies,
  iCannotUploadDocs,
  iCheckOption,
  iCheckOptionFor,
  iClearTheForm,
  iClickElement,
  iClickMoreDetailsComponent,
  iClickString,
  iClickSubmit,
  iClickSubmitAndExpectUrl,
  iConfirmPrayerAndStatementOfTruth,
  iConfirmWeLiveInEnglandOrWales,
  iDeleteAllUploadedFiles,
  iDeleteUploadedFile,
  iEnterValueIntoInput,
  iRejectCookies,
  iSelectNo,
  iSelectRadioValue,
  iSelectRadioValueForField,
  iSelectYes,
  iSetInRefuge,
  iSetPrivateAddress,
  iWait,
  iWaitForUploadedFile,
  iWaitForVisible,
} from './commonHelpers/elementInteraction';
import {
  iAmOnPage,
  iClickBackLink,
  iDontSeeABackLink,
  iGoToPage,
  iGoToPageAsUser,
  iWaitInUrl,
  iWaitInUrlAsUser,
} from './commonHelpers/navigation';
import {
  autoLoginWithUserIndex,
  clearNewUsers,
  getApplicantString,
  iClickSignOut,
  isApplicant2,
  login,
} from './commonHelpers/userInteraction';

const { I } = inject();

Before(test => {
  // Retry failed scenarios x times
  test.retries(3);
});

After(async () => {
  await clearNewUsers();
});

Given(/^I go to "([^"]*)" \/ "([^"]*)"$/, (user: string, url: string) => {
  iGoToPageAsUser(url, user);
});
Given('I go to {string}', (url: string) => {
  iGoToPage(url);
});

Then(/^the page URL should be "([^"]*)" \/ "([^"]*)"$/, (user: string, url: string) => {
  iWaitInUrlAsUser(url, user);
});
Then('the page URL should be {string}', (url: string) => {
  iWaitInUrl(url);
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

When('I accept cookies', iAcceptCookies);
When('I reject cookies', iRejectCookies);

When('I click {string}', iClickString);
When('I select {string}', iClickString);
When('I wait {string} seconds', iWait);
When('I click for more details', iClickMoreDetailsComponent);

When('I select {string} for {string}', (optionLabel: string, fieldLabel: string) => {
  iCheckOptionFor(optionLabel, fieldLabel);
});
When('I select the option {string}', (value: string) => {
  // pretty sure we can remove this for direct syntactic helpers
  switch (value.toLowerCase()) {
    case 'yes':
      iSelectYes();
      break;
    case 'no':
      iSelectNo();
      break;
    case 'my husband':
      iSelectRadioValue(Gender.MALE);
      break;
    default:
      iClickString(value); // Fallback here for now. Refactor this step def when I have worked through more features
  }
});
Given('I want to divorce my husband', () => {
  iSelectRadioValue(Gender.MALE);
});
Given('I confirm my marriage has broken down irretrievably', iSelectYes);
Given('my marriage has not broken down irretrievably', async () => {
  const selector = iSelectNo();
  const noElementId = await I.grabAttributeFrom(selector, 'id');
  iWaitForVisible(`#conditional-${noElementId}:not(.govuk-radios__conditional--hidden)`);
});
Given('I have my marriage certificate with me', iSelectYes);
Given('I do not have my marriage certificate with me', iSelectNo);
Given('I cannot upload my original marriage certificate', iCannotUploadDocs);
Given('I cannot upload my original foreign marriage certificate', iCannotUploadDocs);
Given('I agree that the court can contact me by email', () => {
  const selector = `#${getApplicantString()}AgreeToReceiveEmails`;
  iCheckOption(selector);
});
Given('we were a same-sex couple when we got married', () => {
  iCheckOption('#sameSex');
});
Given('I do not have their email address', async () => {
  iCheckOption('#applicant1DoesNotKnowApplicant2EmailAddress');
});
Given('we both live in England or Wales', () => {
  iConfirmWeLiveInEnglandOrWales();
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

Then('the page should include element {string}', (selector: string) => {
  I.waitForElement(selector);
});

Then('the page should not include element {string}', (selector: string) => {
  I.dontSeeElementInDOM(selector);
});
Then('the page should not include a back link', iDontSeeABackLink);

Then('the page should include visible element {string}', iWaitForVisible);

When('I select element {string}', iClickElement);
When('I click element {string}', iClickElement);

When('I click back', iClickBackLink);
When('I click back and expect URL {string}', async (url: string) => {
  await iClickBackLink(url);
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

// These three should be tidied up
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
When('I click continue and expect URL {string}', async (url: string) => {
  await iClickSubmitAndExpectUrl(url);
});
When(
  'I click continue and expect URL {string} and title element {string}',
  async (url: string, titleSelector: string) => {
    await iClickSubmitAndExpectUrl(url, undefined, undefined, titleSelector);
  }
);
When('I click send for review', iClickSubmit);
When('I click send for review and expect URL {string}', async (url: string) => {
  await iClickSubmitAndExpectUrl(url);
});
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
When('I click yes', iSelectYes);
When('I select yes', iSelectYes);
When('I select yes for field {string}', (field: string) => {
  iSelectRadioValueForField(YesOrNo.YES, field);
});
When('I click no', iSelectNo);
When('I select no', iSelectNo);
When('I select no for field {string}', (field: string) => {
  iSelectRadioValueForField(YesOrNo.NO, field);
});
When('I select radio value {string} for field {string}', (value: string, field: string) => {
  iSelectRadioValueForField(value, field);
});
When('I select radio value {string}', (value: string) => {
  iSelectRadioValueForField(value);
});
When('I want to apply jointly', () => {
  iSelectRadioValueForField(ApplicationType.JOINT_APPLICATION);
});
When('I select English', () => {
  iSelectRadioValueForField(LanguagePreference.English);
});
When('I do not need my contact details kept private', () => {
  iSetPrivateAddress(false);
});
When('I need my contact details kept private', () => {
  iSetPrivateAddress(true);
});
When('I am in a refuge', () => {
  iSetInRefuge(true);
});
When('I need a financial order for myself and my children', () => {
  iSelectRadioValueForField(
    FinancialOrderForRadioOption.APPLICANT_AND_CHILDREN,
    `${getApplicantString()}WhoIsFinancialOrderFor`
  );
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

Then('I wait until the page contains file element {string}', (selector: string) => {
  I.waitForElement(selector, 30);
});

Then('the page should not include {string}', (text: string) => {
  I.dontSee(text);
});

Then('I enter {string} into {string}', (value: string, selector: string) => {
  iEnterValueIntoInput(value, selector);
});
Then('I enter their email address', async () => {
  iEnterValueIntoInput('simulate-delivered@notifications.service.gov.uk', '#applicant2EmailAddress');
});
Then('I enter my HWF reference number', () => {
  iEnterValueIntoInput('HWF-ABC-123', `#${getApplicantString()}HelpWithFeesRefNo`);
});
Then('we got married in {string} in {string}', (place: string, country: string) => {
  iEnterValueIntoInput(country, '#ceremonyCountry');
  iEnterValueIntoInput(place, '#ceremonyPlace');
});
Then('I enter the marriage location', () => {
  iEnterValueIntoInput('England', '#ceremonyCountry');
  iEnterValueIntoInput('London', '#ceremonyPlace');
});
Then('I enter {string} as my name', (name: string) => {
  const firstName = name.split(' ')[0];
  const lastName = name.split(' ')[1];
  const applicant = getApplicantString();
  iEnterValueIntoInput(firstName, `#${applicant}FirstNames`);
  iEnterValueIntoInput(lastName, `#${applicant}LastNames`);
});
Then('I enter my name', () => {
  let firstName = 'Sarah';
  const lastName = 'Smith';
  if (isApplicant2()) {
    firstName = 'John';
  }
  const applicant = getApplicantString();
  iEnterValueIntoInput(firstName, `#${applicant}FirstNames`);
  iEnterValueIntoInput(lastName, `#${applicant}LastNames`);
});
Then('I enter {string} as my name on the certificate', (name: string) => {
  iEnterValueIntoInput(name, `#${getApplicantString()}FullNameOnCertificate`);
});
Then('I enter my name on the certificate', () => {
  let firstName = 'Sarah';
  const lastName = 'Smith';
  if (isApplicant2()) {
    firstName = 'John';
  }
  iEnterValueIntoInput(`${firstName} ${lastName}`, `#${getApplicantString()}FullNameOnCertificate`);
});
Then('I enter my phone number', () => {
  iEnterValueIntoInput('07700 900457', `#${getApplicantString()}PhoneNumber`);
});
Then('I enter details of the other proceedings', () => {
  iEnterValueIntoInput('Test other legal proceedings details', `#${getApplicantString()}LegalProceedingsDetails`);
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
  iCheckOption(`#${ApplicationType.JOINT_APPLICATION}`);
  await iClickSubmit();
});

Given("I've said I do not have my husband's email address", async () => {
  iAmOnPage(THEIR_EMAIL_ADDRESS);
  await iClearTheForm();
  iCheckOption('#applicant1DoesNotKnowApplicant2EmailAddress');
  await iClickSubmit();
});

Given('I delete any previously uploaded files', async () => {
  await iDeleteAllUploadedFiles();
});

When('I upload the file {string}', async (pathToFile: string) => {
  await iWaitForUploadedFile(pathToFile);
});
When('I delete the file {string}', async (filename: string) => {
  await iDeleteUploadedFile(filename);
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
