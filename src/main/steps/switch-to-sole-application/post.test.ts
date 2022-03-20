import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { ApplicationType, SWITCH_TO_SOLE, State } from '../../app/case/definition';
import { FormContent } from '../../app/form/Form';
import { getJurisdictionNullDictionary } from '../../app/jurisdiction/jurisdictionRemovalHelper';
import { HOME_URL, PAY_AND_SUBMIT, SWITCH_TO_SOLE_APPLICATION, YOUR_DETAILS_URL } from '../urls';

import { SwitchToSoleApplicationPostController } from './post';

describe('SwitchToSoleApplicationPostController', () => {
  const mockFormContent = {
    fields: {},
  } as unknown as FormContent;

  test('Should have no errors and redirect to the next page', async () => {
    const body = {};
    const controller = new SwitchToSoleApplicationPostController(mockFormContent.fields);

    const caseData = {
      applicationType: ApplicationType.JOINT_APPLICATION,
    };

    const req = mockRequest({ body });
    req.originalUrl = SWITCH_TO_SOLE_APPLICATION;

    (req.locals.api.triggerEvent as jest.Mock).mockResolvedValueOnce(caseData);
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', getJurisdictionNullDictionary(), SWITCH_TO_SOLE);
    expect(res.redirect).toBeCalledWith(YOUR_DETAILS_URL);
    expect(req.session.errors).toStrictEqual([]);
  });

  test('Should create a new case and unset isApplicant2 for applicant 2', async () => {
    const body = {};
    const controller = new SwitchToSoleApplicationPostController(mockFormContent.fields);

    const caseData = {
      applicationType: ApplicationType.JOINT_APPLICATION,
    };

    const req = mockRequest({ body, isApplicant2: true });
    req.originalUrl = SWITCH_TO_SOLE_APPLICATION;

    (req.locals.api.triggerEvent as jest.Mock).mockResolvedValueOnce(caseData);
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', getJurisdictionNullDictionary(), SWITCH_TO_SOLE);
    expect(res.redirect).toBeCalledWith(YOUR_DETAILS_URL);
    expect(req.session.errors).toStrictEqual([]);
    expect(req.session.isApplicant2).toEqual(false);
  });

  test('Should redirect to pay and submit page when cancel button used in AwaitingPayment state', async () => {
    const body = { cancel: 'cancel button' };
    const controller = new SwitchToSoleApplicationPostController(mockFormContent.fields);
    const req = mockRequest({ body });
    req.session.userCase.state = State.AwaitingPayment;
    const res = mockResponse();
    await controller.post(req, res);

    expect(res.redirect).toBeCalledWith(PAY_AND_SUBMIT);
  });

  test('Should redirect to home page when cancel button used in any non AwaitingPayment state', async () => {
    const body = { cancel: 'cancel button' };
    const controller = new SwitchToSoleApplicationPostController(mockFormContent.fields);
    const req = mockRequest({ body });
    const res = mockResponse();
    await controller.post(req, res);

    expect(res.redirect).toBeCalledWith(HOME_URL);
  });

  test('Should return error when event could not be triggered and redirect to the same page', async () => {
    const body = {};
    const controller = new SwitchToSoleApplicationPostController(mockFormContent.fields);

    const req = mockRequest({ body, isApplicant2: true });
    (req.locals.api.triggerEvent as jest.Mock).mockImplementation(
      jest.fn(() => {
        throw Error;
      })
    );
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

  test('Should set jurisdiction data to null', async () => {
    const body = {};

    const applicationTypeController = new SwitchToSoleApplicationPostController(mockFormContent.fields);

    const req = mockRequest({ body });
    const res = mockResponse();
    await applicationTypeController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', getJurisdictionNullDictionary(), SWITCH_TO_SOLE);
  });
});
