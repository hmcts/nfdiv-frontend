import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import * as steps from '../../steps';
import * as oidc from '../auth/user/oidc';
import * as caseApi from '../case/CaseApi';
import { ApplicationType, CITIZEN_LINK_APPLICANT_2 } from '../case/definition';
import { Form } from '../form/Form';

import { AccessCodePostController } from './AccessCodePostController';

const getCaseWorkerUserMock = jest.spyOn(oidc, 'getCaseWorkerUser');
const getNextStepUrlMock = jest.spyOn(steps, 'getNextStepUrl');
const getCaseApiMock = jest.spyOn(caseApi, 'getCaseApi');

describe('AccessCodePostController', () => {
  beforeEach(() => {
    getCaseWorkerUserMock.mockReturnValue(
      Promise.resolve({
        accessToken: 'token',
        id: '1234',
        email: 'user@caseworker.com',
        givenName: 'case',
        familyName: 'worker',
      })
    );
    getNextStepUrlMock.mockReturnValue('/next-step-url');
  });

  afterEach(() => {
    getCaseWorkerUserMock.mockClear();
    getNextStepUrlMock.mockClear();
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

    expect(getNextStepUrlMock).toBeCalled();
    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      {
        accessCode: 'QWERTY78',
        caseReference: '1234123412341234',
        respondentUserId: '123456',
      },
      CITIZEN_LINK_APPLICANT_2
    );
    expect(res.redirect).toBeCalledWith('/next-step-url');
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
