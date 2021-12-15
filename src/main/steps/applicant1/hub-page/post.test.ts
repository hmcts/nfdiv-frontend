import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import {
  APPLICANT_1_CONFIRM_RECEIPT,
  ApplicationType,
  DRAFT_CONDITIONAL_ORDER,
  State,
  YesOrNo,
} from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';

import HubPagePostController from './post';

describe('HubPagePostController', () => {
  it('triggers APPLICANT_1_CONFIRM_RECEIPT', async () => {
    const body = {
      applicant1ConfirmReceipt: YesOrNo.YES,
    };
    const mockFormContent = {
      fields: {
        applicant1ConfirmReceipt: {},
      },
    } as unknown as FormContent;
    const hubPagePostController = new HubPagePostController(mockFormContent.fields);

    const req = mockRequest({
      body,
      session: { isApplicant2: false },
      userCase: { applicationType: ApplicationType.JOINT_APPLICATION },
    });
    const res = mockResponse();
    await hubPagePostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, APPLICANT_1_CONFIRM_RECEIPT);
  });

  it('triggers DRAFT_CONDITIONAL_ORDER', async () => {
    const body = {
      applicant1ApplyForConditionalOrderStarted: YesOrNo.YES,
    };
    const mockFormContent = {
      fields: {
        applicant1ApplyForConditionalOrderStarted: {},
      },
    } as unknown as FormContent;
    const hubPagePostController = new HubPagePostController(mockFormContent.fields);

    const req = mockRequest({
      body,
      session: { isApplicant2: false },
      userCase: { state: State.AwaitingConditionalOrder },
    });
    const res = mockResponse();
    await hubPagePostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, DRAFT_CONDITIONAL_ORDER);
  });
});
