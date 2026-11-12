import { createRequire } from 'module';

import { LanguagePreference } from '../../main/app/case/case';
import { ApplicationType, Gender } from '../../main/app/case/definition';
import {
  ADDRESS_PRIVATE,
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
  HAS_RELATIONSHIP_BROKEN_URL,
  HELP_WITH_YOUR_FEE_URL,
  HOME_URL,
  HOW_DO_YOU_WANT_TO_APPLY,
  HOW_THE_COURTS_WILL_CONTACT_YOU,
  IN_THE_UK,
  JURISDICTION_INTERSTITIAL_URL,
  MONEY_PROPERTY,
  OTHER_COURT_CASES,
  PAY_YOUR_FEE,
  RELATIONSHIP_DATE_URL,
  THEIR_CERTIFICATE_NAME,
  THEIR_EMAIL_ADDRESS,
  THEIR_NAME,
  UPLOAD_YOUR_DOCUMENTS,
  WHERE_YOUR_LIVES_ARE_BASED_URL,
  YOUR_CERTIFICATE_NAME,
  YOUR_DETAILS_URL,
} from '../../main/steps/urls';

import { iUpdateTheCase } from './commonHelpers/caseInteraction';
import {
  iAgreeTheCourtCanContactMeByEmail,
  iCannotUploadDocs,
  iClearTheForm,
  iClickSubmit,
  iClickSubmitAndExpectUrl,
  iConfirmPrayerAndStatementOfTruth,
  iConfirmWeLiveInEnglandOrWales,
  iEnterMyCertificateName,
  iEnterMyName,
  iEnterTheirCertificateName,
  iEnterTheirDefaultEmailAddress,
  iEnterTheirEmailAddress,
  iEnterTheirName,
  iSelectNo,
  iSelectRadioValue,
  iSelectYes,
  iSetPrivateAddress,
} from './commonHelpers/elementInteraction';
import { iAmOnPage } from './commonHelpers/navigation';
import { iEnterTheDefaultRelationshipDate } from './date';
import { DEFAULT_ADDRESS, iEnterTheUkAddress } from './postcode';

const requireFromFixture = createRequire(__filename);

export const completedFormWithFixtureForUser = async (fixture: string, user?: string): Promise<void> => {
  iAmOnPage(HOME_URL, user);
  const fixtureJson = requireFromFixture(`../functional/fixtures/${fixture}`)[fixture];

  await iUpdateTheCase(fixtureJson);

  iAmOnPage(ADDRESS_PRIVATE, user);
  iSetPrivateAddress(false);
  await iClickSubmit();
};

export const completedFormWithFixture = async (fixture: string): Promise<void> => {
  await completedFormWithFixtureForUser(fixture);
};

Given("I've already completed the form using the fixture {string}", async (fixture: string) => {
  await completedFormWithFixtureForUser(fixture);
});

Given(
  "I've already completed the form using the fixture {string} for {string}",
  async (fixture: string, user: string) => {
    await completedFormWithFixtureForUser(fixture, user);
  }
);

Given('I set the email address for applicant 2', async () => {
  iAmOnPage(THEIR_EMAIL_ADDRESS);
  await iClearTheForm();
  iEnterTheirEmailAddress();
  await iClickSubmit();
});

Given("I've completed all happy path questions correctly", async () => {
  iAmOnPage(YOUR_DETAILS_URL);
  await iClearTheForm();
  iSelectRadioValue(Gender.MALE);
  await iClickSubmitAndExpectUrl(HAS_RELATIONSHIP_BROKEN_URL);

  iSelectYes();
  await iClickSubmitAndExpectUrl(RELATIONSHIP_DATE_URL);

  await iClearTheForm();
  iEnterTheDefaultRelationshipDate();
  await iClickSubmitAndExpectUrl(CERTIFICATE_URL);

  iSelectYes();
  await iClickSubmitAndExpectUrl(HELP_WITH_YOUR_FEE_URL);

  iSelectNo();
  await iClickSubmitAndExpectUrl(HOW_DO_YOU_WANT_TO_APPLY);

  iSelectRadioValue(ApplicationType.SOLE_APPLICATION);
  await iClickSubmitAndExpectUrl(IN_THE_UK);

  iSelectYes();
  await iClickSubmitAndExpectUrl(CHECK_JURISDICTION);

  await iClickSubmitAndExpectUrl(WHERE_YOUR_LIVES_ARE_BASED_URL);

  iConfirmWeLiveInEnglandOrWales();
  await iClickSubmitAndExpectUrl(JURISDICTION_INTERSTITIAL_URL);

  await iClickSubmitAndExpectUrl(ENTER_YOUR_NAME);

  await iClearTheForm();
  iEnterMyName();
  await iClickSubmitAndExpectUrl(CHECK_YOUR_NAME);

  await iClearTheForm();
  iSelectNo();
  await iClickSubmitAndExpectUrl(YOUR_CERTIFICATE_NAME);

  await iClearTheForm();
  iEnterMyCertificateName();
  await iClickSubmitAndExpectUrl(THEIR_NAME);

  await iClearTheForm();
  iEnterTheirName();
  await iClickSubmitAndExpectUrl(CHECK_THEIR_NAME);

  await iClearTheForm();
  iSelectNo();
  await iClickSubmitAndExpectUrl(THEIR_CERTIFICATE_NAME);

  await iClearTheForm();
  iEnterTheirCertificateName();
  await iClickSubmitAndExpectUrl(HOW_THE_COURTS_WILL_CONTACT_YOU);

  await iClearTheForm();
  iAgreeTheCourtCanContactMeByEmail();
  await iClickSubmitAndExpectUrl(ENGLISH_OR_WELSH);

  iSelectRadioValue(LanguagePreference.English);
  await iClickSubmitAndExpectUrl(ADDRESS_PRIVATE);

  iSetPrivateAddress(false);
  await iClickSubmitAndExpectUrl(ENTER_YOUR_ADDRESS);

  await iEnterTheUkAddress(DEFAULT_ADDRESS);
  await iClickSubmitAndExpectUrl(DO_THEY_HAVE_A_SOLICITOR);

  iSelectNo();
  await iClickSubmitAndExpectUrl(THEIR_EMAIL_ADDRESS);

  await iClearTheForm();
  iEnterTheirDefaultEmailAddress();
  await iClickSubmitAndExpectUrl(DO_YOU_HAVE_ADDRESS);

  iSelectYes();
  await iClickSubmitAndExpectUrl(ENTER_THEIR_ADDRESS);

  await iEnterTheUkAddress(DEFAULT_ADDRESS);
  await iClickSubmitAndExpectUrl(OTHER_COURT_CASES);

  iSelectNo();
  await iClickSubmitAndExpectUrl(MONEY_PROPERTY);

  iSelectNo();
  await iClickSubmitAndExpectUrl(UPLOAD_YOUR_DOCUMENTS);

  await iClearTheForm();
  iCannotUploadDocs();
  await iClickSubmitAndExpectUrl(CHECK_ANSWERS_URL);

  await iClearTheForm();
  iConfirmPrayerAndStatementOfTruth();
  await iClickSubmitAndExpectUrl(PAY_YOUR_FEE);
});
