import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import * as oidc from '../../app/auth/user/oidc';
import * as caseApi from '../../app/case/case-api';
import { ApplicationType, SYSTEM_CANCEL_CASE_INVITE, UserRole } from '../../app/case/definition';
import { FormContent } from '../../app/form/Form';
import { isFieldFilledIn } from '../../app/form/validation';
import { APPLICANT_2, ENTER_YOUR_ACCESS_CODE, EXISTING_APPLICATION, HOME_URL, SAVE_AND_SIGN_OUT } from '../urls';

import { existingOrNew } from './content';
import { ExistingApplicationPostController } from './post';

jest.spyOn(oidc, 'getSystemUser').mockResolvedValue({
  accessToken: 'token',
  id: '1234',
  email: 'user@caseworker.com',
  givenName: 'case',
  familyName: 'worker',
  roles: ['caseworker'],
});
const getCaseApiMock = jest.spyOn(caseApi, 'getCaseApi');
const caseApiMockFn = existingCaseData => ({
  triggerEvent: jest.fn(),
  getCaseById: jest.fn(() => existingCaseData),
  isApplicant2: jest.fn(() => true),
  getUsersRoleOnCase: jest.fn(() => UserRole.CREATOR),
});

describe('ExistingApplicationPostController', () => {
  const mockFormContent = {
    fields: {
      existingOrNewApplication: {
        validator: isFieldFilledIn,
      },
    },
  } as unknown as FormContent;

  test('Should redirect to the save and sign out page if chosen', async () => {
    const body = {
      saveAndSignOut: true,
    };
    const req = mockRequest({ body });
    const res = mockResponse();

    const controller = new ExistingApplicationPostController(mockFormContent.fields);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalledWith(SAVE_AND_SIGN_OUT);
  });

  test.each([[ApplicationType.JOINT_APPLICATION, ApplicationType.SOLE_APPLICATION]])(
    'When new case chosen and user is allowed to unlink from existing case where they are applicant / app1 (%s)',
    async applicationType => {
      const body = {
        existingOrNewApplication: existingOrNew.New,
      };

      const mockCaseApi = caseApiMockFn({ applicationType, id: '1234' });
      (getCaseApiMock as jest.Mock).mockReturnValue(mockCaseApi);
      const req = mockRequest({ body });
      req.url = EXISTING_APPLICATION;
      const res = mockResponse();

      const controller = new ExistingApplicationPostController(mockFormContent.fields);
      await controller.post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(APPLICANT_2 + ENTER_YOUR_ACCESS_CODE);
      expect(req.session.errors).toStrictEqual([]);
      expect(req.session.cannotLinkToNewCase).toBeFalsy();
      expect(req.session.existingApplicationType).toBeFalsy();
    }
  );

  test.each([
    [ApplicationType.JOINT_APPLICATION, '2022-08-22', undefined],
    [ApplicationType.SOLE_APPLICATION, '2022-08-22', '2022-09-15'],
  ])(
    'When new case chosen but unlinking not allowed from existing case where user is applicant / app1 (%s)',
    async (applicationType, dateSubmitted, dateAosSubmitted) => {
      const body = {
        existingOrNewApplication: existingOrNew.New,
      };

      const mockCaseApi = caseApiMockFn({ applicationType, dateSubmitted, dateAosSubmitted, id: '1234' });
      (getCaseApiMock as jest.Mock).mockReturnValue(mockCaseApi);
      const req = mockRequest({ body });
      req.url = EXISTING_APPLICATION;
      const res = mockResponse();

      const controller = new ExistingApplicationPostController(mockFormContent.fields);
      await controller.post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(EXISTING_APPLICATION);
      expect(req.session.cannotLinkToNewCase).toBeTruthy();
      expect(req.session.existingApplicationType).toBe(applicationType);
      expect(mockCaseApi.triggerEvent).toHaveBeenCalledWith(req.session.inviteCaseId, {}, SYSTEM_CANCEL_CASE_INVITE);
    }
  );

  test('When new case chosen and user is respondent on sole existing case where submitted but not AOS submitted', async () => {
    const body = {
      existingOrNewApplication: existingOrNew.New,
    };
    const caseData = {
      applicationType: ApplicationType.SOLE_APPLICATION,
      dateSubmitted: '2022-08-22',
      id: '1234',
    };

    const mockCaseApi = caseApiMockFn(caseData);
    mockCaseApi.getUsersRoleOnCase = jest.fn(() => UserRole.APPLICANT_2);
    (getCaseApiMock as jest.Mock).mockReturnValue(mockCaseApi);
    const req = mockRequest({ body });

    req.url = EXISTING_APPLICATION;
    const res = mockResponse();

    const controller = new ExistingApplicationPostController(mockFormContent.fields);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalledWith(APPLICANT_2 + ENTER_YOUR_ACCESS_CODE);
    expect(req.session.errors).toStrictEqual([]);
    expect(req.session.cannotLinkToNewCase).toBeFalsy();
    expect(req.session.existingApplicationType).toBeFalsy();
  });

  test('When new case chosen and user is respondent on sole existing case where AOS submitted', async () => {
    const body = {
      existingOrNewApplication: existingOrNew.New,
    };

    const caseData = {
      applicationType: ApplicationType.SOLE_APPLICATION,
      dateSubmitted: '2022-08-22',
      dateAosSubmitted: '2022-09-22',
      id: '1234',
    };

    const mockCaseApi = caseApiMockFn(caseData);
    mockCaseApi.getUsersRoleOnCase = jest.fn(() => UserRole.APPLICANT_2);
    (getCaseApiMock as jest.Mock).mockReturnValue(mockCaseApi);

    const req = mockRequest({ body });
    req.url = EXISTING_APPLICATION;
    const res = mockResponse();

    const controller = new ExistingApplicationPostController(mockFormContent.fields);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalledWith(EXISTING_APPLICATION);
    expect(req.session.cannotLinkToNewCase).toBeTruthy();
    expect(req.session.existingApplicationType).toBe(caseData.applicationType);
    expect(mockCaseApi.triggerEvent).toHaveBeenCalledWith(req.session.inviteCaseId, {}, SYSTEM_CANCEL_CASE_INVITE);
  });

  test('When Existing case chosen, should cancel new case invite and continue with existing case', async () => {
    const body = {
      existingOrNewApplication: existingOrNew.Existing,
    };

    const req = mockRequest({ body });

    const caseData = { id: '1234' };
    const mockCaseApi = caseApiMockFn(caseData);
    (getCaseApiMock as jest.Mock).mockReturnValue(mockCaseApi);

    req.originalUrl = EXISTING_APPLICATION;
    req.session.existingCaseId = '1234';
    req.session.inviteCaseId = '5678';
    const res = mockResponse();

    const controller = new ExistingApplicationPostController(mockFormContent.fields);
    await controller.post(req, res);

    expect(mockCaseApi.triggerEvent).toHaveBeenCalledWith(req.session.inviteCaseId, {}, SYSTEM_CANCEL_CASE_INVITE);
    expect(mockCaseApi.getCaseById).toHaveBeenCalledWith(req.session.existingCaseId);
    expect(mockCaseApi.isApplicant2).toHaveBeenCalledWith(req.session.existingCaseId, req.session.user.id);
    expect(res.redirect).toHaveBeenCalledWith(HOME_URL);
    expect(req.session.errors).toStrictEqual([]);
  });

  test('Should return error when event could not be triggered and redirect to the same page', async () => {
    const body = {
      existingOrNewApplication: existingOrNew.Existing,
    };
    const req = mockRequest({ body });
    req.url = EXISTING_APPLICATION;
    (getCaseApiMock as jest.Mock).mockReturnValue({
      triggerEvent: jest.fn(() => {
        throw Error;
      }),
    });
    const res = mockResponse();

    const controller = new ExistingApplicationPostController(mockFormContent.fields);
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
});
