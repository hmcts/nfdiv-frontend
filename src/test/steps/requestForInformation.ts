import { CASEWORKER_REQUEST_FOR_INFORMATION } from '../../main/app/case/definition';

import { triggerAnEvent } from './commonHelpers/caseInteraction';

When('a case worker issues a request for information', async () => {
  await triggerAnEvent(CASEWORKER_REQUEST_FOR_INFORMATION, {
    requestForInformationSoleParties: 'applicant',
    requestForInformationDetails: 'test',
  });
});

When('a case worker issues a request for information to a third party', async () => {
  await triggerAnEvent(CASEWORKER_REQUEST_FOR_INFORMATION, {
    requestForInformationSoleParties: 'other',
    requestForInformationDetails: 'test',
    requestForInformationName: 'third party',
    requestForInformationEmailAddress: 'thirdparty@hmcts.net',
  });
});

When('a case worker issues a request for information to app1 on a joint case', async () => {
  await triggerAnEvent(CASEWORKER_REQUEST_FOR_INFORMATION, {
    requestForInformationJointParties: 'applicant1',
    requestForInformationDetails: 'test',
  });
});

When('a case worker issues a request for information to app2 on a joint case', async () => {
  await triggerAnEvent(CASEWORKER_REQUEST_FOR_INFORMATION, {
    requestForInformationJointParties: 'applicant2',
    requestForInformationDetails: 'test',
  });
});

When('a case worker issues a request for information to both parties on a joint case', async () => {
  await triggerAnEvent(CASEWORKER_REQUEST_FOR_INFORMATION, {
    requestForInformationJointParties: 'both',
    requestForInformationDetails: 'test',
  });
});

When('a case worker issues a request for information to a third party on a joint case', async () => {
  await triggerAnEvent(CASEWORKER_REQUEST_FOR_INFORMATION, {
    requestForInformationJointParties: 'other',
    requestForInformationDetails: 'test',
    requestForInformationName: 'third party',
    requestForInformationEmailAddress: 'thirdparty@hmcts.net',
  });
});
