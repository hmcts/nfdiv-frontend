import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { Checkbox } from '../../../app/case/case';
import { CITIZEN_FINAL_ORDER_REQUESTED } from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';

import FinalisingYourApplicationPostController from './post';

describe('FinalisingYourApplicationPostController', () => {
  it('triggers CITIZEN_FINAL_ORDER_REQUESTED', async () => {
    const body = {
      applicant1FinalOrderLateExplanation: 'Test FO late explanation',
      applicant1FinalOrderStatementOfTruth: Checkbox.Checked,
    };
    const mockFormContent = {
      fields: {
        applicant1FinalOrderLateExplanation: {},
        applicant1FinalOrderStatementOfTruth: {},
      },
    } as unknown as FormContent;
    const finalisingYourApplicationPostController = new FinalisingYourApplicationPostController(mockFormContent.fields);

    const req = mockRequest({ body, session: { isApplicant2: false } });
    const res = mockResponse();
    await finalisingYourApplicationPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, CITIZEN_FINAL_ORDER_REQUESTED);
  });
});
