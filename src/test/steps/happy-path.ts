import { LanguagePreference } from '../../main/app/case/case';
import { ApplicationType, Gender, State, YesOrNo } from '../../main/app/case/definition';
import {
  ADDRESS_PRIVATE,
  APPLICATION_SUBMITTED,
  CERTIFICATE_URL,
  CHECK_ANSWERS_URL,
  CHECK_JURISDICTION,
  CHECK_THEIR_NAME,
  CHECK_YOUR_NAME,
  DO_THEY_HAVE_A_SOLICITOR,
  DO_YOU_HAVE_ADDRESS,
  ENGLISH_OR_WELSH,
  ENTER_THEIR_ADDRESS,
  ENTER_YOUR_ADDRESS,
  ENTER_YOUR_NAME,
  GENERAL_APPLICATION_SUBMITTED,
  HAS_RELATIONSHIP_BROKEN_URL,
  HELP_WITH_YOUR_FEE_URL,
  HOME_URL,
  HOW_DO_YOU_WANT_TO_APPLY,
  HOW_THE_COURTS_WILL_CONTACT_YOU,
  HUB_PAGE,
  IN_THE_UK,
  JOINT_APPLICATION_SUBMITTED,
  JURISDICTION_INTERSTITIAL_URL,
  MONEY_PROPERTY,
  OTHER_COURT_CASES,
  PAY_AND_SUBMIT,
  PAY_YOUR_FEE,
  PAY_YOUR_FINAL_ORDER_FEE,
  PAY_YOUR_GENERAL_APPLICATION_FEE,
  PAY_YOUR_SERVICE_FEE,
  RELATIONSHIP_DATE_URL,
  RESPONDENT,
  SERVICE_APPLICATION_SUBMITTED,
  THEIR_CERTIFICATE_NAME,
  THEIR_EMAIL_ADDRESS,
  THEIR_NAME,
  UPLOAD_YOUR_DOCUMENTS,
  WHERE_YOUR_LIVES_ARE_BASED_URL,
  YOUR_CERTIFICATE_NAME,
  YOUR_DETAILS_URL,
} from '../../main/steps/urls';

import { iSetTheUsersCaseTo } from './commonHelpers/caseInteraction';
import {
  iCannotUploadDocs,
  iClearTheForm,
  iClickElement,
  iClickNo,
  iClickRadioValue,
  iClickRadioValueForField,
  iClickSubmit,
  iClickYes, iClickYesOrNoForField,
  iConfirmPrayerAndStatementOfTruth,
  iEnterValueIntoInput,
} from './commonHelpers/elementInteraction';
import { iAmOnPage, iWaitInUrl, iWaitInUrlAsUser } from './commonHelpers/navigation';
import { autoLogin, getCurrentUser, getUserEmail, iSignOut } from './commonHelpers/userInteraction';
import { iEnterADateIntoField } from './date';
import { iEnterTheUkAddress } from './postcode';

const { I } = inject();

Given("I've already completed the form using the fixture {string}", async (fixture: string) => {
  iAmOnPage(HOME_URL);
  const fixtureJson = require(`../functional/fixtures/${fixture}`)[fixture];

  await iSetTheUsersCaseTo(fixtureJson);

  iAmOnPage(ADDRESS_PRIVATE);
  iClickNo();
  await iClickSubmit();
});

Given('I set the email address for applicant 2', async () => {
  iAmOnPage(THEIR_EMAIL_ADDRESS);
  const applicant2EmailAddress = getUserEmail(2);

  await iClearTheForm();
  iEnterValueIntoInput(applicant2EmailAddress, '#applicant2EmailAddress');
  await iClickSubmit();
});

Given(
  "I've already completed the form using the fixture {string} for {string}",
  async (fixture: string, applicant: string) => {
    const fixtureJson = require(`../functional/fixtures/${fixture}`)[fixture];

    await iSetTheUsersCaseTo(fixtureJson);

    iAmOnPage(`/${applicant}` + ADDRESS_PRIVATE);
    iClickNo();
    await iClickSubmit();
  }
);

Given('I set the case state to {string}', async (state: State) => {
  const user = getCurrentUser();
  await iSetTheUsersCaseTo({
    state,
  });
  await I.grabCurrentUrl(); // Do we need to do this??
  iSignOut();
  await autoLogin.login(user, false);
});

