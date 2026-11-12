import { Case } from '../../main/app/case/case';
import { CASEWORKER_REQUEST_FOR_INFORMATION } from '../../main/app/case/definition';

import { TestUserKey } from './commonHelpers/IdamUserManager';
import { triggerAnEvent } from './commonHelpers/caseInteraction';

export const caseworkerIssuesRequestForInformation = async (eventData: Partial<Case>): Promise<void> => {
  await triggerAnEvent(CASEWORKER_REQUEST_FOR_INFORMATION, eventData, TestUserKey.CASEWORKER);
};

When('a case worker issues a request for information', async () => {
  await caseworkerIssuesRequestForInformation({
    requestForInformationSoleParties: 'applicant',
    requestForInformationDetails: 'test',
  });
});

When('a case worker issues a request for information to a third party', async () => {
  await caseworkerIssuesRequestForInformation({
    requestForInformationSoleParties: 'other',
    requestForInformationDetails: 'test',
    requestForInformationName: 'third party',
    requestForInformationEmailAddress: 'thirdparty@hmcts.net',
  });
});

When('a case worker issues a request for information to app1 on a joint case', async () => {
  await caseworkerIssuesRequestForInformation({
    requestForInformationJointParties: 'applicant1',
    requestForInformationDetails: 'test',
  });
});

When('a case worker issues a request for information to app2 on a joint case', async () => {
  await caseworkerIssuesRequestForInformation({
    requestForInformationJointParties: 'applicant2',
    requestForInformationDetails: 'test',
  });
});

When('a case worker issues a request for information to both parties on a joint case', async () => {
  await caseworkerIssuesRequestForInformation({
    requestForInformationJointParties: 'both',
    requestForInformationDetails: 'test',
  });
});

When('a case worker issues a request for information to a third party on a joint case', async () => {
  await caseworkerIssuesRequestForInformation({
    requestForInformationJointParties: 'other',
    requestForInformationDetails: 'test',
    requestForInformationName: 'third party',
    requestForInformationEmailAddress: 'thirdparty@hmcts.net',
  });
});
