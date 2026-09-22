import { mockRequest } from '../../../../test/unit/utils/mockRequest.js';
import { mockResponse } from '../../../../test/unit/utils/mockResponse.js';
import { APPLICANT_2_NOT_BROKEN, YesOrNo } from '../../../app/case/definition.js';
import { FormContent } from '../../../app/form/Form.js';

import Applicant2IrretrievableBreakdownPostController from './post.js';

describe('Applicant2IrretrievableBreakdownPostController', () => {
  test('Should have no errors and trigger applicant2-not-broken event', async () => {
    const body = { applicant2ScreenHasUnionBroken: YesOrNo.NO };
    const mockFormContent = {
      fields: {
        applicant2ScreenHasUnionBroken: {},
      },
    } as unknown as FormContent;
    const controller = new Applicant2IrretrievableBreakdownPostController(mockFormContent.fields);

    const req = mockRequest({ body });
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      {
        applicant2ScreenHasUnionBroken: YesOrNo.NO,
      },
      APPLICANT_2_NOT_BROKEN
    );
  });
});
