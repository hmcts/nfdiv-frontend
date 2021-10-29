import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { Checkbox } from '../../../app/case/case';
import { ApplicationType, DRAFT_AOS } from '../../../app/case/definition';
import { Form } from '../../../app/form/Form';

import ReviewTheApplicationPostController from './post';

describe('ReviewTheApplicationPostController', () => {
  it('triggers DRAFT_AOS', async () => {
    const body = {
      applicant1IConfirmPrayer: Checkbox.Checked,
      applicant1IBelieveApplicationIsTrue: Checkbox.Checked,
      applicationType: ApplicationType.SOLE_APPLICATION,
    };
    const mockForm = {
      setFormState: jest.fn(),
      getErrors: () => [],
      getParsedBody: () => body,
    } as unknown as Form;
    const reviewTheApplicationPostController = new ReviewTheApplicationPostController(mockForm);

    const req = mockRequest({ body, session: { isApplicant2: true } });
    const res = mockResponse();
    await reviewTheApplicationPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, DRAFT_AOS);
  });
});
