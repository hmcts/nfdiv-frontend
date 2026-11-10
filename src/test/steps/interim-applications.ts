import { CITIZEN_UPDATE_CASE_STATE_AAT, State, YesOrNo } from '../../main/app/case/definition';
import { HAVE_THEY_RECEIVED, HUB_PAGE, OPTIONS_FOR_PROGRESSING } from '../../main/steps/urls';

import { TestUserKey } from './commonHelpers/IdamUserManager';
import { iSetTheCaseStateAndReSignIn, triggerAnEvent } from './commonHelpers/caseInteraction';
import {
  DEFAULT_EMAIL_ADDRESS,
  DEFAULT_PHONE_NUMBER,
  iCheckOption,
  iClickStartAndExpectUrl,
  iEnterValueIntoInput,
  iSelectNo,
  iSelectRadio,
  iSelectYes,
  iWaitForElement,
} from './commonHelpers/elementInteraction';
import { iClickToNavigate, iWaitInUrl } from './commonHelpers/navigation';
import { getApplicantString, getTheirName, iSignOut, login } from './commonHelpers/userInteraction';
import { DEFAULT_RELATIONSHIP_DATE, iEnterADateIntoField } from './date';
import { completedFormWithFixture } from './happy-path';
import { DEFAULT_ADDRESS, iEnterTheUkAddress } from './postcode';

const signOutAndLoginAsUser = async (user: TestUserKey, expectedUrl: string, expectedElementSelector: string) => {
  iSignOut();
  await login(user);
  iWaitInUrl(expectedUrl);
  iWaitForElement(expectedElementSelector);
};

export const createCaseAtAwaitingAos = async (): Promise<void> => {
  await login(TestUserKey.APPLICANT_1, true);
  await completedFormWithFixture('issuedCase');
  await triggerAnEvent(CITIZEN_UPDATE_CASE_STATE_AAT, { ['issueDate']: '2023-10-31' });
  await iSetTheCaseStateAndReSignIn(State.AwaitingAos);
};

export const prepCaseForInterimApplications = async (): Promise<void> => {
  await createCaseAtAwaitingAos();
  await signOutAndLoginAsUser(TestUserKey.APPLICANT_1, HUB_PAGE, '#aosAwaitingLine1');
  await iSetTheCaseStateAndReSignIn(State.AosDrafted);
  await triggerAnEvent(CITIZEN_UPDATE_CASE_STATE_AAT, { ['aosIsDrafted']: YesOrNo.YES });
  await signOutAndLoginAsUser(TestUserKey.APPLICANT_1, HUB_PAGE, '#aosDueAndDraftedLine1');
  await iClickToNavigate('#aosDueAndDraftedLink', undefined, OPTIONS_FOR_PROGRESSING);
  await iClickStartAndExpectUrl(HAVE_THEY_RECEIVED);
};

export const iEnterTheirNameForTheBailiff = (
  names: string | { firstName: string; lastName: string } = getTheirName()
): void => {
  if (typeof names === 'object') {
    names = `${names.firstName} ${names.lastName}`;
  }
  iEnterValueIntoInput(names, `#${getApplicantString()}BailiffPartnersName`);
};

Given('I prep the case for an interim application', prepCaseForInterimApplications);

Given('I progress the case to AwaitingAos', createCaseAtAwaitingAos);

When("I don't know my partner's contact details", () => {
  iSelectRadio('#notKnown');
});
When('I confirm their details are up to date', () => {
  iSelectRadio('#upToDate');
});
When('I have evidence they have received the papers', iSelectYes);
When('I do not have a certificate of service', iSelectNo);
When('I select alternative service', () => {
  iSelectRadio('#alternativeService');
});
When('I select in person service', () => {
  iSelectRadio('#inPersonService');
});
When('I select bailiff service', () => {
  iSelectRadio('#bailiffService');
  iCheckOption('#respondentAddressInEnglandWales');
});
When('I confirm I understand', () => {
  iCheckOption(`#${getApplicantString()}InterimAppsIUnderstand`);
});

// Alternative Service
Given('I enter my alternative service reason', () => {
  iEnterValueIntoInput('Alternative service reason', `#${getApplicantString()}AltServiceReasonForApplying`);
});
When('I want to send papers in a different way', () => {
  iSelectRadio('#inADifferentWay');
});
When('I want to serve by phone', () => {
  const applicantString = getApplicantString();
  iCheckOption(`#${applicantString}AltServiceDifferentWays`);
  iEnterValueIntoInput('07700 900457', `#${applicantString}AltServicePartnerPhone`);
});
Given('I enter more details', () => {
  iEnterValueIntoInput('More details', `#${getApplicantString()}AltServiceMethodJustification`);
});

