import { LanguagePreference } from '../../main/app/case/case';
import { ApplicationType, Gender, State } from '../../main/app/case/definition';
import { FinancialOrderForRadioOption } from '../../main/steps/applicant1/who-is-the-financial-order-for/content';
import { existingOrNew } from '../../main/steps/existing-application/content';
import {
  CSRF_TOKEN_ERROR_URL,
  HUB_PAGE,
  NOT_CONFIRMED_JOINT_APPLICATION,
  REVIEW_THE_APPLICATION,
  SENT_TO_APPLICANT2_FOR_REVIEW,
} from '../../main/steps/urls';
import { areRetriesDisabled } from '../config';

import {
  caseworkerIssuesCase,
  caseworkerUpdatesTheCase,
  iSetTheCaseStateAndReSignIn,
  iSetTheCaseStateAndSignInAsUser,
  iSetTheCaseStateAndSignOut,
  linkUserToCase,
} from './commonHelpers/case-interaction';
import {
  DEFAULT_PHONE_NUMBER,
  iAgreeTheCourtCanContactMeByEmail,
  iCannotUploadDocs,
  iCannotUploadNameChangeProof,
  iCheckOption,
  iClearTheForm,
  iClickContinue,
  iClickContinueAndExpectHubElement,
  iClickContinueAndExpectUrl,
  iClickElement,
  iClickStart,
  iClickStartAndExpectUrl,
  iClickSubmit,
  iClickSubmitAndExpectHubElement,
  iClickSubmitAndExpectUrl,
  iConfirmPrayerAndStatementOfTruth,
  iConfirmReceiptOfTheApplication,
  iConfirmWeLiveInEnglandOrWales,
  iDeleteAllUploadedFiles,
  iDeleteUploadedFile,
  iDontSeeElementInDOM,
  iEnterMyCertificateName,
  iEnterMyHwfReference,
  iEnterMyName,
  iEnterTheirCertificateName,
  iEnterTheirDefaultEmailAddress,
  iEnterTheirDefaultSolicitorEmailAddress,
  iEnterTheirName,
  iEnterValueIntoInput,
  iSelectNo,
  iSelectNotFound,
  iSelectRadioValue,
  iSelectRadioValueForField,
  iSelectYes,
  iSetPrivateAddress,
  iToggleLanguageToEnglish,
  iToggleLanguageToWelsh,
  iWaitForUploadedFile,
  iWaitForVisible,
} from './commonHelpers/element-interaction';
import { TestUserKey } from './commonHelpers/idam-user-manager';
import {
  iAmOnPage,
  iClickBackLink,
  iClickChangeAddressLink,
  iClickCheckContactDetailsHubLink,
  iClickCheckYourAnswersLink,
  iClickToNavigate,
  iClickWithdrawLink,
  iDontSeeABackLink,
  iWaitInPageNotFoundErrorPage,
  iWaitInUrl,
  iWaitInUrlAsUser,
} from './commonHelpers/navigation';
import {
  clearNewUsers,
  createNewUserAndLogin,
  getApplicantString,
  getUserKeyByIndex,
  iLoginAsUser,
  login,
} from './commonHelpers/user-interaction';

const { I } = inject();

Before(test => {
  // Retry failed scenarios x times
  test.retries(areRetriesDisabled() ? 0 : 3);
});

After(async () => {
  await clearNewUsers();
});

Given(/^I go to "([^"]*)" \/ "([^"]*)"$/, (user: string, url: string) => {
  iAmOnPage(url, user);
});
Given(
  /^I go to "([^"]*)" \/ "([^"]*)" and expect element "([^"]*)"$/,
  (user: string, url: string, expectedElementSelector: string) => {
    iAmOnPage(url, user, expectedElementSelector);
  }
);
Given('I go to {string}', (url: string) => {
  iAmOnPage(url);
});
Given('I go to {string} and expect element {string}', (url: string, expectedElementSelector: string) => {
  iAmOnPage(url, undefined, expectedElementSelector);
});

Then(/^the page URL should be "([^"]*)" \/ "([^"]*)"$/, (user: string, url: string) => {
  iWaitInUrlAsUser(url, user);
});
Then(
  /^the page URL should be "([^"]*)" \/ "([^"]*)" with element "([^"]*)"$/,
  (user: string, url: string, expectedElementSelector: string) => {
    iWaitInUrlAsUser(url, user, undefined, expectedElementSelector);
  }
);
Then('the page URL should be {string}', (url: string) => {
  iWaitInUrl(url);
});
Then('the page URL should be {string} with element {string}', (url: string, expectedElementSelector: string) => {
  iWaitInUrl(url, undefined, expectedElementSelector);
});
Then('the request should redirect to the page not found error page', () => {
  iWaitInPageNotFoundErrorPage();
});

