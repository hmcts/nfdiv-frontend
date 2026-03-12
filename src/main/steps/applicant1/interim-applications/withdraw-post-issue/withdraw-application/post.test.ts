import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { CITIZEN_UPDATE, GeneralApplicationType } from '../../../../../app/case/definition';
import { FormContent } from '../../../../../app/form/Form';

import InitiateD11WithdrawApplicationPostController from './post';

describe('DigitisedGeneralApplicationPostController', () => {
  const mockFormContent = {
    fields: {},
  } as unknown as FormContent;

  it('Sets digitised general application type', async () => {
    const body = {};

    const expectedBody = {
      applicant1GenAppType: GeneralApplicationType.WITHDRAW_POST_ISSUE,
    };

    const initiateD11WithdrawApplicationPostController = new InitiateD11WithdrawApplicationPostController(
      mockFormContent.fields
    );

    const req = mockRequest({ body });
    const res = mockResponse();
    await initiateD11WithdrawApplicationPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', expectedBody, CITIZEN_UPDATE);
  });
});
