import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import {
  APPLICANT_1_CONFIRM_RECEIPT,
  APPLICANT_2_CONFIRM_RECEIPT,
  CITIZEN_APPLICANT2_UPDATE,
  CITIZEN_UPDATE,
  DRAFT_CONDITIONAL_ORDER,
  State,
  YesOrNo,
} from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';

import HubPagePostController from './post';

describe('HubPagePostController', () => {
  it('triggers APPLICANT_1_CONFIRM_RECEIPT in Holding state', async () => {
    const body = {
      state: State.Holding,
      applicant1ConfirmReceipt: YesOrNo.YES,
    };
    const mockFormContent = {
      fields: {
        applicant1ConfirmReceipt: {},
        state: {},
      },
    } as unknown as FormContent;
    const hubPagePostController = new HubPagePostController(mockFormContent.fields);

    const req = mockRequest({ body, session: { isApplicant2: false } });
    const res = mockResponse();
    await hubPagePostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, APPLICANT_1_CONFIRM_RECEIPT);
  });

  it('triggers APPLICANT_2_CONFIRM_RECEIPT in Holding state for Applicant 2', async () => {
    const body = {
      state: State.Holding,
      applicant1ConfirmReceipt: YesOrNo.YES,
    };
    const mockFormContent = {
      fields: {
        applicant1ConfirmReceipt: {},
        state: {},
      },
    } as unknown as FormContent;
    const hubPagePostController = new HubPagePostController(mockFormContent.fields);

    const req = mockRequest({ body, session: { isApplicant2: true } });
    const res = mockResponse();
    await hubPagePostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, APPLICANT_2_CONFIRM_RECEIPT);
  });

  it('triggers DRAFT_CONDITIONAL_ORDER in AwaitingConditionalState state', async () => {
    const body = {
      state: State.AwaitingConditionalOrder,
      applicant1ApplyForConditionalOrderStarted: YesOrNo.YES,
    };
    const mockFormContent = {
      fields: {
        applicant1ApplyForConditionalOrderStarted: {},
        state: {},
      },
    } as unknown as FormContent;
    const hubPagePostController = new HubPagePostController(mockFormContent.fields);

    const req = mockRequest({ body, session: { isApplicant2: false } });
    const res = mockResponse();
    await hubPagePostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, DRAFT_CONDITIONAL_ORDER);
  });

  it('triggers CITIZEN_UPDATE in ConditionalOrderDrafted state for Applicant 1', async () => {
    const body = {
      state: State.ConditionalOrderDrafted,
      applicant1ConfirmReceipt: YesOrNo.YES,
    };
    const mockFormContent = {
      fields: {
        applicant1ConfirmReceipt: {},
        state: {},
      },
    } as unknown as FormContent;
    const hubPagePostController = new HubPagePostController(mockFormContent.fields);

    const req = mockRequest({ body, session: { isApplicant2: false } });
    const res = mockResponse();
    await hubPagePostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, CITIZEN_UPDATE);
  });

  it('triggers CITIZEN_APPLICANT2_UPDATE in ConditionalOrderDrafted state for Applicant 2', async () => {
    const body = {
      state: State.ConditionalOrderDrafted,
      applicant1ConfirmReceipt: YesOrNo.YES,
    };
    const mockFormContent = {
      fields: {
        applicant1ConfirmReceipt: {},
        state: {},
      },
    } as unknown as FormContent;
    const hubPagePostController = new HubPagePostController(mockFormContent.fields);

    const req = mockRequest({ body, session: { isApplicant2: true } });
    const res = mockResponse();
    await hubPagePostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, CITIZEN_APPLICANT2_UPDATE);
  });
});