Given("I've completed all happy path questions correctly", async () => {
  iAmOnPage(YOUR_DETAILS_URL);
  await iClearTheForm();
  iClickRadioValue(Gender.MALE);
  await iClickSubmit(HAS_RELATIONSHIP_BROKEN_URL);

  // I.waitInUrl('/irretrievable-breakdown');
  iClickYes();
  await iClickSubmit(RELATIONSHIP_DATE_URL);

  // I.waitInUrl('/date-from-certificate');
  await iClearTheForm();
  iEnterADateIntoField('31', '12', '1999', 'relationshipDate');
  await iClickSubmit(CERTIFICATE_URL);

  // I.waitInUrl('/do-you-have-your-certificate');
  iClickYes();
  await iClickSubmit(HELP_WITH_YOUR_FEE_URL);

  // I.waitInUrl('/help-with-your-fee');
  iClickNo();
  await iClickSubmit(HOW_DO_YOU_WANT_TO_APPLY);

  // I.waitInUrl('/how-do-you-want-to-apply');
  iClickRadioValue(ApplicationType.SOLE_APPLICATION);
  await iClickSubmit(IN_THE_UK);

  // I.waitInUrl('/in-the-uk');
  iClickYes();
  await iClickSubmit(CHECK_JURISDICTION);

  // I.waitInUrl('/check-jurisdiction');
  await iClickSubmit(WHERE_YOUR_LIVES_ARE_BASED_URL);

  // I.waitInUrl('/where-your-lives-are-based');
  iClickYesOrNoForField(YesOrNo.YES, 'applicant1LifeBasedInEnglandAndWales');
  iClickYesOrNoForField(YesOrNo.YES, 'applicant2LifeBasedInEnglandAndWales');
  await iClickSubmit(JURISDICTION_INTERSTITIAL_URL);

  // I.waitInUrl('/you-can-use-english-welsh-courts');
  await iClickSubmit(ENTER_YOUR_NAME);

  // I.waitInUrl('/enter-your-name');
  await iClearTheForm();
  iEnterValueIntoInput('Test your name', '#applicant1FirstNames');
  iEnterValueIntoInput('Test your last name', '#applicant1LastNames');
  await iClickSubmit(CHECK_YOUR_NAME);

  // I.waitInUrl('/check-your-name');
  await iClearTheForm();
  iClickNo();
  await iClickSubmit(YOUR_CERTIFICATE_NAME);

  // I.waitInUrl('/your-name-on-certificate');
  await iClearTheForm();
  iEnterValueIntoInput('Test your name', '#applicant1FullNameOnCertificate');
  await iClickSubmit(THEIR_NAME);

  // I.waitInUrl('/enter-their-name');
  await iClearTheForm();
  iEnterValueIntoInput('Test their name', '#applicant2FirstNames');
  iEnterValueIntoInput('Test their last name', '#applicant2LastNames');
  await iClickSubmit(CHECK_THEIR_NAME);

  // I.waitInUrl('/check-their-name');
  await iClearTheForm();
  iClickNo();
  await iClickSubmit(THEIR_CERTIFICATE_NAME);

  // I.waitInUrl('/their-name-on-certificate');
  await iClearTheForm();
  iEnterValueIntoInput('Husbands name', '#applicant2FullNameOnCertificate');
  await iClickSubmit(HOW_THE_COURTS_WILL_CONTACT_YOU);

  // I.waitInUrl('/how-the-court-will-contact-you');
  await iClearTheForm();
  iClickElement('#applicant1AgreeToReceiveEmails');
  await iClickSubmit(ENGLISH_OR_WELSH);

  // I.waitInUrl('/english-or-welsh');
  // iClickElement('#english');
  iClickRadioValueForField(LanguagePreference.English, 'applicant1EnglishOrWelsh');
  await iClickSubmit(ADDRESS_PRIVATE);

  // I.waitInUrl('/address-private');
  iClickYesOrNoForField(YesOrNo.NO, 'applicant1AddressPrivate');
  await iClickSubmit(ENTER_YOUR_ADDRESS);

  // iAmOnPage('/enter-your-address');
  await iEnterTheUkAddress('BUCKINGHAM PALACE, LONDON, SW1A 1AA');
  await iClickSubmit(DO_THEY_HAVE_A_SOLICITOR);

  // I.waitInUrl('/do-they-have-a-solicitor');
  iClickNo();
  await iClickSubmit(THEIR_EMAIL_ADDRESS);

  // I.waitInUrl('/their-email-address');
  await iClearTheForm();
  iEnterValueIntoInput('husband@example.com', '#applicant2EmailAddress');
  await iClickSubmit(DO_YOU_HAVE_ADDRESS);

  // I.waitInUrl('/do-you-have-address');
  iClickYes();
  await iClickSubmit(ENTER_THEIR_ADDRESS);

  // I.waitInUrl('/enter-their-address');
  await iEnterTheUkAddress('MINISTRY OF JUSTICE, SEVENTH FLOOR, 102, PETTY FRANCE, LONDON, SW1H 9AJ');
  await iClickSubmit(OTHER_COURT_CASES);

  // I.waitInUrl('/other-court-cases');
  iClickNo();
  await iClickSubmit(MONEY_PROPERTY);

  // I.waitInUrl('/dividing-money-property');
  iClickNo();
  await iClickSubmit(UPLOAD_YOUR_DOCUMENTS);

  // I.waitInUrl('/upload-your-documents');
  await iClearTheForm();
  iCannotUploadDocs();
  await iClickSubmit(CHECK_ANSWERS_URL);
  // iWait(5);
  // I.amOnPage(HOME_URL);

  // I.waitInUrl('/check-your-answers');
  await iClearTheForm();
  iConfirmPrayerAndStatementOfTruth();
  await iClickSubmit(PAY_YOUR_FEE);

  // I.waitInUrl('/pay-your-fee');
});

