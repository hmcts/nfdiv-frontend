import { createRequire } from 'module';

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
  WaitUntil,
  iCannotUploadDocs,
  iClearTheForm,
  iClickElement,
  iClickNo,
  iClickRadioValue,
  iClickRadioValueForField,
  iClickSubmit,
  iClickSubmitAndExpectUrl,
  iClickYes,
  iClickYesOrNoForField,
  iConfirmPrayerAndStatementOfTruth,
  iEnterValueIntoInput,
} from './commonHelpers/elementInteraction';
import { iAmOnPage, iWaitInUrl, iWaitInUrlAsUser } from './commonHelpers/navigation';
import { autoLogin, getCurrentUser, getUserEmail, iSignOut } from './commonHelpers/userInteraction';
import { iEnterADateIntoField } from './date';
import { iEnterTheUkAddress } from './postcode';

const { I } = inject();
const requireFromFixture = createRequire(__filename);

Given("I've already completed the form using the fixture {string}", async (fixture: string) => {
  iAmOnPage(HOME_URL);
  const fixtureJson = requireFromFixture(`../functional/fixtures/${fixture}`)[fixture];

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
    const fixtureJson = requireFromFixture(`../functional/fixtures/${fixture}`)[fixture];

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
  await iClickSubmitAndExpectUrl(HAS_RELATIONSHIP_BROKEN_URL);

  iClickYes();
  await iClickSubmitAndExpectUrl(RELATIONSHIP_DATE_URL);

  await iClearTheForm();
  iEnterADateIntoField('31', '12', '1999', 'relationshipDate');
  await iClickSubmitAndExpectUrl(CERTIFICATE_URL);

  iClickYes();
  await iClickSubmitAndExpectUrl(HELP_WITH_YOUR_FEE_URL);

  iClickNo();
  await iClickSubmitAndExpectUrl(HOW_DO_YOU_WANT_TO_APPLY);

  iClickRadioValue(ApplicationType.SOLE_APPLICATION);
  await iClickSubmitAndExpectUrl(IN_THE_UK);

  iClickYes();
  await iClickSubmitAndExpectUrl(CHECK_JURISDICTION);

  await iClickSubmitAndExpectUrl(WHERE_YOUR_LIVES_ARE_BASED_URL);

  iClickYesOrNoForField(YesOrNo.YES, 'applicant1LifeBasedInEnglandAndWales');
  iClickYesOrNoForField(YesOrNo.YES, 'applicant2LifeBasedInEnglandAndWales');
  await iClickSubmitAndExpectUrl(JURISDICTION_INTERSTITIAL_URL);

  await iClickSubmitAndExpectUrl(ENTER_YOUR_NAME);

  await iClearTheForm();
  iEnterValueIntoInput('Test your name', '#applicant1FirstNames');
  iEnterValueIntoInput('Test your last name', '#applicant1LastNames');
  await iClickSubmitAndExpectUrl(CHECK_YOUR_NAME);

  await iClearTheForm();
  iClickNo();
  await iClickSubmitAndExpectUrl(YOUR_CERTIFICATE_NAME);

  await iClearTheForm();
  iEnterValueIntoInput('Test your name', '#applicant1FullNameOnCertificate');
  await iClickSubmitAndExpectUrl(THEIR_NAME);

  await iClearTheForm();
  iEnterValueIntoInput('Test their name', '#applicant2FirstNames');
  iEnterValueIntoInput('Test their last name', '#applicant2LastNames');
  await iClickSubmitAndExpectUrl(CHECK_THEIR_NAME);

  await iClearTheForm();
  iClickNo();
  await iClickSubmitAndExpectUrl(THEIR_CERTIFICATE_NAME);

  await iClearTheForm();
  iEnterValueIntoInput('Husbands name', '#applicant2FullNameOnCertificate');
  await iClickSubmitAndExpectUrl(HOW_THE_COURTS_WILL_CONTACT_YOU);

  await iClearTheForm();
  iClickElement('#applicant1AgreeToReceiveEmails');
  await iClickSubmitAndExpectUrl(ENGLISH_OR_WELSH);

  iClickRadioValueForField(LanguagePreference.English, 'applicant1EnglishOrWelsh');
  await iClickSubmitAndExpectUrl(ADDRESS_PRIVATE);

  iClickYesOrNoForField(YesOrNo.NO, 'applicant1AddressPrivate');
  await iClickSubmitAndExpectUrl(ENTER_YOUR_ADDRESS);

  await iEnterTheUkAddress('BUCKINGHAM PALACE, LONDON, SW1A 1AA');
  await iClickSubmitAndExpectUrl(DO_THEY_HAVE_A_SOLICITOR);

  iClickNo();
  await iClickSubmitAndExpectUrl(THEIR_EMAIL_ADDRESS);

  await iClearTheForm();
  iEnterValueIntoInput('husband@example.com', '#applicant2EmailAddress');
  await iClickSubmitAndExpectUrl(DO_YOU_HAVE_ADDRESS);

  iClickYes();
  await iClickSubmitAndExpectUrl(ENTER_THEIR_ADDRESS);

  await iEnterTheUkAddress('MINISTRY OF JUSTICE, SEVENTH FLOOR, 102, PETTY FRANCE, LONDON, SW1H 9AJ');
  await iClickSubmitAndExpectUrl(OTHER_COURT_CASES);

  iClickNo();
  await iClickSubmitAndExpectUrl(MONEY_PROPERTY);

  iClickNo();
  await iClickSubmitAndExpectUrl(UPLOAD_YOUR_DOCUMENTS);

  await iClearTheForm();
  iCannotUploadDocs();
  await iClickSubmitAndExpectUrl(CHECK_ANSWERS_URL);

  await iClearTheForm();
  iConfirmPrayerAndStatementOfTruth();
  await iClickSubmitAndExpectUrl(PAY_YOUR_FEE);
});

Given('I pay and submit the application', async () => {
  iWaitInUrl(PAY_YOUR_FEE);
  await iClickSubmit();

  await completePayment(APPLICATION_SUBMITTED, 15);
});

Given('I pay and submit the service application', async () => {
  iWaitInUrl(PAY_YOUR_SERVICE_FEE);
  await iClickSubmit();

  await completePayment(SERVICE_APPLICATION_SUBMITTED, 15);
});

Given('I pay and submit the general application', async () => {
  iWaitInUrl(PAY_YOUR_GENERAL_APPLICATION_FEE);
  await iClickSubmit();

  await completePayment(GENERAL_APPLICATION_SUBMITTED, 15);
});

Given('I pay and submit the final order application', async () => {
  iWaitInUrlAsUser(PAY_YOUR_FINAL_ORDER_FEE, RESPONDENT);
  await iClickSubmit();

  await completePayment(RESPONDENT + HUB_PAGE, 15);
});

Given('I pay and submit the joint application', async () => {
  iWaitInUrl(PAY_AND_SUBMIT);
  await iClickSubmit();

  await completePayment(JOINT_APPLICATION_SUBMITTED, 15);
});

const completePayment = async (nextUrl?: string, wait?: number, waitUntil?: WaitUntil) => {
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
  await iClickSubmitAndExpectUrl(nextUrl, wait, waitUntil);
};
