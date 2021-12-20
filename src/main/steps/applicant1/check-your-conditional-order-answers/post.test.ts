import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { Checkbox } from '../../../app/case/case';
import { ApplicationType, SUBMIT_CONDITIONAL_ORDER } from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';

import CheckYourConditionalOrderAnswersPostController from './post';

describe('CheckYourConditionalOrderAnswersPostController', () => {
  const mockFormContent = {
    fields: {
      coApplicant1StatementOfTruth: {},
    },
  } as unknown as FormContent;

  it('triggers SUBMIT_CONDITIONAL_ORDER when submitting conditional order application', async () => {
    const body = {
      coApplicant1StatementOfTruth: Checkbox.Checked,
    };
    const checkYourAnswerPostController = new CheckYourConditionalOrderAnswersPostController(mockFormContent.fields);

    const req = mockRequest({ body, userCase: { applicationType: ApplicationType.SOLE_APPLICATION } });
    const res = mockResponse();
    await checkYourAnswerPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, SUBMIT_CONDITIONAL_ORDER);
  });
});
