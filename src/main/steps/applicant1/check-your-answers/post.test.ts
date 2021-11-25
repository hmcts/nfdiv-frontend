import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import * as oidc from '../../../app/auth/user/oidc';
import * as caseApi from '../../../app/case/CaseApi';
import { Checkbox } from '../../../app/case/case';
import {
  APPLICANT_1_RESUBMIT,
  ApplicationType,
  CITIZEN_INVITE_APPLICANT_2,
  CITIZEN_SUBMIT,
  DivorceOrDissolution,
  SWITCH_TO_SOLE,
  State,
} from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';

import CheckYourAnswersPostController from './post';

const getSystemUserMock = jest.spyOn(oidc, 'getSystemUser');
const getCaseApiMock = jest.spyOn(caseApi, 'getCaseApi');

describe('CheckYourAnswersPostController', () => {
  const mockFormContent = {
    fields: {
      applicant1IConfirmPrayer: {},
      applicant1IBelieveApplicationIsTrue: {},
    },
  } as unknown as FormContent;

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

  it('triggers CITIZEN_SUBMIT when sole application', async () => {
    const body = {
      applicationType: ApplicationType.SOLE_APPLICATION,
      applicant1IConfirmPrayer: Checkbox.Checked,
      applicant1IBelieveApplicationIsTrue: Checkbox.Checked,
    };
    const checkYourAnswerPostController = new CheckYourAnswersPostController(mockFormContent.fields);

    const req = mockRequest({ body });
    const res = mockResponse();
    await checkYourAnswerPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, CITIZEN_SUBMIT);
  });

  it('triggers CITIZEN_INVITE_APPLICANT_2 when joint application', async () => {
    const body = {
      applicationType: ApplicationType.JOINT_APPLICATION,
      applicant1IConfirmPrayer: Checkbox.Checked,
      applicant1IBelieveApplicationIsTrue: Checkbox.Checked,
    };
    const checkYourAnswerPostController = new CheckYourAnswersPostController(mockFormContent.fields);

    const req = mockRequest({ body });
    const res = mockResponse();
    await checkYourAnswerPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, CITIZEN_INVITE_APPLICANT_2);
  });

  it('triggers APPLICANT_1_RESUBMIT when applicant 1 resubmits', async () => {
    const body = {
      applicationType: ApplicationType.JOINT_APPLICATION,
      state: State.AwaitingApplicant1Response,
      applicant1IConfirmPrayer: Checkbox.Checked,
      applicant1IBelieveApplicationIsTrue: Checkbox.Checked,
    };
    const checkYourAnswerPostController = new CheckYourAnswersPostController(mockFormContent.fields);

    const req = mockRequest({ body });
    const res = mockResponse();
    await checkYourAnswerPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, APPLICANT_1_RESUBMIT);
  });

  it('triggers SWITCH_TO_SOLE before CITIZEN_SUBMIT when switching from joint to sole application', async () => {
    const caseApiMock = {
      triggerEvent: jest.fn().mockReturnValue({
        id: '1234',
        applicationType: ApplicationType.SOLE_APPLICATION,
        state: State.Draft,
      }),
      getOrCreateCase: jest.fn(() => {
        return {
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          applicant1FirstName: 'test',
          applicant1LastName: 'user',
          applicant1Email: 'test_user@email.com',
        };
      }),
    };
    (getCaseApiMock as jest.Mock).mockReturnValue(caseApiMock);

    const body = {
      applicant1IConfirmPrayer: Checkbox.Checked,
      applicant1IBelieveApplicationIsTrue: Checkbox.Checked,
    };
    const checkYourAnswerPostController = new CheckYourAnswersPostController(mockFormContent.fields);

    const req = mockRequest({
      body,
      userCase: { applicationType: ApplicationType.SOLE_APPLICATION, state: State.AwaitingApplicant1Response },
    });
    const res = mockResponse();
    await checkYourAnswerPostController.post(req, res);

    expect(caseApiMock.triggerEvent).toHaveBeenNthCalledWith(
      1,
      '1234',
      {
        divorceOrDissolution: 'divorce',
        id: '1234',
        applicationType: ApplicationType.SOLE_APPLICATION,
        state: State.AwaitingApplicant1Response,
      },
      SWITCH_TO_SOLE
    );
    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, CITIZEN_SUBMIT);
  });

  test('Should return error when event could not be triggered and redirect to the same page', async () => {
    const body = {};
    const controller = new CheckYourAnswersPostController(mockFormContent.fields);

    const req = mockRequest({
      body,
      userCase: { applicationType: ApplicationType.SOLE_APPLICATION, state: State.AwaitingApplicant1Response },
    });
    (getCaseApiMock as jest.Mock).mockReturnValue({
      triggerEvent: jest.fn(() => {
        throw Error;
      }),
      getOrCreateCase: jest.fn(),
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
