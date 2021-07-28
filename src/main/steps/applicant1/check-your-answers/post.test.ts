import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { Checkbox } from '../../../app/case/case';
import { ApplicationType, CITIZEN_INVITE_APPLICANT_2, CITIZEN_SUBMIT } from '../../../app/case/definition';
import { Form } from '../../../app/form/Form';

import CheckYourAnswersPostController from './post';

describe('CheckYourAnswersPostController', () => {
  it('triggers CITIZEN_SUBMIT when sole application', async () => {
    const body = {
      applicationType: ApplicationType.SOLE_APPLICATION,
      applicant1IConfirmPrayer: Checkbox.Checked,
      applicant1IBelieveApplicationIsTrue: Checkbox.Checked,
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

  it('triggers CITIZEN_INVITE_APPLICANT_2 when joint application', async () => {
    const body = {
      applicationType: ApplicationType.JOINT_APPLICATION,
      applicant1IConfirmPrayer: Checkbox.Checked,
      applicant1IBelieveApplicationIsTrue: Checkbox.Checked,
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

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, CITIZEN_INVITE_APPLICANT_2);
  });
});
