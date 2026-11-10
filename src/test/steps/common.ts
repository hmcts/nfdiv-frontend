import { LanguagePreference } from '../../main/app/case/case';
import {
  ApplicationType,
  CASEWORKER_ISSUE_APPLICATION,
  CITIZEN_UPDATE_CASE_STATE_AAT,
  ConditionalOrderCourt,
  Gender,
  SYSTEM_UPDATE_CASE_COURT_HEARING,
  State,
  YesOrNo,
} from '../../main/app/case/definition';
import { FinancialOrderForRadioOption } from '../../main/steps/applicant1/who-is-the-financial-order-for/content';
import {
  CHECK_JURISDICTION,
  CSRF_TOKEN_ERROR_URL,
  HOW_DO_YOU_WANT_TO_APPLY,
  REVIEW_THE_APPLICATION,
  THEIR_EMAIL_ADDRESS,
} from '../../main/steps/urls';

import { TestUserKey } from './commonHelpers/IdamUserManager';
import {
  executeUserCaseScript,
  iSetTheCaseStateAndReSignIn,
  linkUserToCase,
  triggerAnEvent,
} from './commonHelpers/caseInteraction';
import {
  DEFAULT_PHONE_NUMBER,
  iAcceptCookies,
  iAgreeTheCourtCanContactMeByEmail,
  iCannotUploadDocs,
  iCannotUploadNameChangeProof,
  iCheckOption,
  iCheckOptionFor,
  iClearTheForm,
  iClickContinue,
  iClickContinueAndExpectUrl,
  iClickElement,
  iClickMoreDetailsComponent,
  iClickStart,
  iClickStartAndExpectUrl,
  iClickString,
  iClickSubmit,
  iClickSubmitAndExpectUrl,
  iConfirmPrayerAndStatementOfTruth,
  iConfirmWeLiveInEnglandOrWales,
  iDeleteAllUploadedFiles,
  iDeleteUploadedFile,
  iEnterMyCertificateName,
  iEnterMyHwfReference,
  iEnterMyName,
  iEnterTheirCertificateName,
  iEnterTheirDefaultEmailAddress,
  iEnterTheirDefaultSolicitorEmailAddress,
  iEnterTheirName,
  iEnterValueIntoInput,
  iRejectCookies,
  iSelectNo,
  iSelectNotFound,
  iSelectRadioValue,
  iSelectRadioValueForField,
  iSelectYes,
  iSetInRefuge,
  iSetPrivateAddress,
  iToggleLanguageToEnglish,
  iToggleLanguageToWelsh,
  iWait,
  iWaitForElement,
  iWaitForUploadedFile,
  iWaitForVisible,
} from './commonHelpers/elementInteraction';
import {
  iAmOnPage,
  iClickBackLink,
  iClickChangeAddressLink,
  iClickCheckContactDetailsHubLink,
  iClickCheckYourAnswersLink,
  iClickToNavigate,
  iClickWithdrawLink,
  iDontSeeABackLink,
  iGrabCurrentUrl,
  iWaitInPageNotFoundErrorPage,
  iWaitInUrl,
  iWaitInUrlAsUser,
} from './commonHelpers/navigation';
import {
  clearNewUsers,
  getApplicantString,
  getCurrentUserKey,
  iClickSignOut,
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
  iAmOnPage(url, user);
});
Given('I go to {string}', (url: string) => {
  iAmOnPage(url);
});

