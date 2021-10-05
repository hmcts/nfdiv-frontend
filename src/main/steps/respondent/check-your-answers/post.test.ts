import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { Checkbox } from '../../../app/case/case';
import { CITIZEN_SUBMIT } from '../../../app/case/definition';
import { Form } from '../../../app/form/Form';

import CheckYourAnswersPostController from './post';

describe('CheckYourAnswersPostController', () => {
  it('triggers CITIZEN_SUBMIT', async () => {
    const body = {
      applicant2IBelieveApplicationIsTrue: Checkbox.Checked,
    };
    const mockForm = {
      setFormState: jest.fn(),
      getErrors: () => [],
      getParsedBody: () => body,
    } as unknown as Form;
    const checkYourAnswerPostController = new CheckYourAnswersPostController(mockForm);

    const req = mockRequest({ body });
    const res = mockResponse();
    await checkYourAnswerPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, CITIZEN_SUBMIT);
  });
});
