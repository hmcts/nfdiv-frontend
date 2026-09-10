import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { CITIZEN_APPLICANT2_UPDATE, CITIZEN_UPDATE, GeneralApplicationType } from '../../../../../app/case/definition';
import { FormContent } from '../../../../../app/form/Form';

import InitiateD11WithdrawApplicationPostController from './post';

describe('DigitisedGeneralApplicationPostController', () => {
  const mockFormContent = {
    fields: {},
  } as unknown as FormContent;

  it('Sets digitised general application type for applicant1', async () => {
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

  it('Sets digitised general application type for applicant2', async () => {
    const body = {};

    const expectedBody = {
      applicant2GenAppType: GeneralApplicationType.WITHDRAW_POST_ISSUE,
    };

    const initiateD11WithdrawApplicationPostController = new InitiateD11WithdrawApplicationPostController(
      mockFormContent.fields
    );

    const req = mockRequest({ body });
    req.session.isApplicant2 = true;
    const res = mockResponse();
    await initiateD11WithdrawApplicationPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', expectedBody, CITIZEN_APPLICANT2_UPDATE);
  });
});
