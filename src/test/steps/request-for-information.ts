import { Case } from '../../main/app/case/case';
import {
  CASEWORKER_REQUEST_FOR_INFORMATION,
  RequestForInformationJointParties,
  RequestForInformationSoleParties,
} from '../../main/app/case/definition';
import { RESPOND_TO_COURT_FEEDBACK } from '../../main/steps/urls';

import { triggerAnEvent } from './commonHelpers/case-interaction';
import { iClickProvideInformation, iEnterValueIntoInput } from './commonHelpers/element-interaction';
import { TestUserKey } from './commonHelpers/idam-user-manager';
import { getApplicantString } from './commonHelpers/user-interaction';

const REQUEST_FOR_INFORMATION_DETAILS = 'Example request for information details';
const REQUEST_FOR_INFORMATION_THIRD_PARTY_NAME = 'Example third party name';
const REQUEST_FOR_INFORMATION_THIRD_PARTY_EMAIL_ADDRESS = 'thirdparty@hmcts.net';
const APPLICANT_RFI_DRAFT_RESPONSE_DETAILS_SELECTOR_SUFFIX = 'RfiDraftResponseDetails';

const getRfiApplicantString = (): 'app1' | 'app2' => {
  const applicantString = getApplicantString();
  return applicantString === 'applicant1' ? 'app1' : 'app2';
};

export const caseworkerIssuesRequestForInformation = async (eventData: Partial<Case>): Promise<void> => {
  await triggerAnEvent(CASEWORKER_REQUEST_FOR_INFORMATION, eventData, TestUserKey.CASEWORKER);
};

When('a case worker issues a request for information', async () => {
  await caseworkerIssuesRequestForInformation({
    requestForInformationSoleParties: RequestForInformationSoleParties.APPLICANT,
    requestForInformationDetails: REQUEST_FOR_INFORMATION_DETAILS,
  });
});

When('a case worker issues a request for information to a third party', async () => {
  await caseworkerIssuesRequestForInformation({
    requestForInformationSoleParties: RequestForInformationSoleParties.OTHER,
    requestForInformationDetails: REQUEST_FOR_INFORMATION_DETAILS,
    requestForInformationName: REQUEST_FOR_INFORMATION_THIRD_PARTY_NAME,
    requestForInformationEmailAddress: REQUEST_FOR_INFORMATION_THIRD_PARTY_EMAIL_ADDRESS,
  });
});

When('a case worker issues a request for information to app1 on a joint case', async () => {
  await caseworkerIssuesRequestForInformation({
    requestForInformationJointParties: RequestForInformationJointParties.APPLICANT1,
    requestForInformationDetails: REQUEST_FOR_INFORMATION_DETAILS,
  });
});

When('a case worker issues a request for information to app2 on a joint case', async () => {
  await caseworkerIssuesRequestForInformation({
    requestForInformationJointParties: RequestForInformationJointParties.APPLICANT2,
    requestForInformationDetails: REQUEST_FOR_INFORMATION_DETAILS,
  });
});

When('a case worker issues a request for information to both parties on a joint case', async () => {
  await caseworkerIssuesRequestForInformation({
    requestForInformationJointParties: RequestForInformationJointParties.BOTH,
    requestForInformationDetails: REQUEST_FOR_INFORMATION_DETAILS,
  });
});

When('a case worker issues a request for information to a third party on a joint case', async () => {
  await caseworkerIssuesRequestForInformation({
    requestForInformationJointParties: RequestForInformationJointParties.OTHER,
    requestForInformationDetails: REQUEST_FOR_INFORMATION_DETAILS,
    requestForInformationName: REQUEST_FOR_INFORMATION_THIRD_PARTY_NAME,
    requestForInformationEmailAddress: REQUEST_FOR_INFORMATION_THIRD_PARTY_EMAIL_ADDRESS,
  });
});

When('I click to respond to court feedback', async () => {
  await iClickProvideInformation(RESPOND_TO_COURT_FEEDBACK);
});

Given('I provide the requested information', async () => {
  iEnterValueIntoInput(
    'Example response details',
    `#${getRfiApplicantString()}${APPLICANT_RFI_DRAFT_RESPONSE_DETAILS_SELECTOR_SUFFIX}`
  );
});
