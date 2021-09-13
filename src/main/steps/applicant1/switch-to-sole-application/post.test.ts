import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import * as caseApi from '../../../app/case/CaseApi';
import { ApplicationType, CITIZEN_SWITCH_TO_SOLE, DivorceOrDissolution, State } from '../../../app/case/definition';
import { Form } from '../../../app/form/Form';
import { HOME_URL, PAY_AND_SUBMIT, YOUR_DETAILS_URL } from '../../urls';

import SwitchToSoleApplicationPostController from './post';

const getCaseApiMock = jest.spyOn(caseApi, 'getCaseApi');

describe('SwitchToSoleApplicationPostController', () => {
  test('Should have no errors and redirect to the next page', async () => {
    const errors = [] as never[];
    const body = {};
    const mockForm = {
      setFormState: jest.fn(),
      getErrors: () => errors,
      getParsedBody: () => body,
    } as unknown as Form;
    const controller = new SwitchToSoleApplicationPostController(mockForm);

    const caseData = {
      applicationType: ApplicationType.JOINT_APPLICATION,
    };

    const req = mockRequest({ body });
    req.originalUrl = '/switch-to-sole-application';

    (getCaseApiMock as jest.Mock).mockReturnValue({
      triggerEvent: jest.fn(),
      getOrCreateCase: jest.fn(() => {
        return {
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          applicant1FirstName: 'test',
          applicant1LastName: 'user',
          applicant1Email: 'test_user@email.com',
        };
      }),
    });
    (req.locals.api.triggerEvent as jest.Mock).mockResolvedValueOnce(caseData);
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      {
        divorceOrDissolution: 'divorce',
        id: '1234',
      },
      CITIZEN_SWITCH_TO_SOLE
    );
    expect(res.redirect).toBeCalledWith(YOUR_DETAILS_URL);
    expect(req.session.errors).toStrictEqual([]);
  });

  test('Should redirect to pay and submit page when cancel button used in Applicant2Approved state', async () => {
    const errors = [] as never[];
    const body = { cancel: 'cancel button' };
    const mockForm = {
      setFormState: jest.fn(),
      getErrors: () => errors,
      getParsedBody: () => body,
    } as unknown as Form;
    const controller = new SwitchToSoleApplicationPostController(mockForm);
    const req = mockRequest({ body });
    req.session.userCase.state = State.Applicant2Approved;
    const res = mockResponse();
    await controller.post(req, res);

    expect(res.redirect).toBeCalledWith(PAY_AND_SUBMIT);
    expect(req.session.errors).toStrictEqual([]);
  });

  test('Should redirect to home page when cancel button used in any non Applicant2Approved state', async () => {
    const errors = [] as never[];
    const body = { cancel: 'cancel button' };
    const mockForm = {
      setFormState: jest.fn(),
      getErrors: () => errors,
      getParsedBody: () => body,
    } as unknown as Form;
    const controller = new SwitchToSoleApplicationPostController(mockForm);
    const req = mockRequest({ body });
    const res = mockResponse();
    await controller.post(req, res);

    expect(res.redirect).toBeCalledWith(HOME_URL);
    expect(req.session.errors).toStrictEqual([]);
  });

  test('Should return error when event could not be triggered and redirect to the same page', async () => {
    const errors = [] as never[];
    const body = {};
    const mockForm = {
      setFormState: jest.fn(),
      getErrors: () => errors,
      getParsedBody: () => body,
    } as unknown as Form;
    const controller = new SwitchToSoleApplicationPostController(mockForm);

    const req = mockRequest({ body });
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
