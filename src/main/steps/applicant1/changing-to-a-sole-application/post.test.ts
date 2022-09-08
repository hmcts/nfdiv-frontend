import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { ApplicationType, SWITCH_TO_SOLE_CO } from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';
import { CHANGING_TO_SOLE_APPLICATION, HUB_PAGE } from '../../urls';

import ChangingToASoleApplicationPostController from './post';

describe('ChangingToASoleApplicationPostController', () => {
  const mockFormContent = {
    fields: {},
  } as unknown as FormContent;

  test('Should have no errors and redirect to the next page', async () => {
    const body = {};
    const controller = new ChangingToASoleApplicationPostController(mockFormContent.fields);

    const caseData = {
      id: '1234123412341234',
      applicationType: ApplicationType.JOINT_APPLICATION,
    };

    const req = mockRequest({ body });
    req.originalUrl = CHANGING_TO_SOLE_APPLICATION;

    (req.locals.api.triggerEvent as jest.Mock).mockResolvedValueOnce(caseData);
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', {}, SWITCH_TO_SOLE_CO);
    expect(res.redirect).toBeCalledWith(HUB_PAGE);
    expect(req.session.errors).toStrictEqual([]);
    expect(req.session.existingCaseId).toStrictEqual('1234123412341234');
  });

  test('Should convert applicant2 to applicant 1', async () => {
    const body = {};
    const controller = new ChangingToASoleApplicationPostController(mockFormContent.fields);

    const caseData = {
      id: '1234123412341234',
      applicationType: ApplicationType.JOINT_APPLICATION,
    };

    const req = mockRequest({ body, isApplicant2: true });
    req.originalUrl = CHANGING_TO_SOLE_APPLICATION;

    (req.locals.api.triggerEvent as jest.Mock).mockResolvedValueOnce(caseData);
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', {}, SWITCH_TO_SOLE_CO);
    expect(res.redirect).toBeCalledWith(HUB_PAGE);
    expect(req.session.errors).toStrictEqual([]);
    expect(req.session.isApplicant2).toEqual(false);
  });

  test('Should return error when event could not be triggered and redirect to the same page', async () => {
    const body = {};
    const controller = new ChangingToASoleApplicationPostController(mockFormContent.fields);

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
});
