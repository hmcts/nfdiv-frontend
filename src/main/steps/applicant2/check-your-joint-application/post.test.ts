import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CITIZEN_APPLICANT2_UPDATE, CITIZEN_APPLICANT_2_REQUEST_CHANGES, YesOrNo } from '../../../app/case/definition';
import { Form } from '../../../app/form/Form';

import CheckYourJointApplicationPostController from './post';

describe('CheckYourJointApplicationPostController', () => {
  test('Should have no errors and trigger applicant2-request-changes event', async () => {
    const errors = [] as never[];
    const body = { applicant2Confirmation: YesOrNo.NO };
    const mockForm = {
      setFormState: jest.fn(),
      getErrors: () => errors,
      getParsedBody: () => body,
    } as unknown as Form;
    const controller = new CheckYourJointApplicationPostController(mockForm);

    const req = mockRequest({ body });
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      { applicant2Confirmation: YesOrNo.NO, iBelieveApplicationIsTrue: '', iConfirmPrayer: '' },
      CITIZEN_APPLICANT_2_REQUEST_CHANGES
    );
  });

  test('Should have no errors and trigger citizen-applicant2-update-application event', async () => {
    const errors = [] as never[];
    const body = { applicant2Confirmation: YesOrNo.YES };
    const mockForm = {
      setFormState: jest.fn(),
      getErrors: () => errors,
      getParsedBody: () => body,
    } as unknown as Form;
    const controller = new CheckYourJointApplicationPostController(mockForm);

    const req = mockRequest({ body });
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      { applicant2Confirmation: YesOrNo.YES, iBelieveApplicationIsTrue: '', iConfirmPrayer: '' },
      CITIZEN_APPLICANT2_UPDATE
    );
  });
});
