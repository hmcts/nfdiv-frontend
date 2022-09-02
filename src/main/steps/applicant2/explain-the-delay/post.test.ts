import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { Checkbox } from '../../../app/case/case';
import { CITIZEN_FINAL_ORDER_DELAY_REASON } from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';

import ExplainTheDelayPostController from './post';

describe('ExplainTheDelayPostController', () => {
  it('triggers CITIZEN_FINAL_ORDER_DELAY_REASON', async () => {
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
    const explainTheDelayPostController = new ExplainTheDelayPostController(mockFormContent.fields);

    const req = mockRequest({ body, session: { isApplicant2: false } });
    const res = mockResponse();
    await explainTheDelayPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, CITIZEN_FINAL_ORDER_DELAY_REASON);
  });
});
