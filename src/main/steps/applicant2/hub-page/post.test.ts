import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import {
  APPLICANT_1_CONFIRM_RECEIPT,
  DRAFT_CONDITIONAL_ORDER,
  State,
  UPDATE_CONDITIONAL_ORDER,
  YesOrNo,
} from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';

import HubPagePostController from './post';

describe('HubPagePostController', () => {
  it('triggers APPLICANT_2_CONFIRM_RECEIPT in Holding state', async () => {
    const body = {
      state: State.Holding,
      applicant1ConfirmReceipt: YesOrNo.YES,
    };
    const mockFormContent = {
      fields: {
        applicant1ConfirmReceipt: {},
      },
    } as unknown as FormContent;
    const hubPagePostController = new HubPagePostController(mockFormContent.fields);

    const req = mockRequest({ body, session: { isApplicant2: false } });
    const res = mockResponse();
    await hubPagePostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, APPLICANT_1_CONFIRM_RECEIPT);
  });

  it('triggers DRAFT_CONDITIONAL_ORDER in AwaitingConditionalState state', async () => {
    const body = {
      state: State.AwaitingConditionalOrder,
      applicant1ApplyForConditionalOrderStarted: YesOrNo.YES,
    };
    const mockFormContent = {
      fields: {
        applicant1ApplyForConditionalOrderStarted: {},
      },
    } as unknown as FormContent;
    const hubPagePostController = new HubPagePostController(mockFormContent.fields);

    const req = mockRequest({ body, session: { isApplicant2: false } });
    const res = mockResponse();
    await hubPagePostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, DRAFT_CONDITIONAL_ORDER);
  });

  it('triggers UPDATE_CONDITIONAL_ORDER in ConditionalOrderDrafted state', async () => {
    const body = {
      state: State.ConditionalOrderDrafted,
      applicant1ConfirmReceipt: YesOrNo.YES,
    };
    const mockFormContent = {
      fields: {
        applicant1ConfirmReceipt: {},
      },
    } as unknown as FormContent;
    const hubPagePostController = new HubPagePostController(mockFormContent.fields);

    const req = mockRequest({ body, session: { isApplicant2: false } });
    const res = mockResponse();
    await hubPagePostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, UPDATE_CONDITIONAL_ORDER);
  });
});
