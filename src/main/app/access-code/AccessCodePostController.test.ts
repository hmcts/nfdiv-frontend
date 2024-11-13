import { mockRequest, mockRequestApp2 } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { HOME_URL, SIGN_OUT_URL } from '../../steps/urls';
import * as oidc from '../auth/user/oidc';
import * as caseApi from '../case/case-api';
import { ApplicationType, SYSTEM_LINK_APPLICANT_1, SYSTEM_LINK_APPLICANT_2 } from '../case/definition';
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

  test('Should have no errors and redirect to the next page when applicant request access', async () => {
    const body = { accessCode: 'QWERTY78', caseReference: '1234123412341234' };
    const controller = new AccessCodePostController(mockFormContent.fields);

    const caseApiMockFn = {
      triggerEvent: jest.fn(() => {
        return {
          accessCodeApplicant1: 'QWERTY78',
          id: '1234123412341234',
          applicationType: ApplicationType.SOLE_APPLICATION,
        };
      }),
      getCaseById: jest.fn(() => {
        return {
          accessCodeApplicant1: 'QWERTY78',
          id: '1234123412341234',
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
    await controller.post(req, res);

    expect(caseApiMockFn.triggerEvent).toHaveBeenCalledWith(
      '1234123412341234',
      {
        accessCode: 'QWERTY78',
        caseReference: '1234123412341234',
        applicant1Email: 'test@example.com',
        applicant1FirstNames: 'First name',
        applicant1LastNames: 'Last name',
        applicant1UserId: '123456',
      },
      SYSTEM_LINK_APPLICANT_1
    );
    expect(res.redirect).toHaveBeenCalledWith(`${HOME_URL}`);
    expect(req.session.errors).toStrictEqual([]);
    expect(req.session.existingCaseId).toStrictEqual('1234123412341234');
  });

  test('Should have no errors and redirect to the next page in joint application journey', async () => {
    const body = { accessCode: 'QWERTY78', caseReference: '1234123412341234' };
    const controller = new AccessCodePostController(mockFormContent.fields);

    const caseApiMockFn = {
      triggerEvent: jest.fn(() => {
        return {
          accessCode: 'QWERTY78',
          id: '1234123412341234',
          applicationType: ApplicationType.JOINT_APPLICATION,
        };
      }),
      getCaseById: jest.fn(() => {
        return {
          accessCode: 'QWERTY78',
          id: '1234123412341234',
          applicationType: ApplicationType.JOINT_APPLICATION,
        };
      }),
      unlinkStaleDraftCaseIfFound: jest.fn(() => {
        return undefined;
      }),
    };
    (getCaseApiMock as jest.Mock).mockReturnValue(caseApiMockFn);

    const req = mockRequestApp2({ body });
    const res = mockResponse();
    await controller.post(req, res);

    expect(caseApiMockFn.triggerEvent).toHaveBeenCalledWith(
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
    expect(res.redirect).toHaveBeenCalledWith(`${HOME_URL}`);
    expect(req.session.errors).toStrictEqual([]);
    expect(req.session.existingCaseId).toStrictEqual('1234123412341234');
  });

  test('Should have no errors and redirect to the next page in AOS journey', async () => {
    const body = { accessCode: 'QWERTY78', caseReference: '1234123412341234' };
    const controller = new AccessCodePostController(mockFormContent.fields);

    const caseApiMockFn = {
      triggerEvent: jest.fn(() => {
        return {
          accessCode: 'QWERTY78',
          id: '1234123412341234',
          applicationType: ApplicationType.SOLE_APPLICATION,
        };
      }),
      getCaseById: jest.fn(() => {
        return {
          accessCode: 'QWERTY78',
          id: '1234123412341234',
          applicationType: ApplicationType.SOLE_APPLICATION,
        };
      }),
      unlinkStaleDraftCaseIfFound: jest.fn(() => {
        return undefined;
      }),
    };
    (getCaseApiMock as jest.Mock).mockReturnValue(caseApiMockFn);

    const req = mockRequestApp2({ body });
    req.session.userCase.applicationType = ApplicationType.SOLE_APPLICATION;
    const res = mockResponse();
    await controller.post(req, res);

    expect(caseApiMockFn.triggerEvent).toHaveBeenCalledWith(
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
    expect(res.redirect).toHaveBeenCalledWith(`${HOME_URL}`);
    expect(req.session.errors).toStrictEqual([]);
    expect(req.session.existingCaseId).toStrictEqual('1234123412341234');
  });

  test('Assert access code with whitespaces and lowercase characters is valid', async () => {
    const body = { accessCode: '  Qwer TY 78  ', caseReference: '1234123412341234' };
    const controller = new AccessCodePostController(mockFormContent.fields);

    const caseApiMockFn = {
      triggerEvent: jest.fn(() => {
        return {
          accessCode: '  Qwer TY 78  ',
          caseReference: '1234123412341234',
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
    };
    (getCaseApiMock as jest.Mock).mockReturnValue(caseApiMockFn);

    const req = mockRequestApp2({ body });
    req.session.userCase.applicationType = ApplicationType.SOLE_APPLICATION;
    const res = mockResponse();
    await controller.post(req, res);

    expect(caseApiMockFn.triggerEvent).toHaveBeenCalledWith(
      '1234123412341234',
      {
        accessCode: '  Qwer TY 78  ',
        caseReference: '1234123412341234',
        applicant2Email: 'test@example.com',
        applicant2FirstNames: 'First name',
        applicant2LastNames: 'Last name',
        respondentUserId: '123456',
      },
      SYSTEM_LINK_APPLICANT_2
    );
    expect(res.redirect).toHaveBeenCalledWith(`${HOME_URL}`);
    expect(req.session.errors).toStrictEqual([]);
  });

  test('Should return error when access code does not match and should redirect to the same page', async () => {
    const body = { accessCode: 'QWERTY67', caseReference: '1234123412341234' };
    const controller = new AccessCodePostController(mockFormContent.fields);

    const req = mockRequestApp2({ body });
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

    expect(res.redirect).toHaveBeenCalledWith('/request');
    expect(req.session.errors).toStrictEqual([
      {
        errorType: 'invalidAccessCode',
        propertyName: 'accessCode',
      },
    ]);
    expect(req.locals.logger.info).toHaveBeenCalled();
  });

  test('Should return error when case reference is invalid and should redirect to the same page', async () => {
    const body = { accessCode: 'QWERTY67', caseReference: 'INVALID' };
    const controller = new AccessCodePostController(mockFormContent.fields);

    const req = mockRequestApp2({ body });
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

    expect(res.redirect).toHaveBeenCalledWith('/request');
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

    const req = mockRequestApp2({ body });
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

    expect(res.redirect).toHaveBeenCalledWith('/request');
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