Then(/^the page URL should be "([^"]*)" \/ "([^"]*)"$/, (user: string, url: string) => {
  iWaitInUrlAsUser(url, user);
});
Then('the page URL should be {string}', (url: string) => {
  iWaitInUrl(url);
});
Then('the request should redirect to the page not found error page', () => {
  iWaitInPageNotFoundErrorPage();
});

Given('I login', async () => {
  await login(getCurrentUserKey() || TestUserKey.APPLICANT_1);
});

Given('I create a new user and login', async () => {
  await login(TestUserKey.APPLICANT_1, true);
});
Given('I create a new user and login as applicant 2', async () => {
  await login(TestUserKey.APPLICANT_2);
});
Given('I login with applicant {string}', async (applicant: string) => {
  const userKey = parseInt(applicant) === 1 ? TestUserKey.APPLICANT_1 : TestUserKey.APPLICANT_2;
  await login(userKey);
});
Given('I login with the respondent', async () => {
  await login(TestUserKey.RESPONDENT);
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
Given('I cannot upload some or all of my documents', iCannotUploadDocs);
Given('I cannot upload my name change proof', iCannotUploadNameChangeProof);
Given('I agree that the court can contact me by email', iAgreeTheCourtCanContactMeByEmail);
Given('we were a same-sex couple when we got married', () => {
  iCheckOption('#sameSex');
});
Given('I do not have their email address', async () => {
  iCheckOption('#applicant1DoesNotKnowApplicant2EmailAddress');
});
Given('we both live in England or Wales', iConfirmWeLiveInEnglandOrWales);

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
  iWaitForElement(selector);
});

Then('the page should not include element {string}', (selector: string) => {
  I.dontSeeElementInDOM(selector);
});
Then('the page should not include a back link', iDontSeeABackLink);

Then('the page should include visible element {string}', iWaitForVisible);

When('I select element {string}', iClickElement);
When('I click element {string}', iClickElement);
When('I click element {string} and expect URL {string}', async (selector: string, url: string) => {
  await iClickToNavigate(selector, undefined, url);
});
When(
  'I click element {string} and expect URL {string} with element {string}',
  async (selector: string, url: string, expectedElementSelector: string) => {
    await iClickToNavigate(selector, undefined, url, undefined, expectedElementSelector);
  }
);

When('I click back', iClickBackLink);
When('I click back and expect URL {string}', async (url: string) => {
  await iClickBackLink(url);
});

When('I click to withdraw and expect URL {string}', async (url: string) => {
  await iClickWithdrawLink(url);
});

When('I click to review my contact details', iClickCheckContactDetailsHubLink);
When('I click to change my address', iClickChangeAddressLink);

When('I click check your answers', async () => {
  await iClickCheckYourAnswersLink();
});

When('I toggle language to Welsh', iToggleLanguageToWelsh);
When('I toggle language to English', iToggleLanguageToEnglish);

When('I click start', async () => {
  await iClickStart();
});
When('I click start and expect URL {string}', async (url: string) => {
  await iClickStartAndExpectUrl(url);
});

When('I sign out', iClickSignOut);

Given('I set the case state to {string}', async (state: State) => {
  await iSetTheCaseStateAndReSignIn(state);
});

When('I click submit', iClickSubmit);
When('I click submit and expect URL {string}', async (url: string) => {
  await iClickSubmitAndExpectUrl(url);
});
When('I click continue', iClickContinue);
When('I click continue and expect URL {string}', async (url: string) => {
  await iClickContinueAndExpectUrl(url);
});
When(
  'I click continue and expect URL {string} with element {string}',
  async (url: string, expectedElementSelector: string) => {
    await iClickContinueAndExpectUrl(url, undefined, undefined, expectedElementSelector);
  }
);
When('I click continue and the request should redirect to the CSRF error page', async () => {
  await iClickContinueAndExpectUrl(CSRF_TOKEN_ERROR_URL, undefined, undefined, '#badRequestTitle');
});
When('I click send for review', iClickSubmit);
When('I click send for review and expect URL {string}', async (url: string) => {
  await iClickSubmitAndExpectUrl(url);
});
When('I click submit application', iClickSubmit);
When('I click submit application and expect URL {string}', async (url: string) => {
  await iClickSubmitAndExpectUrl(url);
});
When('I click continue to payment', iClickSubmit);
When('I click continue to payment and expect URL {string}', async (url: string) => {
  await iClickSubmitAndExpectUrl(url);
});
When('I click pay and submit application', iClickSubmit);
When('I click accept and send', iClickSubmit);
When('I click accept and send and expect URL {string}', async (url: string) => {
  await iClickSubmitAndExpectUrl(url);
});
When('I click confirm', iClickSubmit);
When('I click end the joint application', iClickSubmit);
When('I click end the joint application and expect URL {string}', async (url: string) => {
  await iClickSubmitAndExpectUrl(url);
});
When('I click save and sign out', async () => {
  await iClickToNavigate('#saveAndSignOutButton');
});
When('I click save and sign out and expect URL {string}', async (url: string) => {
  await iClickToNavigate('#saveAndSignOutButton', undefined, url);
});
When('I click provide information', async () => {
  await iClickToNavigate('#provideInformationButton');
});
When('I click apply for conditional order', async () => {
  await iClickToNavigate('#applyForConditionalOrderButton');
});
When('I click apply for conditional order and expect URL {string}', async (url: string) => {
  await iClickToNavigate('#applyForConditionalOrderButton', undefined, url);
});
When('I click apply for final order', async () => {
  await iClickToNavigate('#applyForFinalOrderButton');
});
When('I click continue to the next steps', async () => {
  await iClickToNavigate('a.govuk-button[href="/return-to-service"]');
});
When('I click respond to the application', async () => {
  await iClickToNavigate('#respondToTheApplicationButton', undefined, REVIEW_THE_APPLICATION);
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
When('I select not found', iSelectNotFound);
When('I select radio value {string} for field {string}', (value: string, field: string) => {
  iSelectRadioValueForField(value, field);
});
When('I select radio value {string}', (value: string) => {
  iSelectRadioValueForField(value);
});
When('I want to apply jointly', () => {
  iSelectRadioValueForField(ApplicationType.JOINT_APPLICATION);
});
When('I want to apply on my own', () => {
  iSelectRadioValueForField(ApplicationType.SOLE_APPLICATION);
});
When('I select English', () => {
  iSelectRadioValueForField(LanguagePreference.English);
});
When('I want to continue with my existing application', () => {
  iSelectRadioValueForField('existing');
});
When('I want to continue with my divorce application', iSelectYes);
When('I want to join the new application', () => {
  iSelectRadioValue('new');
});
When('I do not need my contact details kept private', () => {
  iSetPrivateAddress(false);
});
When('I need my contact details kept private', () => {
  iSetPrivateAddress();
});
When('I am in a refuge', () => {
  iSetInRefuge();
});
When('I do not need a financial order', iSelectNo);
When('I need a financial order for myself', () => {
  iSelectRadioValueForField(FinancialOrderForRadioOption.APPLICANT, `${getApplicantString()}WhoIsFinancialOrderFor`);
});
When('I need a financial order for myself and my children', () => {
  iSelectRadioValueForField(
    FinancialOrderForRadioOption.APPLICANT_AND_CHILDREN,
    `${getApplicantString()}WhoIsFinancialOrderFor`
  );
});
When('I confirm the information my partner provided is correct', iSelectYes);
When('I deny the information my partner provided is correct', iSelectNo);
When('I want to apply to serve another way', () => {
  iCheckOption('#iWantToHavePapersServedAnotherWay');
});

When('I confirm receipt of the application', async () => {
  await iClickToNavigate(
    '#confirmReceiptButton',
    undefined,
    await iGrabCurrentUrl(),
    undefined,
    '#applicantConfirmedReceiptContent'
  );
});

When('I confirm the prayer and statement of truth', iConfirmPrayerAndStatementOfTruth);
When('I confirm the statement of truth', () => {
  iClickElement('#statementOfTruth');
});
When('I have read the application for divorce', () => {
  iCheckOption('#confirmReadPetitionId');
});

Then('the page should show an error for field {string}', (fieldName: string) => {
  iWaitForElement(".govuk-error-summary__body > ul.govuk-error-summary__list > li > a[href='#" + fieldName + "']");
});

Then('I wait until the page contains image {string}', (text: string) => {
  I.waitForText(text, 30);
});

Then('I wait until the page contains file element {string}', (selector: string) => {
  iWaitForElement(selector, 30);
});

Then('the page should not include {string}', (text: string) => {
  I.dontSee(text);
});

Then('I enter {string} into {string}', (value: string, selector: string) => {
  iEnterValueIntoInput(value, selector);
});
Then('I enter their email address', iEnterTheirDefaultEmailAddress);
Then("I enter their solicitor's email address", iEnterTheirDefaultSolicitorEmailAddress);
Then('I enter my HWF reference number', iEnterMyHwfReference);
Then('we got married in {string} in {string}', (place: string, country: string) => {
  iEnterValueIntoInput(country, '#ceremonyCountry');
  iEnterValueIntoInput(place, '#ceremonyPlace');
});
Then('I enter the marriage location', () => {
  iEnterValueIntoInput('England', '#ceremonyCountry');
  iEnterValueIntoInput('London', '#ceremonyPlace');
});
Then('I enter {string} as my name', (name: string) => {
  iEnterMyName(name);
});
Then('I enter my name', () => {
  iEnterMyName();
});
Then('I enter {string} as my name on the certificate', (name: string) => {
  iEnterMyCertificateName(name);
});
Then('I enter my name on the certificate', () => {
  iEnterMyCertificateName();
});
Then('I enter my phone number', () => {
  iEnterValueIntoInput(DEFAULT_PHONE_NUMBER, `#${getApplicantString()}PhoneNumber`);
});
Then('I enter {string} as their name', (name: string) => {
  iEnterTheirName(name);
});
Then('I enter their name', () => {
  iEnterTheirName();
});
Then('I enter {string} as their name on the certificate', (name: string) => {
  iEnterTheirCertificateName(name);
});
Then('I enter their name on the certificate', () => {
  iEnterTheirCertificateName();
});
Then('I enter details of the other proceedings', () => {
  iEnterValueIntoInput('Test other legal proceedings details', `#${getApplicantString()}LegalProceedingsDetails`);
});
Then('I enter my reason for withdrawing', () => {
  iEnterValueIntoInput('Reason for withdrawing the application', '#withdrawApplicationReason');
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
  await linkUserToCase(TestUserKey.APPLICANT_2);
});
When('I as respondent enter my valid case reference and valid access code', async () => {
  await linkUserToCase(TestUserKey.RESPONDENT);
});
When('I as applicant1 enter my valid case reference and valid access code', async () => {
  await linkUserToCase(TestUserKey.APPLICANT_1);
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
