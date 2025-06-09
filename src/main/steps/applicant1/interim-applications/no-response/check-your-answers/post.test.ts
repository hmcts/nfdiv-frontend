import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import * as oidc from '../../../../../app/auth/user/oidc';
import * as caseApi from '../../../../../app/case/case-api';
import { ApplicationType, CASEWORKER_REISSUE_APPLICATION } from '../../../../../app/case/definition';
import { FormContent } from '../../../../../app/form/Form';

import CheckAnswersPostController from './post';

const getSystemUserMock = jest.spyOn(oidc, 'getSystemUser');
const getCaseApiMock = jest.spyOn(caseApi, 'getCaseApi');

describe('CheckYourAnswerPostController', () => {
  beforeEach(() => {
    getSystemUserMock.mockResolvedValue({
      accessToken: 'token',
      id: '1234',
      email: 'user@caseworker.com',
      givenName: 'case',
      familyName: 'worker',
      roles: ['caseworker'],
    });
  });
  const mockFormContent = {
    fields: {},
  } as unknown as FormContent;

  it('triggers CASEWORKER_REISSUE_APPLICATION when sole application', async () => {
    const body = {
      applicationType: ApplicationType.SOLE_APPLICATION,
      applicant2Address1: '123',
      applicant2Address2: 'street',
      applicant2Address3: '',
      applicant2AddressPostcode: 'SW1A 1AA',
      applicant2AddressCountry: 'United Kingdom',
      applicant2FirstName: 'John',
      applicant2LastName: 'Smith',
      applicant2AddressPrivate: 'No',
      applicant2AddressPrivateOtherDetails: '',
      applicant2AddressPublic: 'No',
    };
    const checkYourAnswerPostController = new CheckAnswersPostController(mockFormContent.fields);

    const caseApiMockFn = {
      triggerEvent: jest.fn(() => {
        return {
          id: '123456',
          applicationType: ApplicationType.SOLE_APPLICATION,
          applicant2Address: '123 street, SW1A 1AA, United Kingdom',
        };
      }),
      getCaseById: jest.fn(() => {
        return {
          id: '123456',
          applicationType: ApplicationType.SOLE_APPLICATION,
        };
      }),
      unlinkStaleDraftCaseIfFound: jest.fn(() => {
        return undefined;
      }),
    };
    (getCaseApiMock as jest.Mock).mockReturnValue(caseApiMockFn);
    const req = mockRequest({ body });

    const res = mockResponse();
    await checkYourAnswerPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('123456', { ...body }, CASEWORKER_REISSUE_APPLICATION);
  });
});