// Bailiff Service
Given('I enter their name for the bailiff', iEnterTheirNameForTheBailiff);
Given('I enter their phone number for the bailiff', () => {
  iEnterValueIntoInput(DEFAULT_PHONE_NUMBER, `#${getApplicantString()}BailiffPartnersPhone`);
});
Given('I enter their approximate age', () => {
  iEnterValueIntoInput('52', `#${getApplicantString()}BailiffPartnersApproximateAge`);
});
Given('I enter their height', () => {
  iEnterValueIntoInput('6 feet', `#${getApplicantString()}BailiffPartnersHeight`);
});
Given('I enter their hair colour', () => {
  iEnterValueIntoInput('Brown', `#${getApplicantString()}BailiffPartnersHairColour`);
});
Given('I enter their eye colour', () => {
  iEnterValueIntoInput('Green', `#${getApplicantString()}BailiffPartnersEyeColour`);
});
Given('I enter their ethnic group', () => {
  iEnterValueIntoInput('Ethnic group', `#${getApplicantString()}BailiffPartnersEthnicGroup`);
});
Given('I enter their distinguishing features', () => {
  iEnterValueIntoInput('None', `#${getApplicantString()}BailiffPartnersDistinguishingFeatures`);
});
Given('I enter the best time to serve the papers', () => {
  iEnterValueIntoInput('Anytime', `#${getApplicantString()}BailiffBestTimeToServe`);
});
Given('I enter details of their vehicle', () => {
  iEnterValueIntoInput('Car', `#${getApplicantString()}BailiffPartnerVehicleOtherDetails`);
});
Given('my partner has been violent', () => {
  iSelectYes();
  iEnterValueIntoInput('Example', `#${getApplicantString()}BailiffPartnerViolenceDetails`);
});
Given('my partner has made threats', () => {
  iSelectYes();
  iEnterValueIntoInput('Example', `#${getApplicantString()}BailiffPartnerThreatsDetails`);
});
Given('the police have been involved', () => {
  iSelectYes();
  iEnterValueIntoInput('Example', `#${getApplicantString()}BailiffPoliceInvolvedDetails`);
});
Given('social services have been involved', () => {
  iSelectYes();
  iEnterValueIntoInput('Example', `#${getApplicantString()}BailiffSocialServicesInvolvedDetails`);
});
Given('my partner keeps dangerous animals', () => {
  iSelectYes();
  iEnterValueIntoInput('Example', `#${getApplicantString()}BailiffDangerousAnimalsDetails`);
});
Given('my partner has a history of mental health issues', () => {
  iSelectYes();
  iEnterValueIntoInput('Example', `#${getApplicantString()}BailiffPartnerMentalIssuesDetails`);
});
Given('my partner has a firearms licence', () => {
  iSelectYes();
  iEnterValueIntoInput('Example', `#${getApplicantString()}BailiffPartnerFirearmsLicenseDetails`);
});
Given('I click return to hub', async () => {
  await iClickToNavigate('#returnToHub', undefined, HUB_PAGE);
});

// Deemed Service
Given('I enter the evidence details', () => {
  iEnterValueIntoInput('Evidence details', `#${getApplicantString()}DeemedEvidenceDetails`);
});
Given('I enter the no evidence statement', () => {
  iEnterValueIntoInput('No Evidence', `#${getApplicantString()}DeemedNoEvidenceStatement`);
});

// Dispense with Service
Given('I have no contact details for my partner', () => {
  iSelectRadio('#noContactDetails');
});
Given('I enter the date we last lived together', () => {
  iEnterADateIntoField(DEFAULT_RELATIONSHIP_DATE, `${getApplicantString()}DispenseLastLivedTogetherDate`);
});
Given('I enter their last known address', async () => {
  await iEnterTheUkAddress(DEFAULT_ADDRESS);
});
Given('I enter their past address', () => {
  const applicantString = getApplicantString();
  iEnterValueIntoInput(DEFAULT_ADDRESS, `#${applicantString}DispensePartnerPastAddress1`);
  iEnterValueIntoInput('Example Enquiries', `#${applicantString}DispensePartnerPastAddressEnquiries1`);
});
Given('I enter the date they were last seen', () => {
  const applicantString = getApplicantString();
  iEnterADateIntoField(DEFAULT_RELATIONSHIP_DATE, `${applicantString}DispensePartnerLastSeenOrHeardOfDate`);
  iEnterValueIntoInput('Example last seen description', `#${applicantString}DispensePartnerLastSeenDescription`);
});
Given('I enter details of attempts to contact them via email', () => {
  iEnterValueIntoInput(
    DEFAULT_EMAIL_ADDRESS + ' - no response to email',
    `#${getApplicantString()}DispensePartnerEmailAddresses`
  );
});
Given('I enter details of attempts to contact them via phone', () => {
  iEnterValueIntoInput(
    DEFAULT_PHONE_NUMBER + ' - no response to phone',
    `#${getApplicantString()}DispensePartnerPhoneNumbers`
  );
});
Given('I enter the tracing agent results', () => {
  iEnterValueIntoInput('Example tracing agent results', `#${getApplicantString()}DispenseTracingAgentResults`);
});
Given('I enter the results of an online trace', () => {
  iEnterValueIntoInput('Example online trace results', `#${getApplicantString()}DispenseTracingOnlineResults`);
});
Given('I enter the results of an online search', () => {
  iEnterValueIntoInput('Example online search results', `#${getApplicantString()}DispenseSearchingOnlineResults`);
});
Given('I enter details of attempts to contact their employer', () => {
  const applicantString = getApplicantString();
  iEnterValueIntoInput('Example Employer', `#${applicantString}DispenseEmployerName`);
  iEnterValueIntoInput(DEFAULT_ADDRESS, `#${applicantString}DispenseEmployerAddress`);
  iEnterValueIntoInput('Example Occupation', `#${applicantString}DispensePartnerOccupation`);
  iEnterValueIntoInput('Example employer contact results', `#${applicantString}DispenseContactingEmployerResults`);
});
Given('I enter details of how they contact the children', () => {
  iEnterValueIntoInput('Example contact method', `#${getApplicantString()}DispenseHowPartnerContactChildren`);
});
Given('I enter the results of a child maintenance search', () => {
  iEnterValueIntoInput(
    'Example child maintenance search results',
    `#${getApplicantString()}DispenseChildMaintenanceResults`
  );
});
Given('I enter contact details for their friends and relatives', () => {
  iEnterValueIntoInput(
    'Example friends and relatives contact details',
    `#${getApplicantString()}DispenseContactFriendsOrRelativesDetails`
  );
});
Given('I enter details of my other enquiries', () => {
  iEnterValueIntoInput('Example other enquiries', `#${getApplicantString()}DispenseOtherEnquiries`);
});