Given('I create a new applicant {string} user and login', async (applicant: string) => {
  const userKey =
    getUserKeyByIndex(parseInt(applicant)) === TestUserKey.APPLICANT_1
      ? TestUserKey.APPLICANT_1
      : TestUserKey.APPLICANT_2;
  const createCase: boolean = userKey === TestUserKey.APPLICANT_1;
  await createNewUserAndLogin(userKey, createCase);
});
Given('I create a new respondent user and login', async () => {
  await createNewUserAndLogin(TestUserKey.RESPONDENT);
});
Given('I login as applicant {string}', async (applicant: string) => {
  const userKey = getUserKeyByIndex(parseInt(applicant));
  await iLoginAsUser(userKey);
});
Given('I login as applicant {string} and expect URL {string}', async (applicant: string, url: string) => {
  const userKey = getUserKeyByIndex(parseInt(applicant));
  await iLoginAsUser(userKey, url);
});
Given(
  'I login as applicant {string} and expect hub element {string}',
  async (applicant: string, expectedElementSelector: string) => {
    const userKey = getUserKeyByIndex(parseInt(applicant));
    await iLoginAsUser(userKey, HUB_PAGE, expectedElementSelector);
  }
);
Given('I login as the respondent', async () => {
  await login(TestUserKey.RESPONDENT);
});
Given('I login as the respondent and expect URL {string}', async (url: string) => {
  await iLoginAsUser(TestUserKey.RESPONDENT, url);
});
Given('I login as the respondent and expect hub element {string}', async (expectedElementSelector: string) => {
  await iLoginAsUser(TestUserKey.RESPONDENT, HUB_PAGE, expectedElementSelector);
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
Given('I do not want to dispute the application', iSelectNo);
Given('I want to dispute the application', iSelectYes);
Given('I confirm that I want to dispute the application', () => {
  iSelectYes();
  iWaitForVisible('#confirmDisputeApplicationConditional');
});
Given('I agree that the courts have jurisdiction', iSelectYes);
Given('I do not agree that the courts have jurisdiction', iSelectNo);
Given('I explain why the courts do not have jurisdiction', async () => {
  iEnterValueIntoInput('Example explanation', '#reasonCourtsOfEnglandAndWalesHaveNoJurisdiction');
  iEnterValueIntoInput('Example country', '#inWhichCountryIsYourLifeMainlyBased');
});

Then('the page should include element {string}', (selector: string) => {
  iWaitForVisible(selector);
});

Then('the page should not include element {string}', (selector: string) => {
  iDontSeeElementInDOM(selector);
});
Then('the page should not include a back link', iDontSeeABackLink);

When('I click element {string} and expect URL {string}', async (selector: string, url: string) => {
  await iClickToNavigate(selector, undefined, url);
});

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
When(
  'I click start and expect URL {string} with element {string}',
  async (url: string, expectedElementSelector: string) => {
    await iClickStartAndExpectUrl(url, undefined, undefined, expectedElementSelector);
  }
);

Given('I set the case state to {string}', async (state: State) => {
  await iSetTheCaseStateAndReSignIn(state);
});
Given('I set the case state to {string} and login as applicant {string}', async (state: string, applicant: string) => {
  const userKey = getUserKeyByIndex(parseInt(applicant));
  await iSetTheCaseStateAndSignInAsUser(state as State, userKey, HUB_PAGE);
});
Given('I set the case state to {string} and sign out', async (state: State) => {
  await iSetTheCaseStateAndSignOut(state);
});

When('I click submit and expect URL {string}', async (url: string) => {
  await iClickSubmitAndExpectUrl(url);
});
When('I click submit and expect hub element {string}', async (expectedElementSelector: string) => {
  await iClickSubmitAndExpectHubElement(expectedElementSelector);
});
When('I click continue', iClickContinue);
When('I click continue and expect URL {string}', async (url: string) => {
  await iClickContinueAndExpectUrl(url);
});
When('I click continue and expect hub element {string}', async (expectedElementSelector: string) => {
  await iClickContinueAndExpectHubElement(expectedElementSelector);
});
When('I click continue and the request should redirect to the CSRF error page', async () => {
  await iClickContinueAndExpectUrl(CSRF_TOKEN_ERROR_URL, undefined, undefined, '#badRequestTitle');
});
When('I click send for review', async () => {
  await iClickSubmitAndExpectUrl(SENT_TO_APPLICANT2_FOR_REVIEW);
});
When('I click submit application and expect URL {string}', async (url: string) => {
  await iClickSubmitAndExpectUrl(url);
});
When('I click continue to payment', iClickSubmit);
When('I click continue to payment and expect URL {string}', async (url: string) => {
  await iClickSubmitAndExpectUrl(url);
});
When('I click end the joint application', async () => {
  await iClickSubmitAndExpectUrl(NOT_CONFIRMED_JOINT_APPLICATION);
});
When('I click save and sign out and expect URL {string}', async (url: string) => {
  await iClickToNavigate('#saveAndSignOutButton', undefined, url);
});
When('I click respond to the application', async () => {
  await iClickToNavigate('#respondToTheApplicationButton', undefined, REVIEW_THE_APPLICATION);
});
When('I select yes', iSelectYes);
When('I select no', iSelectNo);
When('I select not found', iSelectNotFound);
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
  iSelectRadioValueForField(existingOrNew.Existing);
});
When('I want to continue with my divorce application', iSelectYes);
When('I want to join the new application', () => {
  iSelectRadioValue(existingOrNew.New);
});
When('I do not need my contact details kept private', () => {
  iSetPrivateAddress(false);
});
When('I need my contact details kept private', () => {
  iSetPrivateAddress();
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

When('I confirm receipt of the application', iConfirmReceiptOfTheApplication);

When('I confirm the prayer and statement of truth', iConfirmPrayerAndStatementOfTruth);
When('I confirm the statement of truth', () => {
  iClickElement('#statementOfTruth');
});
When('I have read the application for divorce', () => {
  iCheckOption('#confirmReadPetitionId');
});

Then('I enter their email address', iEnterTheirDefaultEmailAddress);
Then("I enter their solicitor's email address", iEnterTheirDefaultSolicitorEmailAddress);
Then('I enter my HWF reference number', iEnterMyHwfReference);
Then('I enter the marriage location', () => {
  iEnterValueIntoInput('England', '#ceremonyCountry');
  iEnterValueIntoInput('London', '#ceremonyPlace');
});
Then('I enter my name', () => {
  iEnterMyName();
});
Then('I enter my name on the certificate', () => {
  iEnterMyCertificateName();
});
Then('I enter my phone number', () => {
  iEnterValueIntoInput(DEFAULT_PHONE_NUMBER, `#${getApplicantString()}PhoneNumber`);
});
Then('I enter their name', () => {
  iEnterTheirName();
});
Then('I enter their name on the certificate', () => {
  iEnterTheirCertificateName();
});
Then('I enter details of the other proceedings', () => {
  iEnterValueIntoInput('Test other legal proceedings details', `#${getApplicantString()}LegalProceedingsDetails`);
});
Then('I confirm that the other proceedings have been concluded', iSelectYes);
Then('I enter my reason for withdrawing', () => {
  iEnterValueIntoInput('Reason for withdrawing the application', '#withdrawApplicationReason');
});
Then('I explain what is incorrect or needs changing', () => {
  iEnterValueIntoInput('Example incorrect information', `#${getApplicantString()}Explanation`);
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

Given('I delete any previously uploaded files', async () => {
  await iDeleteAllUploadedFiles();
});

When('I upload the file {string}', async (pathToFile: string) => {
  await iWaitForUploadedFile(pathToFile);
});
When('I delete the file {string}', async (filename: string) => {
  await iDeleteUploadedFile(filename);
});

When('I login as applicant {string} and link to the case', async (applicant: string) => {
  const userKey =
    getUserKeyByIndex(parseInt(applicant)) === TestUserKey.APPLICANT_1
      ? TestUserKey.APPLICANT_1
      : TestUserKey.APPLICANT_2;
  await linkUserToCase(userKey);
});
When('I login as the respondent and link to the case', async () => {
  await linkUserToCase(TestUserKey.RESPONDENT);
});

When('a case worker issues the application', caseworkerIssuesCase);

When('a superuser updates {string} with {string}', async (field: string, value: string) => {
  await caseworkerUpdatesTheCase({ [field]: value });
});

When('I pause the test', () => pause());
