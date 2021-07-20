import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { Checkbox } from '../../../app/case/case';
import { APPLICANT_2_APPROVE, ApplicationType } from '../../../app/case/definition';
import { Form } from '../../../app/form/Form';

import ConfirmYourAnswersPostController from './post';

describe('ConfirmYourAnswersPostController', () => {
  it('triggers APPLICANT_2_APPROVED', async () => {
    const body = {
      applicationType: ApplicationType.JOINT_APPLICATION,
      applicant2IConfirmPrayer: Checkbox.Checked,
      applicant2IBelieveApplicationIsTrue: Checkbox.Checked,
    };
    const mockForm = {
      setFormState: jest.fn(),
      getErrors: () => [],
      getParsedBody: () => body,
    } as unknown as Form;
    const confirmYourAnswerPostController = new ConfirmYourAnswersPostController(mockForm);

    const req = mockRequest({ body });
    const res = mockResponse();
    await confirmYourAnswerPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, APPLICANT_2_APPROVE);
  });
});
