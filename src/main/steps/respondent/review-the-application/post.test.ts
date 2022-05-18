import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { Checkbox } from '../../../app/case/case';
import { ApplicationType, DRAFT_AOS } from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';

import ReviewTheApplicationPostController from './post';

describe('ReviewTheApplicationPostController', () => {
  it('triggers DRAFT_AOS', async () => {
    const body = {
      applicant1IConfirmPrayer: Checkbox.Checked,
      applicant1StatementOfTruth: Checkbox.Checked,
      applicationType: ApplicationType.SOLE_APPLICATION,
    };
    const mockFormContent = {
      fields: {
        applicationType: {},
        applicant1IConfirmPrayer: {},
        applicant1StatementOfTruth: {},
      },
    } as unknown as FormContent;
    const reviewTheApplicationPostController = new ReviewTheApplicationPostController(mockFormContent.fields);

    const req = mockRequest({ body, session: { isApplicant2: true } });
    const res = mockResponse();
    await reviewTheApplicationPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, DRAFT_AOS);
  });
});