Given('I pay and submit the application', async () => {
  iWaitInUrl(PAY_YOUR_FEE);
  await iClickSubmit();

  await completePayment(APPLICATION_SUBMITTED, 15);
  // iWaitInUrl(APPLICATION_SUBMITTED, 15);
});

Given('I pay and submit the service application', async () => {
  iWaitInUrl(PAY_YOUR_SERVICE_FEE);
  await iClickSubmit();

  await completePayment(SERVICE_APPLICATION_SUBMITTED, 15);
  // iWaitInUrl(SERVICE_APPLICATION_SUBMITTED, 15);
});

Given('I pay and submit the general application', async () => {
  iWaitInUrl(PAY_YOUR_GENERAL_APPLICATION_FEE);
  await iClickSubmit();

  await completePayment(GENERAL_APPLICATION_SUBMITTED, 15);
  // iWaitInUrl(GENERAL_APPLICATION_SUBMITTED, 15);
});

Given('I pay and submit the final order application', async () => {
  iWaitInUrlAsUser(PAY_YOUR_FINAL_ORDER_FEE, RESPONDENT);
  await iClickSubmit();

  await completePayment(RESPONDENT + HUB_PAGE, 15);
  // iWaitInUrlAsUser(HUB_PAGE, RESPONDENT, 15);
});

Given('I pay and submit the joint application', async () => {
  iWaitInUrl(PAY_AND_SUBMIT);
  await iClickSubmit();

  await completePayment(JOINT_APPLICATION_SUBMITTED, 15);
  // iWaitInUrl(JOINT_APPLICATION_SUBMITTED, 15);
});

const completePayment = async (nextUrl?: string, wait?: number, waitUntil?: string) => {
  iWaitInUrl('/card_details', 15);
  iEnterValueIntoInput('4444333322221111', '#card-no', 15);
  iEnterValueIntoInput('12', '#expiry-month');
  iEnterValueIntoInput('30', '#expiry-year');
  iEnterValueIntoInput('Nightly test', '#cardholder-name');
  iEnterValueIntoInput('123', '#cvc');
  iEnterValueIntoInput('BUCKINGHAM PALACE', '#address-line-1');
  iEnterValueIntoInput('LONDON', '#address-city');
  iEnterValueIntoInput('SW1A 1AA', '#address-postcode');
  iEnterValueIntoInput('nightly-functional-test@example.com', '#email');
  await iClickSubmit();
  iWaitInUrl('/card_details');
  await iClickSubmit(nextUrl, wait, waitUntil);
};
