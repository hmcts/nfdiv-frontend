import { SearchGovRecordsWhichDepartment, State, YesOrNo } from '../../main/app/case/definition';
import {
  HAVE_THEY_RECEIVED,
  HAVE_THEY_RECEIVED_REPRESENTED,
  HUB_PAGE,
  OPTIONS_FOR_PROGRESSING,
} from '../../main/steps/urls';

import { TestUserKey } from './commonHelpers/IdamUserManager';
import { BrowserCase, caseworkerUpdatesTheCase } from './commonHelpers/caseInteraction';
import {
  DEFAULT_EMAIL_ADDRESS,
  DEFAULT_PHONE_NUMBER,
  iCheckOption,
  iCheckOptionValue,
  iClickStartAndExpectUrl,
  iEnterTheDefaultEmailAddressInto,
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
import { DEFAULT_ADDRESS, SECONDARY_ADDRESS, iEnterTheUkAddress } from './postcode';

const AOS_DUE_AND_DRAFTED_LINE_SELECTOR = '#aosDueAndDraftedLine1';
const AOS_DUE_LINE_SELECTOR = '#aosDueLine1';
const AOS_AWAITING_LINE_SELECTOR = '#aosAwaitingLine1';
const AOS_DUE_AND_DRAFTED_LINK_SELECTOR = '#aosDueAndDraftedLink';
const AOS_DUE_LINK_SELECTOR = '#aosDueLink';
const DEFAULT_DATE_STRING = '2020-01-01';
const TEST_SOLICITOR_FIRM_NAME = 'Test Solicitor Firm Name';
const AOS_AWAITING_EVENT_DATA = { state: State.AwaitingAos, issueDate: DEFAULT_DATE_STRING };
const DEFAULT_NI_NUMBER = 'JB 34 66 84 E';

const signOutAndLoginAsUser = async (user: TestUserKey, expectedUrl: string, expectedElementSelector: string) => {
  iSignOut();
  await login(user);
  iWaitInUrl(expectedUrl);
  iWaitForElement(expectedElementSelector);
};

export const createCaseAtAwaitingAos = async (): Promise<void> => {
  await login(TestUserKey.APPLICANT_1, true);
  await completedFormWithFixture('issuedCase');
  await caseworkerUpdatesTheCase(AOS_AWAITING_EVENT_DATA);
  await signOutAndLoginAsUser(TestUserKey.APPLICANT_1, HUB_PAGE, AOS_AWAITING_LINE_SELECTOR);
};

export const setTheCaseToAosOverdueOrDrafted = async (
  applicant2Represented: boolean = false,
  applicant2IsPrivate: boolean = false,
  drafted: boolean = false
): Promise<void> => {
  const eventData: Partial<BrowserCase> = { state: State.AosOverdue };
  if (drafted) {
    eventData.state = State.AosDrafted;
    eventData.aosIsDrafted = YesOrNo.YES;
  }
  if (applicant2Represented) {
    eventData.applicant2SolicitorRepresented = YesOrNo.YES;
    eventData.applicant2SolicitorFirmName = TEST_SOLICITOR_FIRM_NAME;
  }
  if (applicant2IsPrivate) {
    eventData.applicant2AddressPrivate = YesOrNo.YES;
  }
  await caseworkerUpdatesTheCase(eventData);
  await signOutAndLoginAsUser(
    TestUserKey.APPLICANT_1,
    HUB_PAGE,
    drafted ? AOS_DUE_AND_DRAFTED_LINE_SELECTOR : AOS_DUE_LINE_SELECTOR
  );
  await iClickToNavigate(
    drafted ? AOS_DUE_AND_DRAFTED_LINK_SELECTOR : AOS_DUE_LINK_SELECTOR,
    undefined,
    OPTIONS_FOR_PROGRESSING
  );
};

export const setTheCaseToAosDrafted = async (
  applicant2Represented: boolean = false,
  applicant2IsPrivate: boolean = false
): Promise<void> => {
  await setTheCaseToAosOverdueOrDrafted(applicant2Represented, applicant2IsPrivate, true);
};

export const setTheCaseToAosOverdue = async (
  applicant2Represented: boolean = false,
  applicant2IsPrivate: boolean = false
): Promise<void> => {
  await setTheCaseToAosOverdueOrDrafted(applicant2Represented, applicant2IsPrivate, false);
};

export const iProgressTheJourneyToHaveTheyReceived = async (represented: boolean = false): Promise<void> => {
  await iClickToNavigate(AOS_DUE_AND_DRAFTED_LINK_SELECTOR, undefined, OPTIONS_FOR_PROGRESSING);
  await iClickStartAndExpectUrl(represented ? HAVE_THEY_RECEIVED_REPRESENTED : HAVE_THEY_RECEIVED);
};

export const prepCaseForInterimApplications = async (
  applicant2Represented: boolean = false,
  applicant2IsPrivate: boolean = false,
  drafted: boolean = true
): Promise<void> => {
  await createCaseAtAwaitingAos();
  await setTheCaseToAosOverdueOrDrafted(applicant2Represented, applicant2IsPrivate, drafted);
  await iClickStartAndExpectUrl(applicant2Represented ? HAVE_THEY_RECEIVED_REPRESENTED : HAVE_THEY_RECEIVED);
};

export const iEnterTheirNameForTheBailiff = (
  names: string | { firstName: string; lastName: string } = getTheirName()
): void => {
  if (typeof names === 'object') {
    names = `${names.firstName} ${names.lastName}`;
  }
  iEnterValueIntoInput(names, `#${getApplicantString()}BailiffPartnersName`);
};

export const iEnterTheirNameForSearchGovRecords = (
  names: string | { firstName: string; lastName: string } = getTheirName()
): void => {
  if (typeof names === 'object') {
    names = `${names.firstName} ${names.lastName}`;
  }
  iEnterValueIntoInput(names, `#${getApplicantString()}SearchGovRecordsPartnerName`);
};

Given('I prep the case for an interim application', prepCaseForInterimApplications);

Given('I prep the case for an overdue interim application', async () => {
  await prepCaseForInterimApplications(false, false, false);
});

Given('I progress the case to AwaitingAos', createCaseAtAwaitingAos);

Given('I set the case to AosDrafted', setTheCaseToAosDrafted);

Given('I set the case to AosOverdue', setTheCaseToAosOverdue);

Given('I set the case to AosDrafted and Applicant 2 is represented', async () => {
  await setTheCaseToAosDrafted(true);
});

Given('I set the case to AosDrafted and Applicant 2 is private', async () => {
  await setTheCaseToAosDrafted(false, true);
});

When("I don't know my partner's contact details", () => {
  iSelectRadio('#notKnown');
});
When('I confirm their details are up to date', () => {
  iSelectRadio('#upToDate');
});
When('I have new contact details for my partner', () => {
  iSelectRadio('#newAddress');
});
When('I have evidence they have received the papers', iSelectYes);
When('I do not have evidence they have received the papers', iSelectNo);
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
When('I select process server service', () => {
  iSelectRadio('#processServer');
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

// No response
When('I have a new address for my partner', () => {
  iSelectRadio('#newPostalAddress');
});
When('I enter their new address', async () => {
  await iEnterTheUkAddress(SECONDARY_ADDRESS);
});
When('I have a new email address for my partner', () => {
  iSelectRadio('#newEmailAddress');
});
When('I have a new postal and email address for my partner', () => {
  iSelectRadio('#bothEmailAndPostalAddress');
});
When('I want to provide a new email address for my partner', () => {
  iSelectRadio('#provideNewEmail');
});
Given('I enter their new email address', () => {
  iEnterTheDefaultEmailAddressInto(`#${getApplicantString()}NoResponsePartnerEmailAddress`);
});
Given('I want to send the papers again', () => {
  iSelectRadio('#sendPapersAgain');
});

// search gov records
Given('I want to search government records', () => {
  iSelectRadio('#search');
});
When('I enter the reason for applying', () => {
  iEnterValueIntoInput('Example reason for applying', `#${getApplicantString()}SearchGovRecordsReasonForApplying`);
});
Given('I want to search other departments', () => {
  iCheckOptionValue(SearchGovRecordsWhichDepartment.OTHER);
  iEnterValueIntoInput('Example other departments', `#${getApplicantString()}SearchGovRecordsOtherDepartmentNames`);
  iEnterValueIntoInput(
    'Example reason for these departments',
    `#${getApplicantString()}SearchGovRecordsWhyTheseDepartments`
  );
});
Given('I enter their name for the search', iEnterTheirNameForSearchGovRecords);
Given('I do not know their date of birth', () => {
  iSelectNo();
  iEnterValueIntoInput('40', `#${getApplicantString()}SearchGovRecordsPartnerApproximateAge`);
});
Given('I enter the dates they lived at this address', () => {
  iEnterValueIntoInput('Example dates', `#${getApplicantString()}SearchGovRecordsPartnerLastKnownAddressDates`);
});
Given('I enter their date of birth for the search', () => {
  iSelectYes();
  iEnterADateIntoField(DEFAULT_RELATIONSHIP_DATE, `${getApplicantString()}SearchGovRecordsPartnerDateOfBirth`);
});
Given('I enter their NI number for the search', () => {
  iEnterValueIntoInput(DEFAULT_NI_NUMBER, `#${getApplicantString()}SearchGovRecordsPartnerNationalInsurance`);
});
Given('I enter their additional address for the search', () => {
  iEnterValueIntoInput(SECONDARY_ADDRESS, `#${getApplicantString()}SearchGovRecordsPartnerAdditionalAddress1`);
  iEnterValueIntoInput('Example dates', `#${getApplicantString()}SearchGovRecordsPartnerAdditionalAddressDates1`);
});
