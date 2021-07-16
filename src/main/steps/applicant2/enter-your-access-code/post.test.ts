import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import * as oidc from '../../../app/auth/user/oidc';
import * as caseApi from '../../../app/case/CaseApi';
import { ApplicationType, SYSTEM_LINK_APPLICANT_2 } from '../../../app/case/definition';
import { Form } from '../../../app/form/Form';
import { YOU_NEED_TO_REVIEW_YOUR_APPLICATION } from '../../urls';

import { AccessCodePostController } from './post';

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
    });
  });

  afterEach(() => {
    getSystemUserMock.mockClear();
  });

  test('Should have no errors and redirect to the next page', async () => {
    const errors = [] as never[];
    const body = { accessCode: 'QWERTY78', caseReference: '1234123412341234' };
    const mockForm = {
      setFormState: jest.fn(),
      getErrors: () => errors,
      getParsedBody: () => body,
    } as unknown as Form;
    const controller = new AccessCodePostController(mockForm);

    const caseData = {
      accessCode: 'QWERTY78',
      caseReference: '1234123412341234',
      applicationType: ApplicationType.JOINT_APPLICATION,
    };

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
    });
    (req.locals.api.triggerEvent as jest.Mock).mockResolvedValueOnce(caseData);
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234123412341234',
      {
        accessCode: 'QWERTY78',
        caseReference: '1234123412341234',
        respondentUserId: '123456',
      },
      SYSTEM_LINK_APPLICANT_2
    );
    expect(res.redirect).toBeCalledWith(YOU_NEED_TO_REVIEW_YOUR_APPLICATION);
    expect(req.session.errors).toStrictEqual([]);
  });

  test('Should return error when access code does not match and should redirect to the same page', async () => {
    const errors = [] as never[];
    const body = { accessCode: 'QWERTY67', caseReference: '1234123412341234' };
    const mockForm = {
      setFormState: jest.fn(),
      getErrors: () => errors,
      getParsedBody: () => body,
    } as unknown as Form;
    const controller = new AccessCodePostController(mockForm);

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
  });

  test('Should return error when case reference is invalid and should redirect to the same page', async () => {
    const errors = [] as never[];
    const body = { accessCode: 'QWERTY67', caseReference: 'INVALID' };
    const mockForm = {
      setFormState: jest.fn(),
      getErrors: () => errors,
      getParsedBody: () => body,
    } as unknown as Form;
    const controller = new AccessCodePostController(mockForm);

    const req = mockRequest({ body });
    (getCaseApiMock as jest.Mock).mockReturnValue({
      triggerEvent: jest.fn(),
      getCaseById: jest.fn(() => {
        throw Error;
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
    const errors = [] as never[];
    const body = { accessCode: 'QWERTY78', caseReference: '1234123412341234' };
    const mockForm = {
      setFormState: jest.fn(),
      getErrors: () => errors,
      getParsedBody: () => body,
    } as unknown as Form;
    const controller = new AccessCodePostController(mockForm);

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
});
