import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { RespondentAddressPostController } from './post';
import { Form } from '../../../app/form/Form';
import { RespondentAddressForm } from './content';
import { MARRIAGE_CERTIFICATE_URL } from '../../urls';

describe('HasMarriageBrokenPostController', () => {
  const mockForm: Form<RespondentAddressForm> = { getErrors: () => [] as never[] } as any;
  const controller = new RespondentAddressPostController(mockForm);

  test('Should redirect', async () => {
    const req = mockRequest();
    const res = mockResponse(req.session);
    await controller.post(req, res);

    expect(res.redirect).toBeCalledWith(MARRIAGE_CERTIFICATE_URL);
  });

});
