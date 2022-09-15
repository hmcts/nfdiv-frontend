import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import * as oidc from '../../app/auth/user/oidc';
import * as caseApi from '../../app/case/case-api';
import { ApplicationType, SYSTEM_CANCEL_CASE_INVITE, State } from '../../app/case/definition';
import { FormContent } from '../../app/form/Form';
import { isFieldFilledIn } from '../../app/form/validation';
import { APPLICANT_2, ENTER_YOUR_ACCESS_CODE, EXISTING_APPLICATION, HOME_URL, SAVE_AND_SIGN_OUT } from '../urls';

import { existingOrNew } from './content';
import { ExistingApplicationPostController } from './post';

const getSystemUserMock = jest.spyOn(oidc, 'getSystemUser');
const getCaseApiMock = jest.spyOn(caseApi, 'getCaseApi');
const mockSystemUser = {
  accessToken: 'token',
  id: '1234',
  email: 'user@caseworker.com',
  givenName: 'case',
  familyName: 'worker',
  roles: ['caseworker'],
};
let caseApiMockFn;

describe('ExistingApplicationPostController', () => {
  const mockFormContent = {
    fields: {
      existingOrNewApplication: {
        validator: isFieldFilledIn,
      },
    },
  } as unknown as FormContent;

  test('Should redirect to the save and sign out page', async () => {
    const body = {
      saveAndSignOut: true,
    };

    const req = mockRequest({ body });
    const res = mockResponse();

    const controller = new ExistingApplicationPostController(mockFormContent.fields);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalledWith(SAVE_AND_SIGN_OUT);
  });

  test('Should have no errors and redirect to the access code page', async () => {
    const body = {
      existingOrNewApplication: existingOrNew.New,
    };
    getSystemUserMock.mockResolvedValue(mockSystemUser);
    const caseData = {
      applicationType: ApplicationType.JOINT_APPLICATION,
      id: '1234',
    };
    caseApiMockFn = {
      triggerEvent: jest.fn(),
      getCaseById: jest.fn(() => caseData),
      isApplicant2: jest.fn(() => true),
    };
    (getCaseApiMock as jest.Mock).mockReturnValue(caseApiMockFn);

    const req = mockRequest({ body });
    req.session.userCase.state = State.AwaitingPayment;
    req.originalUrl = EXISTING_APPLICATION;
    const res = mockResponse();

    const controller = new ExistingApplicationPostController(mockFormContent.fields);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalledWith(APPLICANT_2 + ENTER_YOUR_ACCESS_CODE);
    expect(req.session.errors).toStrictEqual([]);
  });

  test.each([
    [ApplicationType.JOINT_APPLICATION, undefined, undefined],
    [ApplicationType.SOLE_APPLICATION, undefined, undefined],
  ])(
    'Should have no errors and redirect to the access code page for %s',
    async (applicationType, dateSubmitted, dateAosSubmitted) => {
      const body = {
        existingOrNewApplication: existingOrNew.New,
      };
      mockCaseApi(applicationType, dateSubmitted, dateAosSubmitted);

      const req = mockRequest({ body });
      req.url = EXISTING_APPLICATION;
      const res = mockResponse();
      const controller = new ExistingApplicationPostController(mockFormContent.fields);

      await controller.post(req, res);

      expect(res.redirect).toBeCalledWith(APPLICANT_2 + ENTER_YOUR_ACCESS_CODE);
      expect(req.session.errors).toStrictEqual([]);
      expect(req.session.cannotLinkToNewCase).toBeFalsy();
      expect(req.session.existingApplicationType).toBeFalsy();
    }
  );

  test.each([
    [ApplicationType.JOINT_APPLICATION, '2022-08-22', undefined],
    [ApplicationType.SOLE_APPLICATION, '2022-08-22', '2022-09-15'],
  ])('Should be redirected to the current page for %s', async (applicationType, dateSubmitted, dateAosSubmitted) => {
    const body = {
      existingOrNewApplication: existingOrNew.New,
    };
    mockCaseApi(applicationType, dateSubmitted, dateAosSubmitted);

    const req = mockRequest({ body });
    req.url = EXISTING_APPLICATION;
    const res = mockResponse();
    const controller = new ExistingApplicationPostController(mockFormContent.fields);

    await controller.post(req, res);

    expect(res.redirect).toBeCalledWith(EXISTING_APPLICATION);
    expect(req.session.cannotLinkToNewCase).toBeTruthy();
    expect(req.session.existingApplicationType).toBe(applicationType);
    expect(caseApiMockFn.triggerEvent).toHaveBeenCalledWith(req.session.inviteCaseId, {}, SYSTEM_CANCEL_CASE_INVITE);
  });

  test('Should cancel new case invite and continue with existing case', async () => {
    const body = {
      existingOrNewApplication: existingOrNew.Existing,
    };

    getSystemUserMock.mockResolvedValue(mockSystemUser);

    const req = mockRequest({ body });

    const caseData = {
      applicationType: ApplicationType.JOINT_APPLICATION,
      id: '1234',
    };

    caseApiMockFn = {
      triggerEvent: jest.fn(),
      getCaseById: jest.fn(() => caseData),
      isApplicant2: jest.fn(() => true),
    };

    (getCaseApiMock as jest.Mock).mockReturnValue(caseApiMockFn);
    req.originalUrl = EXISTING_APPLICATION;
    req.session.existingCaseId = caseData.id;
    req.session.inviteCaseId = '5678';
    const res = mockResponse();

    const controller = new ExistingApplicationPostController(mockFormContent.fields);
    await controller.post(req, res);

    expect(caseApiMockFn.triggerEvent).toHaveBeenCalledWith(req.session.inviteCaseId, {}, SYSTEM_CANCEL_CASE_INVITE);
    expect(caseApiMockFn.getCaseById).toHaveBeenCalledWith(req.session.existingCaseId);
    expect(caseApiMockFn.isApplicant2).toHaveBeenCalledWith(req.session.existingCaseId, req.session.user.id);
    expect(res.redirect).toHaveBeenCalledWith(HOME_URL);
    expect(req.session.errors).toStrictEqual([]);
  });

  test('Should return error when event could not be triggered and redirect to the same page', async () => {
    const body = {
      existingOrNewApplication: existingOrNew.Existing,
    };
    const controller = new ExistingApplicationPostController(mockFormContent.fields);

    getSystemUserMock.mockResolvedValue(mockSystemUser);

    const req = mockRequest({ body });
    req.url = EXISTING_APPLICATION;
    (getCaseApiMock as jest.Mock).mockReturnValue({
      triggerEvent: jest.fn(() => {
        throw Error;
      }),
    });
    const res = mockResponse();
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalledWith(EXISTING_APPLICATION);
    expect(req.session.errors).toStrictEqual([
      {
        errorType: 'errorSaving',
        propertyName: '*',
      },
    ]);
  });

  test('Should redirect back to the current page with the form data on errors', async () => {
    const errors = [{ propertyName: 'existingOrNewApplication', errorType: 'required' }];
    const body = {};

    const req = mockRequest({ body });
    req.originalUrl = EXISTING_APPLICATION;
    req.url = EXISTING_APPLICATION;
    const res = mockResponse();

    const controller = new ExistingApplicationPostController(mockFormContent.fields);
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).not.toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith(EXISTING_APPLICATION);
    expect(req.session.errors).toEqual(errors);
  });

  const mockCaseApi = (applicationType, dateSubmitted, dateAosSubmitted): void => {
    getSystemUserMock.mockResolvedValue(mockSystemUser);
    const caseData = { applicationType, dateSubmitted, dateAosSubmitted, id: '1234' };
    caseApiMockFn = {
      triggerEvent: jest.fn(),
      getCaseById: jest.fn(() => caseData),
      isApplicant2: jest.fn(() => true),
    };
    (getCaseApiMock as jest.Mock).mockReturnValue(caseApiMockFn);
  };
});
