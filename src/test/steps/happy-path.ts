import { createRequire } from 'module';

import { LanguagePreference } from '../../main/app/case/case';
import { ApplicationType, Gender, YesOrNo } from '../../main/app/case/definition';
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

import { iSetTheUsersCaseTo } from './commonHelpers/caseInteraction';
import {
  iCannotUploadDocs,
  iCheckOption,
  iClearTheForm,
  iClickSubmit,
  iClickSubmitAndExpectUrl,
  iConfirmPrayerAndStatementOfTruth,
  iEnterValueIntoInput,
  iSelectNo,
  iSelectRadioValue,
  iSelectYes,
  iSelectYesOrNoForField,
} from './commonHelpers/elementInteraction';
import { iAmOnPage, iGoToPageAsUser } from './commonHelpers/navigation';
import { getUserEmail } from './commonHelpers/userInteraction';
import { iEnterADateIntoField } from './date';
import { iEnterTheUkAddress } from './postcode';

const requireFromFixture = createRequire(__filename);

Given("I've already completed the form using the fixture {string}", async (fixture: string) => {
  iAmOnPage(HOME_URL);
  const fixtureJson = requireFromFixture(`../functional/fixtures/${fixture}`)[fixture];

  await iSetTheUsersCaseTo(fixtureJson);

  iAmOnPage(ADDRESS_PRIVATE);
  iSelectYesOrNoForField(YesOrNo.NO, 'applicant1AddressPrivate');
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
  async (fixture: string, user: string) => {
    const fixtureJson = requireFromFixture(`../functional/fixtures/${fixture}`)[fixture];

    await iSetTheUsersCaseTo(fixtureJson);

    const resolvedApplicant = iGoToPageAsUser(ADDRESS_PRIVATE, user);
    iSelectYesOrNoForField(YesOrNo.NO, `${resolvedApplicant}AddressPrivate`);
    await iClickSubmit();
  }
);

Given("I've completed all happy path questions correctly", async () => {
  iAmOnPage(YOUR_DETAILS_URL);
  await iClearTheForm();
  iSelectRadioValue(Gender.MALE);
  await iClickSubmitAndExpectUrl(HAS_RELATIONSHIP_BROKEN_URL);

  iSelectYes();
  await iClickSubmitAndExpectUrl(RELATIONSHIP_DATE_URL);

  await iClearTheForm();
  iEnterADateIntoField('1/1/2000', 'relationshipDate');
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

  iSelectYesOrNoForField(YesOrNo.YES, 'applicant1LifeBasedInEnglandAndWales');
  iSelectYesOrNoForField(YesOrNo.YES, 'applicant2LifeBasedInEnglandAndWales');
  await iClickSubmitAndExpectUrl(JURISDICTION_INTERSTITIAL_URL);

  await iClickSubmitAndExpectUrl(ENTER_YOUR_NAME);

  await iClearTheForm();
  iEnterValueIntoInput('Test your name', '#applicant1FirstNames');
  iEnterValueIntoInput('Test your last name', '#applicant1LastNames');
  await iClickSubmitAndExpectUrl(CHECK_YOUR_NAME);

  await iClearTheForm();
  iSelectNo();
  await iClickSubmitAndExpectUrl(YOUR_CERTIFICATE_NAME);

  await iClearTheForm();
  iEnterValueIntoInput('Test your name', '#applicant1FullNameOnCertificate');
  await iClickSubmitAndExpectUrl(THEIR_NAME);

  await iClearTheForm();
  iEnterValueIntoInput('Test their name', '#applicant2FirstNames');
  iEnterValueIntoInput('Test their last name', '#applicant2LastNames');
  await iClickSubmitAndExpectUrl(CHECK_THEIR_NAME);

  await iClearTheForm();
  iSelectNo();
  await iClickSubmitAndExpectUrl(THEIR_CERTIFICATE_NAME);

  await iClearTheForm();
  iEnterValueIntoInput('Husbands name', '#applicant2FullNameOnCertificate');
  await iClickSubmitAndExpectUrl(HOW_THE_COURTS_WILL_CONTACT_YOU);

  await iClearTheForm();
  iCheckOption('#applicant1AgreeToReceiveEmails');
  await iClickSubmitAndExpectUrl(ENGLISH_OR_WELSH);

  iSelectRadioValue(LanguagePreference.English);
  await iClickSubmitAndExpectUrl(ADDRESS_PRIVATE);

  iSelectYesOrNoForField(YesOrNo.NO, 'applicant1AddressPrivate');
  await iClickSubmitAndExpectUrl(ENTER_YOUR_ADDRESS);

  await iEnterTheUkAddress('BUCKINGHAM PALACE, LONDON, SW1A 1AA');
  await iClickSubmitAndExpectUrl(DO_THEY_HAVE_A_SOLICITOR);

  iSelectNo();
  await iClickSubmitAndExpectUrl(THEIR_EMAIL_ADDRESS);

  await iClearTheForm();
  iEnterValueIntoInput('husband@example.com', '#applicant2EmailAddress');
  await iClickSubmitAndExpectUrl(DO_YOU_HAVE_ADDRESS);

  iSelectYes();
  await iClickSubmitAndExpectUrl(ENTER_THEIR_ADDRESS);

  await iEnterTheUkAddress('MINISTRY OF JUSTICE, SEVENTH FLOOR, 102, PETTY FRANCE, LONDON, SW1H 9AJ');
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
