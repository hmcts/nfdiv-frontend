import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { APPLICANT_2, HUB_PAGE, RESPONDENT, SIGN_OUT_URL, YOU_NEED_TO_REVIEW_YOUR_APPLICATION } from '../../steps/urls';
import * as oidc from '../auth/user/oidc';
import * as caseApi from '../case/case-api';
import { ApplicationType, SYSTEM_LINK_APPLICANT_2 } from '../case/definition';
import { FormContent, FormFields } from '../form/Form';

import { AccessCodePostController } from './AccessCodePostController';

const getSystemUserMock = jest.spyOn(oidc, 'getSystemUser');
const getCaseApiMock = jest.spyOn(caseApi, 'getCaseApi');

describe('AccessCodePostController', () => {
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

  afterEach(() => {
    getSystemUserMock.mockClear();
  });

  const mockFormContent = {
    fields: {
      accessCode: {},
      caseReference: {},
    },
  } as unknown as FormContent;

  test('Should have no errors and redirect to the next page in joint application journey', async () => {
    const body = { accessCode: 'QWERTY78', caseReference: '1234123412341234' };
    const controller = new AccessCodePostController(mockFormContent.fields);

    const caseData = {
      accessCode: 'QWERTY78',
      caseReference: '1234123412341234',
      applicationType: ApplicationType.JOINT_APPLICATION,
    };

    const req = mockRequest({ body });
    (getCaseApiMock as jest.Mock).mockReturnValue({
      triggerEvent: jest.fn(() => {
        return {
          applicationType: ApplicationType.JOINT_APPLICATION,
        };
      }),
      getCaseById: jest.fn(() => {
        return {
          accessCode: 'QWERTY78',
          caseReference: '1234123412341234',
          applicationType: ApplicationType.JOINT_APPLICATION,
        };
      }),
      unlinkStaleDraftCaseIfFound: jest.fn(() => {
        return undefined;
      }),
    });
    (req.locals.api.triggerEvent as jest.Mock).mockResolvedValueOnce(caseData);
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234123412341234',
      {
        accessCode: 'QWERTY78',
        caseReference: '1234123412341234',
        applicant2Email: 'test@example.com',
        applicant2FirstNames: 'First name',
        applicant2LastNames: 'Last name',
        respondentUserId: '123456',
      },
      SYSTEM_LINK_APPLICANT_2
    );
    expect(res.redirect).toBeCalledWith(`${APPLICANT_2}${YOU_NEED_TO_REVIEW_YOUR_APPLICATION}`);
    expect(req.session.errors).toStrictEqual([]);
  });

  test('Should have no errors and redirect to the next page in AOS journey', async () => {
    const body = { accessCode: 'QWERTY78', caseReference: '1234123412341234' };
    const controller = new AccessCodePostController(mockFormContent.fields);

    const caseData = {
      accessCode: 'QWERTY78',
      caseReference: '1234123412341234',
      applicationType: ApplicationType.SOLE_APPLICATION,
    };

    const req = mockRequest({ body });
    (getCaseApiMock as jest.Mock).mockReturnValue({
      triggerEvent: jest.fn(() => {
        return {
          applicationType: ApplicationType.SOLE_APPLICATION,
        };
      }),
      getCaseById: jest.fn(() => {
        return {
          accessCode: 'QWERTY78',
          caseReference: '1234123412341234',
          applicationType: ApplicationType.SOLE_APPLICATION,
        };
      }),
      unlinkStaleDraftCaseIfFound: jest.fn(() => {
        return undefined;
      }),
    });
    req.session.userCase.applicationType = ApplicationType.SOLE_APPLICATION;
    (req.locals.api.triggerEvent as jest.Mock).mockResolvedValueOnce(caseData);
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234123412341234',
      {
        accessCode: 'QWERTY78',
        caseReference: '1234123412341234',
        applicant2Email: 'test@example.com',
        respondentUserId: '123456',
      },
      SYSTEM_LINK_APPLICANT_2
    );
    expect(res.redirect).toBeCalledWith(`${RESPONDENT}${HUB_PAGE}`);
    expect(req.session.errors).toStrictEqual([]);
  });

  test('Assert access code with whitespaces and lowercase characters is valid', async () => {
    const body = { accessCode: '  Qwer TY 78  ', caseReference: '1234123412341234' };
    const controller = new AccessCodePostController(mockFormContent.fields);

    const caseData = {
      accessCode: '  Qwer TY 78  ',
      caseReference: '1234123412341234',
      applicationType: ApplicationType.SOLE_APPLICATION,
    };

    const req = mockRequest({ body });
    (getCaseApiMock as jest.Mock).mockReturnValue({
      triggerEvent: jest.fn(() => {
        return {
          applicationType: ApplicationType.SOLE_APPLICATION,
        };
      }),
      getCaseById: jest.fn(() => {
        return {
          accessCode: 'QWERTY78',
          caseReference: '1234123412341234',
          applicationType: ApplicationType.SOLE_APPLICATION,
        };
      }),
      unlinkStaleDraftCaseIfFound: jest.fn(() => {
        return undefined;
      }),
    });
    req.session.userCase.applicationType = ApplicationType.SOLE_APPLICATION;
    (req.locals.api.triggerEvent as jest.Mock).mockResolvedValueOnce(caseData);
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234123412341234',
      {
        accessCode: '  Qwer TY 78  ',
        caseReference: '1234123412341234',
        applicant2Email: 'test@example.com',
        respondentUserId: '123456',
      },
      SYSTEM_LINK_APPLICANT_2
    );
    expect(res.redirect).toBeCalledWith(`${RESPONDENT}${HUB_PAGE}`);
    expect(req.session.errors).toStrictEqual([]);
  });

  test('Should return error when access code does not match and should redirect to the same page', async () => {
    const body = { accessCode: 'QWERTY67', caseReference: '1234123412341234' };
    const controller = new AccessCodePostController(mockFormContent.fields);

    const req = mockRequest({ body });
    (getCaseApiMock as jest.Mock).mockReturnValue({
      triggerEvent: jest.fn(),
      getCaseById: jest.fn(() => {
        return {
          accessCode: 'QWERTY78',
          caseReference: '1234123412341234',
          applicationType: ApplicationType.JOINT_APPLICATION,
        };
      }),
      unlinkStaleDraftCaseIfFound: jest.fn(() => {
        return undefined;
      }),
    });
    const res = mockResponse();
    await controller.post(req, res);

    expect(res.redirect).toBeCalledWith('/request');
    expect(req.session.errors).toStrictEqual([
      {
        errorType: 'invalidAccessCode',
        propertyName: 'accessCode',
      },
    ]);
    expect(req.locals.logger.error).toBeCalled();
  });

  test('Should return error when case reference is invalid and should redirect to the same page', async () => {
    const body = { accessCode: 'QWERTY67', caseReference: 'INVALID' };
    const controller = new AccessCodePostController(mockFormContent.fields);

    const req = mockRequest({ body });
    (getCaseApiMock as jest.Mock).mockReturnValue({
      triggerEvent: jest.fn(),
      getCaseById: jest.fn(() => {
        throw Error;
      }),
      unlinkStaleDraftCaseIfFound: jest.fn(() => {
        return undefined;
      }),
    });
    const res = mockResponse();
    await controller.post(req, res);

    expect(res.redirect).toBeCalledWith('/request');
    expect(req.session.errors).toStrictEqual([
      {
        errorType: 'invalidReference',
        propertyName: 'caseReference',
      },
    ]);
  });

  test('Should return error when case cannot be saved and should redirect to the same page', async () => {
    const body = { accessCode: 'QWERTY78', caseReference: '1234123412341234' };
    const controller = new AccessCodePostController(mockFormContent.fields);

    const req = mockRequest({ body });
    (getCaseApiMock as jest.Mock).mockReturnValue({
      triggerEvent: jest.fn(() => {
        throw Error;
      }),
      getCaseById: jest.fn(() => {
        return {
          accessCode: 'QWERTY78',
          caseReference: '1234123412341234',
          applicationType: ApplicationType.JOINT_APPLICATION,
        };
      }),
      unlinkStaleDraftCaseIfFound: jest.fn(() => {
        return undefined;
      }),
    });
    const res = mockResponse();
    await controller.post(req, res);

    expect(res.redirect).toBeCalledWith('/request');
    expect(req.session.errors).toStrictEqual([
      {
        errorType: 'errorSaving',
        propertyName: '*',
      },
    ]);
  });
  it('saves and signs out', async () => {
    const req = mockRequest();
    req.body['saveAndSignOut'] = true;
    const res = mockResponse();

    const controller = new AccessCodePostController({} as unknown as FormFields);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalledWith(SIGN_OUT_URL);
  });
});
