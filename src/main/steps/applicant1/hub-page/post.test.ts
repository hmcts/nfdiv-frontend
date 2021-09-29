import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { APPLICANT_1_CONFIRM_RECEIPT, YesOrNo } from '../../../app/case/definition';
import { Form } from '../../../app/form/Form';

import HubPagePostController from './post';

describe('HubPagePostController', () => {
  it('triggers APPLICANT_1_CONFIRM_RECEIPT', async () => {
    const body = {
      applicant1ConfirmReceipt: YesOrNo.YES,
    };
    const mockForm = {
      setFormState: jest.fn(),
      getErrors: () => [],
      getParsedBody: () => body,
    } as unknown as Form;
    const hubPagePostController = new HubPagePostController(mockForm);

    const req = mockRequest({ body, session: { isApplicant2: false } });
    const res = mockResponse();
    await hubPagePostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, APPLICANT_1_CONFIRM_RECEIPT);
  });
});
