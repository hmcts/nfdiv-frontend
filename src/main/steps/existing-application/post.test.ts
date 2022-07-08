import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { ApplicationType, SYSTEM_CANCEL_CASE_INVITE } from '../../app/case/definition';
import { FormContent } from '../../app/form/Form';
import { isFieldFilledIn } from '../../app/form/validation';
import { APPLICANT_2, ENTER_YOUR_ACCESS_CODE, EXISTING_APPLICATION, HOME_URL } from '../urls';

import { existingOrNew } from './content';
import { ExistingApplicationPostController } from './post';

describe('ExistingApplicationPostController', () => {
  const mockFormContent = {
    fields: {
      existingOrNewApplication: {
        validator: isFieldFilledIn,
      },
    },
  } as unknown as FormContent;

  test('Should have no errors and redirect to the access code page', async () => {
    const body = {
      existingOrNewApplication: existingOrNew.New,
    };

    const req = mockRequest({ body });
    req.originalUrl = EXISTING_APPLICATION;
    const res = mockResponse();

    const controller = new ExistingApplicationPostController(mockFormContent.fields);
    await controller.post(req, res);

    expect(res.redirect).toBeCalledWith(APPLICANT_2 + ENTER_YOUR_ACCESS_CODE);
    expect(req.session.errors).toStrictEqual([]);
  });

  test('Should cancel new case invite and continue with existing case', async () => {
    const body = {
      existingOrNewApplication: existingOrNew.Existing,
    };
    const caseData = {
      applicationType: ApplicationType.JOINT_APPLICATION,
    };

    const req = mockRequest({ body });
    req.originalUrl = EXISTING_APPLICATION;
    req.session.existingCaseId = '1234';
    req.session.inviteCaseId = '5678';
    (req.locals.api.triggerEvent as jest.Mock).mockResolvedValueOnce(caseData);
    const res = mockResponse();

    const controller = new ExistingApplicationPostController(mockFormContent.fields);
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(req.session.inviteCaseId, {}, SYSTEM_CANCEL_CASE_INVITE);
    expect(req.locals.api.getCaseById).toHaveBeenCalledWith(req.session.existingCaseId);
    expect(res.redirect).toBeCalledWith(HOME_URL);
    expect(req.session.errors).toStrictEqual([]);
  });

  test('Should return error when event could not be triggered and redirect to the same page', async () => {
    const body = {
      existingOrNewApplication: existingOrNew.Existing,
    };
    const controller = new ExistingApplicationPostController(mockFormContent.fields);

    const req = mockRequest({ body });
    req.url = EXISTING_APPLICATION;
    (req.locals.api.triggerEvent as jest.Mock).mockImplementation(
      jest.fn(() => {
        throw Error;
      })
    );
    const res = mockResponse();
    await controller.post(req, res);

    expect(res.redirect).toBeCalledWith(EXISTING_APPLICATION);
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
    expect(res.redirect).toBeCalledWith(EXISTING_APPLICATION);
    expect(req.session.errors).toEqual(errors);
  });
});
